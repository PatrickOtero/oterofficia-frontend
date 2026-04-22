import { memo } from "react";
import { GreetText } from "../GreetText";
import { NotificationCenterModal } from "../../../features/notifications/components/NotificationCenterModal";
import { RobotConversationPanel } from "../../../features/robotConversation/components/RobotConversationPanel";
import type { GreetBotProps } from "./greetBot.types";
import { RobotQuickMenu } from "./RobotQuickMenu";
import { RoundRobotScene } from "./RoundRobotScene";
import { useGreetBotController } from "./useGreetBotController";

export const GreetBot = memo((props: GreetBotProps) => {
    const interactive = props.interactive ?? true;
    const {
        attentionTarget,
        conversationPlacement,
        feed,
        handleConversationClick,
        handleConversationClose,
        handleMarkAllNotificationsAsRead,
        handleNotificationCenterClose,
        handleNotificationClick,
        handleNotificationItemClick,
        handleRobotActivate,
        handleRobotHoverChange,
        handleTravelClick,
        isConversationOpen,
        isNotificationCenterOpen,
        isNotificationsLoading,
        motionIntent,
        projectionTarget,
        quickMenu,
        sessionKey,
        shouldShowGreetText,
        slot,
    } = useGreetBotController(props);

    return (
        <>
            <RoundRobotScene
                attentionTarget={attentionTarget}
                hoverable
                interactive={interactive}
                motionIntent={motionIntent}
                onActivate={handleRobotActivate}
                onHoverChange={handleRobotHoverChange}
                projectionTarget={projectionTarget}
                slot={slot}
            >
                {quickMenu.shouldShowQuickMenu && !isConversationOpen ? (
                    <RobotQuickMenu
                        isNotificationAlerting={quickMenu.isNotificationAlerting}
                        isNotificationLoading={isNotificationsLoading}
                        nextTheme={quickMenu.nextTheme}
                        onConversationClick={handleConversationClick}
                        onNotificationClick={handleNotificationClick}
                        onTravelClick={handleTravelClick}
                        showConversation={quickMenu.showConversation}
                        showNotification={quickMenu.showNotification}
                        showTravel={quickMenu.showTravel}
                        unreadCount={quickMenu.unreadCount}
                    />
                ) : null}
                {shouldShowGreetText ? <GreetText /> : null}
                {isConversationOpen && sessionKey ? (
                    <RobotConversationPanel
                        onClose={handleConversationClose}
                        placement={conversationPlacement}
                        sessionKey={sessionKey}
                    />
                ) : null}
            </RoundRobotScene>

            {isNotificationCenterOpen ? (
                <NotificationCenterModal
                    feed={feed}
                    onClose={handleNotificationCenterClose}
                    onItemClick={handleNotificationItemClick}
                    onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                />
            ) : null}
        </>
    );
});
