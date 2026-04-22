import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PaperPlaneTilt, X } from "phosphor-react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../auth/hooks/useAuth";
import { robotConversationApi } from "../api/robotConversationApi";
import {
  RobotConversationAction,
  RobotConversationReply,
} from "../types/robotConversation";
import {
  getCurrentStudySlugFromPath,
  getRobotConversationContext,
} from "../utils/robotConversationContext";
import { RobotTypingText } from "./RobotTypingText";

type RobotConversationMessage = {
  actions?: RobotConversationAction[];
  id: string;
  isPending?: boolean;
  role: "assistant" | "user";
  text: string;
};

type RobotConversationPanelProps = {
  onClose: () => void;
  sessionKey: string;
};

const RobotConversationPortal = styled.div`
    position: fixed;
    right: clamp(1.6rem, 4vw, 3rem);
    bottom: clamp(9rem, 14vh, 12rem);
    z-index: 12;
    width: min(42rem, calc(100vw - 2rem));
    pointer-events: none;

    .conversation-shell {
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        max-height: min(70vh, 52rem);
        padding: 1.4rem;
        border-radius: 2.2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.94) 0%, rgba(5, 14, 22, 0.94) 100%);
        box-shadow:
            0 1.6rem 4rem rgba(0, 0, 0, 0.32),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(14px);
    }

    .conversation-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
    }

    .conversation-title {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .conversation-title strong {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.22rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .conversation-title span {
        color: rgba(var(--scene-accent-soft-rgb), 0.74);
        font-size: 0.96rem;
        line-height: 1.6;
    }

    .conversation-close {
        width: 4rem;
        height: 4rem;
        min-width: 0;
        padding: 0;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(10, 23, 33, 0.88);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        color: rgba(var(--scene-title-rgb), 0.92);
    }

    .conversation-feed {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        overflow-y: auto;
        padding-right: 0.3rem;
    }

    .message {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        padding: 1rem 1.15rem;
        border-radius: 1.6rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
    }

    .message.assistant {
        align-self: stretch;
        background: rgba(8, 19, 31, 0.84);
    }

    .message.user {
        align-self: flex-end;
        max-width: 88%;
        background: rgba(var(--scene-accent-rgb), 0.1);
    }

    .message-label {
        color: rgba(var(--scene-accent-soft-rgb), 0.64);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.74rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .message p {
        margin: 0;
        color: rgba(var(--scene-title-rgb), 0.94);
        font-size: 1rem;
        line-height: 1.72;
        white-space: pre-wrap;
    }

    .message.pending p {
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-family: "IBM Plex Mono", monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .message-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
    }

    .message-action {
        min-width: 0;
        padding: 0.72rem 0.95rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-title-rgb), 0.94);
        font-size: 0.86rem;
        letter-spacing: 0.04em;
    }

    .conversation-form {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 0.8rem;
        align-items: center;
    }

    .conversation-input {
        width: 100%;
        min-width: 0;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(8, 19, 31, 0.9);
        color: rgba(var(--scene-title-rgb), 0.96);
        padding: 0.95rem 1.2rem;
    }

    .conversation-send {
        width: 4.4rem;
        min-width: 0;
        height: 4.4rem;
        padding: 0;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 900px) {
        right: 1rem;
        left: 1rem;
        width: auto;
        bottom: 8.2rem;
    }
`;

const createConversationMessage = (message: Omit<RobotConversationMessage, "id">): RobotConversationMessage => ({
  id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${message.role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  ...message,
});

const bootstrappedConversationSessions = new Set<string>();

export const RobotConversationPanel = ({ onClose, sessionKey }: RobotConversationPanelProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [messages, setMessages] = useState<RobotConversationMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const sendPrompt = useCallback(async (prompt: string) => {
  const trimmedPrompt = prompt.trim();

  if (!trimmedPrompt || isThinking) {
    return;
  }

  const userMessage = createConversationMessage({
    role: "user",
    text: trimmedPrompt,
  });

  const pendingMessage = createConversationMessage({
    isPending: true,
    role: "assistant",
    text: "Lendo o contexto",
  });

  setMessages((currentMessages) => [...currentMessages, userMessage, pendingMessage]);
  setIsThinking(true);

  try {
    const response: RobotConversationReply = await robotConversationApi.converse({
      currentPath: `${location.pathname}${location.search}`,
      currentStudySlug: getCurrentStudySlugFromPath(location.pathname),
      navigationContext: getRobotConversationContext(),
      prompt: trimmedPrompt,
    });

    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === pendingMessage.id
          ? {
              actions: response.actions,
              id: message.id,
              role: "assistant",
              text: response.reply,
            }
          : message
      )
    );
  } catch (_error) {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === pendingMessage.id
          ? {
              id: message.id,
              role: "assistant",
              text: "Nao consegui organizar uma resposta agora. Tenta me chamar de novo em alguns instantes.",
            }
          : message
      )
    );
  } finally {
    setIsThinking(false);
  }
}, [isThinking, location.pathname, location.search]);

  const placeholder = useMemo(
    () =>
      isAdmin
        ? "Pergunte sobre comportamento, gargalos ou conteúdo..."
        : "Pergunte o que ver, onde parou ou peça um resumo...",
    [isAdmin]
  );

  useEffect(() => {
  if (!sessionKey) {
    return;
  }

  if (bootstrappedConversationSessions.has(sessionKey)) {
    return;
  }

  bootstrappedConversationSessions.add(sessionKey);
  void sendPrompt("Conversar");
}, [sessionKey, sendPrompt]);

  useEffect(() => {
    const container = feedRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const prompt = inputValue.trim();

    if (!prompt) {
      return;
    }

    setInputValue("");
    void sendPrompt(prompt);
  };

  const handleAction = (action: RobotConversationAction) => {
    if (action.kind === "navigate") {
      navigate(action.path);
      onClose();
      return;
    }

    setInputValue("");
    void sendPrompt(action.prompt);
  };
  const lastAssistantMessageIndex = (() => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const currentMessage = messages[index];

    if (currentMessage.role === "assistant" && !currentMessage.isPending) {
      return index;
    }
  }

  return -1;
})();

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <RobotConversationPortal>
      <div className="conversation-shell">
        <div className="conversation-header">
          <div className="conversation-title">
            <strong>Conversar</strong>
            <span>
              {isAdmin
                ? "Leitura contextual do produto, da navegação e dos gargalos."
                : "Guia contextual da experiência, sem repetir o centro de notificações."}
            </span>
          </div>

          <button
            aria-label="Fechar conversa do robô"
            className="conversation-close"
            onClick={onClose}
            type="button"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="conversation-feed" ref={feedRef}>
          {messages.map((message, index) => {
            const isLatestAssistantMessage = lastAssistantMessageIndex === index;

            return (
              <div
                className={`message ${message.role} ${message.isPending ? "pending" : ""}`}
                key={message.id}
              >
                <span className="message-label">
                  {message.role === "assistant" ? "Robô" : "Você"}
                </span>

                <p>
                  {message.isPending ? (
                    "Lendo o contexto..."
                  ) : isLatestAssistantMessage ? (
                    <RobotTypingText text={message.text} />
                  ) : (
                    message.text
                  )}
                </p>

                {message.actions?.length ? (
                  <div className="message-actions">
                    {message.actions.map((action) => (
                      <button
                        className="message-action"
                        key={action.id}
                        onClick={() => handleAction(action)}
                        type="button"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <form className="conversation-form" onSubmit={handleSubmit}>
          <input
            className="conversation-input"
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={placeholder}
            type="text"
            value={inputValue}
          />

          <button
            aria-label="Enviar mensagem para o robô"
            className="conversation-send"
            disabled={isThinking}
            type="submit"
          >
            <PaperPlaneTilt size={18} weight="fill" />
          </button>
        </form>
      </div>
    </RobotConversationPortal>,
    document.body
  );
};
