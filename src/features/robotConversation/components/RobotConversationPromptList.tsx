import { X } from "phosphor-react";
import type { RobotConversationAction } from "../types/robotConversation";
import { ROBOT_NAME } from "../../robot/robot.constants";

type RobotConversationPromptListProps = {
    actions: RobotConversationAction[];
    isThinking: boolean;
    latestUserPrompt: string | null;
    onActionSelect: (action: RobotConversationAction) => void;
    onClose: () => void;
};

export const RobotConversationPromptList = ({
    actions,
    isThinking,
    latestUserPrompt,
    onActionSelect,
    onClose,
}: RobotConversationPromptListProps) => (
    <>
        <div className="conversation-panel-header">
            <div className="conversation-panel-title">
                <strong>Dialogo</strong>
                <span>Escolha a proxima pergunta.</span>
            </div>

            <button
                aria-label={`Encerrar conversa com ${ROBOT_NAME}`}
                className="conversation-close"
                onClick={(event) => {
                    event.stopPropagation();
                    onClose();
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
