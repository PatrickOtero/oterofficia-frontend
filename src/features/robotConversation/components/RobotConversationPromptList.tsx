import { X } from "phosphor-react";
import type { RobotConversationAction } from "../types/robotConversation";
import { ROBOT_NAME } from "../../robot/robot.constants";

type RobotConversationPromptListProps = {
    actions: RobotConversationAction[];
    description?: string;
    descriptionId?: string;
    dismissAriaLabel: string;
    dismissAutoFocus?: boolean;
    emptyStateText?: string;
    isThinking: boolean;
    latestUserPrompt: string | null;
    onActionSelect: (action: RobotConversationAction) => void;
    onDismiss: () => void;
    statusLabel?: string;
    statusText?: string;
    title?: string;
    titleId?: string;
};

export const RobotConversationPromptList = ({
    actions,
    description = "Escolha a próxima pergunta.",
    descriptionId,
    dismissAriaLabel,
    dismissAutoFocus = false,
    emptyStateText,
    isThinking,
    latestUserPrompt,
    onActionSelect,
    onDismiss,
    statusLabel,
    statusText,
    title = "Diálogo",
    titleId,
}: RobotConversationPromptListProps) => (
    <>
        <div className="conversation-panel-header">
            <div className="conversation-panel-title">
                <strong id={titleId}>{title}</strong>
                <span id={descriptionId}>{description}</span>
            </div>

            <button
                aria-label={dismissAriaLabel}
                autoFocus={dismissAutoFocus}
                className="conversation-close"
                onClick={(event) => {
                    event.stopPropagation();
                    onDismiss();
                }}
                type="button"
            >
                <X size={16} weight="bold" />
            </button>
        </div>

        <div className="conversation-status">
            <strong>{latestUserPrompt ? "Agora" : statusLabel || "Pronto"}</strong>
            <span>
                {latestUserPrompt
                    ? latestUserPrompt
                    : statusText || (isThinking ? `${ROBOT_NAME} está organizando a resposta.` : "Selecione uma pergunta.")}
            </span>
        </div>

        <div className="conversation-option-list">
            {actions.length ? (
                actions.map((action) => (
                    <button
                        className="conversation-option"
                        disabled={isThinking}
                        key={action.id}
                        onClick={(event) => {
                            event.stopPropagation();
                            onActionSelect(action);
                        }}
                        type="button"
                    >
                        <strong>{action.label}</strong>
                    </button>
                ))
            ) : (
                <div className="conversation-option-empty">
                    {emptyStateText || `Aguarde ${ROBOT_NAME} terminar de organizar a resposta.`}
                </div>
            )}
        </div>
    </>
);
