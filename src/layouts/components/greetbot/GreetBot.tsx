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
        handleSceneCameraClick,
        handleSceneCameraNextClick,
        handleSceneCameraPreviousClick,
        handleTravelClick,
        handleTravelNextClick,
        handleTravelPreviousClick,
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
                        activeScenePresetLabel={quickMenu.activeScenePresetLabel}
                        cameraHint={quickMenu.cameraHint}
                        isCameraManualMode={quickMenu.isSceneCameraManualMode}
                        isNotificationAlerting={quickMenu.isNotificationAlerting}
                        isNotificationLoading={isNotificationsLoading}
                        nextScenePresetLabel={quickMenu.nextScenePresetLabel}
                        nextTheme={quickMenu.nextTheme}
                        onCameraClick={handleSceneCameraClick}
                        onCameraNextClick={handleSceneCameraNextClick}
                        onCameraPreviousClick={handleSceneCameraPreviousClick}
                        previousTheme={quickMenu.previousTheme}
                        previousScenePresetLabel={quickMenu.previousScenePresetLabel}
                        onConversationClick={handleConversationClick}
                        onNotificationClick={handleNotificationClick}
                        onTravelClick={handleTravelClick}
                        onTravelNextClick={handleTravelNextClick}
                        onTravelPreviousClick={handleTravelPreviousClick}
                        showCamera={quickMenu.showCamera}
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
