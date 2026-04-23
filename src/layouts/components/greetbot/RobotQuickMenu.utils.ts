import { ROBOT_NAME } from "../../../features/robot/robot.constants";
import { getSpaceThemeLabel } from "./spaceThemes";
import type {
    RobotQuickMenuAction,
    RobotQuickMenuActionPosition,
    RobotQuickMenuActionTone,
    RobotQuickMenuProps,
} from "./RobotQuickMenu.types";

const ACTION_POSITION_BY_ID: Record<RobotQuickMenuAction["id"], RobotQuickMenuActionPosition> = {
    camera: "bottom",
    conversation: "top",
    notification: "left",
    travel: "right",
};

type ActionDraft = Omit<RobotQuickMenuAction, "position">;

const getTravelTone = (spaceTheme: RobotQuickMenuProps["nextTheme"]): RobotQuickMenuActionTone => {
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
}: RobotQuickMenuProps): RobotQuickMenuAction[] => {
    const actions: ActionDraft[] = [];

    if (showNotification) {
        actions.push({
            alerting: isNotificationAlerting,
            ariaLabel: isNotificationAlerting
                ? "Abrir notificacoes nao lidas"
                : "Abrir central de notificacoes",
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
        const nextThemeLabel = getSpaceThemeLabel(nextTheme);
        const previousThemeLabel = getSpaceThemeLabel(previousTheme);

        actions.push({
            ariaLabel: `Viajar para ${nextThemeLabel}`,
            iconWeight: "fill",
            id: "travel",
            label: nextThemeLabel,
            navigation: {
                nextAriaLabel: `Proximo planeta: ${nextThemeLabel}`,
                onNextClick: onTravelNextClick,
                onPreviousClick: onTravelPreviousClick,
                previousAriaLabel: `Planeta anterior: ${previousThemeLabel}`,
            },
            onClick: onTravelClick,
            tone: getTravelTone(nextTheme),
        });
    }

    if (showCamera) {
        actions.push({
            ariaLabel: isCameraManualMode
                ? "Sair do controle manual da camera"
                : "Assumir controle manual da camera",
            caption: cameraHint,
            iconWeight: "fill",
            id: "camera",
            label: isCameraManualMode ? "Pilotando" : "Camera",
            navigation: {
                nextAriaLabel: `Proximo preset de camera: ${nextScenePresetLabel}`,
                onNextClick: onCameraNextClick,
                onPreviousClick: onCameraPreviousClick,
                previousAriaLabel: `Preset anterior de camera: ${previousScenePresetLabel}`,
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
