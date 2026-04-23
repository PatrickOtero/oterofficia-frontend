import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "phosphor-react";
import { useTouchDevice } from "../../../hooks/useTouchDevice";
import { RobotTypingText } from "./RobotTypingText";
import {
    RobotConversationModalPortal,
    RobotConversationScene,
} from "./RobotConversationPanel.style";
import { RobotConversationPromptList } from "./RobotConversationPromptList";
import { useRobotConversationSession } from "../hooks/useRobotConversationSession";
import { ROBOT_NAME } from "../../robot/robot.constants";

type RobotConversationPanelProps = {
    onClose: () => void;
    placement?: "left" | "right";
    sessionKey: string;
};

export const RobotConversationPanel = ({
    onClose,
    placement = "right",
    sessionKey,
}: RobotConversationPanelProps) => {
    const isTouchDevice = useTouchDevice();
    const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
    const launcherRef = useRef<HTMLButtonElement | null>(null);
    const dialogTitleId = useId();
    const dialogDescriptionId = useId();
    const {
        actions,
        handleActionSelection,
        isThinking,
        latestAssistantMessageId,
        latestReplyText,
        latestUserPrompt,
        showThinkingState,
    } = useRobotConversationSession({
        onClose,
        sessionKey,
    });

    const closePromptModal = () => {
        setIsPromptModalOpen(false);

        window.requestAnimationFrame(() => {
            launcherRef.current?.focus();
        });
    };

    useEffect(() => {
        if (!isPromptModalOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closePromptModal();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPromptModalOpen]);

    const shouldUseMobilePromptModal = isTouchDevice;
    const promptLauncherLabel = latestUserPrompt ? "Continuar dialogo" : "Abrir perguntas";
    const promptLauncherCaption = isThinking
        ? "Aguardando resposta"
        : actions.length
          ? "Escolher pergunta"
          : "Sem opcoes por enquanto";

    const scene = (
        <RobotConversationScene
            $placement={placement}
            onClick={(event) => event.stopPropagation()}
        >
            <div className="conversation-thought" aria-live="polite">
                <div className="conversation-thought-shell">
                    <div className="conversation-thought-scroll">
                        <span className="conversation-thought-label">{ROBOT_NAME}</span>
                        <p className="conversation-thought-copy typing">
                            <RobotTypingText
                                key={latestAssistantMessageId}
                                speed={showThinkingState ? 18 : 12}
                                text={latestReplyText}
                            />
                        </p>
                    </div>
                </div>
            </div>

            {shouldUseMobilePromptModal ? (
                <div className="conversation-controls">
                    <button
                        aria-controls={isPromptModalOpen ? dialogTitleId : undefined}
                        aria-expanded={isPromptModalOpen}
                        aria-haspopup="dialog"
                        className="conversation-launcher"
                        onClick={() => {
                            setIsPromptModalOpen(true);
                        }}
                        ref={launcherRef}
                        type="button"
                    >
                        <strong>{promptLauncherLabel}</strong>
                        <span>{promptLauncherCaption}</span>
                    </button>

                    <button
                        aria-label={`Encerrar conversa com ${ROBOT_NAME}`}
                        className="conversation-end-button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onClose();
                        }}
                        type="button"
                    >
                        <X size={16} weight="bold" />
                    </button>
                </div>
            ) : (
                <div className="conversation-panel">
                    <RobotConversationPromptList
                        actions={actions}
                        dismissAriaLabel={`Encerrar conversa com ${ROBOT_NAME}`}
                        isThinking={isThinking}
                        latestUserPrompt={latestUserPrompt}
                        onActionSelect={handleActionSelection}
                        onDismiss={onClose}
                    />
                </div>
            )}
        </RobotConversationScene>
    );

    if (typeof document === "undefined" || !shouldUseMobilePromptModal || !isPromptModalOpen) {
        return scene;
    }

    return (
        <>
            {scene}
            {createPortal(
                <RobotConversationModalPortal
                    onClick={() => {
                        closePromptModal();
                    }}
                >
                    <div
                        aria-describedby={dialogDescriptionId}
                        aria-labelledby={dialogTitleId}
                        aria-modal="true"
                        className="conversation-modal-shell"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                    >
                        <RobotConversationPromptList
                            actions={actions}
                            descriptionId={dialogDescriptionId}
                            dismissAriaLabel="Fechar perguntas do dialogo"
                            dismissAutoFocus
                            isThinking={isThinking}
                            latestUserPrompt={latestUserPrompt}
                            onActionSelect={(action) => {
                                handleActionSelection(action);
                                closePromptModal();
                            }}
                            onDismiss={closePromptModal}
                            titleId={dialogTitleId}
                        />
                    </div>
                </RobotConversationModalPortal>,
                    document.body
                )}
        </>
    );
};
