import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROBOT_NAME } from "../../robot/robot.constants";
import { robotConversationApi } from "../api/robotConversationApi";
import {
  GUEST_CONVERSATION_EMPTY_STATE,
  GUEST_CONVERSATION_REPLY,
  GUEST_CONVERSATION_STATUS,
} from "../robotConversation.constants";
import type {
  RobotConversationAction,
  RobotConversationReply,
} from "../types/robotConversation";
import {
  getCurrentStudySlugFromPath,
  getRobotConversationContext,
} from "../utils/robotConversationContext";

type RobotConversationMessage = {
  actions?: RobotConversationAction[];
  id: string;
  isPending?: boolean;
  role: "assistant" | "user";
  text: string;
};

type UseRobotConversationSessionInput = {
  isAuthenticated: boolean;
  onClose: () => void;
  sessionKey: string;
};

const bootstrappedConversationSessions = new Set<string>();

const createConversationMessage = (
  message: Omit<RobotConversationMessage, "id">
): RobotConversationMessage => ({
  id:
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${message.role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  ...message,
});

const buildFallbackActions = (prompt: string): RobotConversationAction[] => [
  {
    id: `retry-${prompt}`,
    kind: "prompt",
    label: "Tentar de novo",
    prompt,
  },
];

export const useRobotConversationSession = ({
  isAuthenticated,
  onClose,
  sessionKey,
}: UseRobotConversationSessionInput) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<RobotConversationMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const isGuestRestricted = !isAuthenticated;

  const sendPrompt = useCallback(
    async (prompt: string) => {
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
        text: "Pensando no melhor caminho para você...",
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
        pendingMessage,
      ]);
      setIsThinking(true);

      try {
        const response: RobotConversationReply =
          await robotConversationApi.converse({
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
                  actions: buildFallbackActions(trimmedPrompt),
                  id: message.id,
                  role: "assistant",
                  text: "Perdi o sinal por um instante. Se quiser, me chama de novo e eu retomo daqui.",
                }
              : message
          )
        );
      } finally {
        setIsThinking(false);
      }
    },
    [isThinking, location.pathname, location.search]
  );

  const latestAssistantMessage = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const currentMessage = messages[index];

      if (currentMessage.role === "assistant") {
        return currentMessage;
      }
    }

    return null;
  }, [messages]);

  const latestUserMessage = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const currentMessage = messages[index];

      if (currentMessage.role === "user") {
        return currentMessage;
      }
    }

    return null;
  }, [messages]);

  const handleActionSelection = useCallback(
    (action: RobotConversationAction) => {
      if (isThinking) {
        return;
      }

      if (action.kind === "navigate") {
        navigate(action.path);
        onClose();
        return;
      }

      void sendPrompt(action.prompt);
    },
    [isThinking, navigate, onClose, sendPrompt]
  );

  useEffect(() => {
    if (!sessionKey || bootstrappedConversationSessions.has(sessionKey) || isGuestRestricted) {
      return;
    }

    bootstrappedConversationSessions.add(sessionKey);
    void sendPrompt("Conversar");
  }, [isGuestRestricted, sendPrompt, sessionKey]);

  return {
    actions: isGuestRestricted ? [] : latestAssistantMessage?.actions || [],
    emptyStateText: isGuestRestricted
      ? GUEST_CONVERSATION_EMPTY_STATE
      : `Aguarde ${ROBOT_NAME} terminar de organizar a resposta.`,
    handleActionSelection,
    isGuestRestricted,
    isThinking,
    latestAssistantMessageId: latestAssistantMessage?.id || sessionKey,
    latestReplyText:
      latestAssistantMessage?.text || (isGuestRestricted ? GUEST_CONVERSATION_REPLY : "Pensando no melhor caminho para você..."),
    latestUserPrompt: latestUserMessage?.text || null,
    statusText: isGuestRestricted
      ? GUEST_CONVERSATION_STATUS
      : isThinking
      ? `${ROBOT_NAME} está organizando a resposta.`
      : "Selecione uma pergunta.",
    showThinkingState: isGuestRestricted
      ? false
      : messages.length === 0 || Boolean(latestAssistantMessage?.isPending),
  };
};
