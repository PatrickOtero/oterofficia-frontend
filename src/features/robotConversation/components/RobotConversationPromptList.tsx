import { X } from "phosphor-react";
import type { RobotConversationAction } from "../types/robotConversation";
import { ROBOT_NAME } from "../../robot/robot.constants";

type RobotConversationPromptListProps = {
    actions: RobotConversationAction[];
    descriptionId?: string;
    dismissAriaLabel: string;
    dismissAutoFocus?: boolean;
    isThinking: boolean;
    latestUserPrompt: string | null;
    onActionSelect: (action: RobotConversationAction) => void;
    onDismiss: () => void;
    titleId?: string;
};

export const RobotConversationPromptList = ({
    actions,
    descriptionId,
    dismissAriaLabel,
    dismissAutoFocus = false,
    isThinking,
    latestUserPrompt,
    onActionSelect,
    onDismiss,
    titleId,
}: RobotConversationPromptListProps) => (
    <>
        <div className="conversation-panel-header">
            <div className="conversation-panel-title">
                <strong id={titleId}>Dialogo</strong>
                <span id={descriptionId}>Escolha a proxima pergunta.</span>
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
            <strong>{latestUserPrompt ? "Agora" : "Pronto"}</strong>
            <span>
                {latestUserPrompt
                    ? latestUserPrompt
                    : isThinking
                      ? `${ROBOT_NAME} esta organizando a resposta.`
                      : "Selecione uma pergunta."}
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
                    {`Aguarde ${ROBOT_NAME} terminar de organizar a resposta.`}
                </div>
            )}
        </div>
    </>
);
