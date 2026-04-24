import { memo, useEffect } from "react";
import { GreetText } from "../GreetText";
import { NotificationCenterModal } from "../../../features/notifications/components/NotificationCenterModal";
import { RobotConversationPanel } from "../../../features/robotConversation/components/RobotConversationPanel";
import { useTouchDevice } from "../../../hooks/useTouchDevice";
import type { GreetBotProps } from "./greetBot.types";
import { MobileQuickMenu } from "./MobileQuickMenu";
import { RobotQuickMenu } from "./RobotQuickMenu";
import { getRobotQuickMenuActions } from "./RobotQuickMenu.utils";
import { RoundRobotScene } from "./RoundRobotScene";
import { useGreetBotController } from "./useGreetBotController";

export const GreetBot = memo((props: GreetBotProps) => {
    const interactive = props.interactive ?? true;
    const onConversationVisibilityChange = props.onConversationVisibilityChange;
    const isTouchDevice = useTouchDevice();
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
    const shouldUseConversationLauncher = quickMenu.launcherMode === "content";
    const quickMenuActions = getRobotQuickMenuActions({
        activeScenePresetLabel: quickMenu.activeScenePresetLabel,
        cameraHint: quickMenu.cameraHint,
        isContentScene: shouldUseConversationLauncher,
        isCameraManualMode: quickMenu.isSceneCameraManualMode,
        isNotificationAlerting: quickMenu.isNotificationAlerting,
        isNotificationLoading: isNotificationsLoading,
        nextScenePresetLabel: quickMenu.nextScenePresetLabel,
        nextTheme: quickMenu.nextTheme,
        onCameraClick: handleSceneCameraClick,
        onCameraNextClick: handleSceneCameraNextClick,
        onCameraPreviousClick: handleSceneCameraPreviousClick,
        onConversationClick: handleConversationClick,
        onNotificationClick: handleNotificationClick,
        onTravelClick: handleTravelClick,
        onTravelNextClick: handleTravelNextClick,
        onTravelPreviousClick: handleTravelPreviousClick,
        previousScenePresetLabel: quickMenu.previousScenePresetLabel,
        previousTheme: quickMenu.previousTheme,
        showCamera: quickMenu.showCamera,
        showConversation: quickMenu.showConversation,
        showNotification: quickMenu.showNotification,
        showTravel: quickMenu.showTravel,
        unreadCount: quickMenu.unreadCount,
    });
    const shouldUseFloatingQuickMenu = shouldUseConversationLauncher || isTouchDevice;

    useEffect(() => {
        onConversationVisibilityChange?.(isConversationOpen);
    }, [isConversationOpen, onConversationVisibilityChange]);

    useEffect(
        () => () => {
            onConversationVisibilityChange?.(false);
        },
        [onConversationVisibilityChange]
    );

    return (
        <>
            <RoundRobotScene
                attentionTarget={attentionTarget}
                elevated={isConversationOpen}
                hoverable
                interactive={interactive}
                motionIntent={motionIntent}
                onActivate={handleRobotActivate}
                onHoverChange={handleRobotHoverChange}
                projectionTarget={projectionTarget}
                slot={slot}
            >
                {quickMenu.shouldShowQuickMenu && !isConversationOpen && !shouldUseFloatingQuickMenu ? (
                    <RobotQuickMenu actions={quickMenuActions} />
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

            {quickMenu.shouldShowQuickMenu && !isConversationOpen && shouldUseFloatingQuickMenu ? (
                <MobileQuickMenu
                    actions={quickMenuActions}
                    mode={quickMenu.launcherMode}
                />
            ) : null}
        </>
    );
});
