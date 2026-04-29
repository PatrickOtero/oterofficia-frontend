import { ROBOT_NAME } from "../../../features/robot/robot.constants";
import { getSpaceThemeLabel, type SpaceTheme } from "./spaceThemes";
import type {
    RobotQuickMenuAction,
    RobotQuickMenuActionPosition,
    RobotQuickMenuActionSource,
    RobotQuickMenuActionTone,
} from "./RobotQuickMenu.types";

const ACTION_POSITION_BY_ID: Record<RobotQuickMenuAction["id"], RobotQuickMenuActionPosition> = {
    camera: "bottom",
    conversation: "top",
    notification: "left",
    travel: "right",
};

type ActionDraft = Omit<RobotQuickMenuAction, "position">;

const getTravelTone = (spaceTheme: SpaceTheme): RobotQuickMenuActionTone => {
    if (spaceTheme === "mars") {
        return "travel-mars";
    }

    if (spaceTheme === "jupiter") {
        return "travel-jupiter";
    }

    if (spaceTheme === "saturn") {
        return "travel-saturn";
    }

    if (spaceTheme === "space") {
        return "travel-space";
    }

    if (spaceTheme === "asteroids") {
        return "travel-asteroids";
    }

    return "travel-earth";
};

export const getRobotQuickMenuActions = ({
    activeScenePresetLabel,
    cameraHint,
    currentTheme,
    isContentScene = false,
    isCameraManualMode,
    isNotificationAlerting,
    isNotificationLoading = false,
    nextScenePresetLabel,
    nextTheme,
    onCameraClick,
    onCameraNextClick,
    onCameraPreviousClick,
    previousTheme,
    previousScenePresetLabel,
    onConversationClick,
    onNotificationClick,
    onTravelClick,
    onTravelNextClick,
    onTravelPreviousClick,
    showCamera,
    showConversation,
    showNotification,
    showTravel,
    unreadCount,
}: RobotQuickMenuActionSource): RobotQuickMenuAction[] => {
    const actions: ActionDraft[] = [];

    if (isContentScene) {
        actions.push({
            ariaLabel: `Abrir conversa com ${ROBOT_NAME}`,
            iconWeight: "fill",
            id: "conversation",
            label: "Conversar",
            onClick: onConversationClick,
            tone: "conversation",
        });

        return actions.map((action) => ({
            ...action,
            position: ACTION_POSITION_BY_ID[action.id] || "top",
        }));
    }

    if (showNotification) {
        actions.push({
            alerting: isNotificationAlerting,
            ariaLabel: isNotificationAlerting
                ? "Abrir notificações não lidas"
                : "Abrir central de notificações",
            iconWeight: isNotificationLoading || isNotificationAlerting ? "fill" : "regular",
            id: "notification",
            label: "Alertas",
            onClick: onNotificationClick,
            tone: "notification",
            unreadCount,
        });
    }

    if (showConversation) {
        actions.push({
            ariaLabel: `Abrir conversa com ${ROBOT_NAME}`,
            iconWeight: "fill",
            id: "conversation",
            label: "Conversa",
            onClick: onConversationClick,
            tone: "conversation",
        });
    }

    if (showTravel) {
        const currentThemeLabel = getSpaceThemeLabel(currentTheme);
        const nextThemeLabel = getSpaceThemeLabel(nextTheme);
        const previousThemeLabel = getSpaceThemeLabel(previousTheme);

        actions.push({
            ariaLabel: `Viajar para ${nextThemeLabel}`,
            iconWeight: "fill",
            id: "travel",
            caption: "Planeta atual",
            label: currentThemeLabel,
            navigation: {
                nextAriaLabel: `Próximo planeta: ${nextThemeLabel}`,
                onNextClick: onTravelNextClick,
                onPreviousClick: onTravelPreviousClick,
                previousAriaLabel: `Planeta anterior: ${previousThemeLabel}`,
            },
            onClick: onTravelClick,
            tone: getTravelTone(currentTheme),
        });
    }

    if (showCamera) {
        actions.push({
            ariaLabel: isCameraManualMode
                ? "Sair do controle manual da câmera"
                : "Assumir controle manual da câmera",
            caption: cameraHint,
            iconWeight: "fill",
            id: "camera",
            label: isCameraManualMode ? "Pilotando" : "Câmera",
            navigation: {
                nextAriaLabel: `Próximo preset de câmera: ${nextScenePresetLabel}`,
                onNextClick: onCameraNextClick,
                onPreviousClick: onCameraPreviousClick,
                previousAriaLabel: `Preset anterior de câmera: ${previousScenePresetLabel}`,
            },
            onClick: onCameraClick,
            tone: isCameraManualMode ? "camera-manual" : "camera-preset",
        });
    }

    return actions.map((action) => ({
        ...action,
        caption: action.id === "camera" && !isCameraManualMode ? activeScenePresetLabel : action.caption,
        position: ACTION_POSITION_BY_ID[action.id] || "top",
    }));
};

export const getQuickMenuBadgeLabel = (unreadCount: number) => (unreadCount > 9 ? "9+" : `${unreadCount}`);
