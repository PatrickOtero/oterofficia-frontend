import { RobotTypingText } from "./RobotTypingText";
import { RobotConversationScene } from "./RobotConversationPanel.style";
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

    return (
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

            <div className="conversation-panel">
                <RobotConversationPromptList
                    actions={actions}
                    isThinking={isThinking}
                    latestUserPrompt={latestUserPrompt}
                    onActionSelect={handleActionSelection}
                    onClose={onClose}
                />
            </div>
        </RobotConversationScene>
    );
};
