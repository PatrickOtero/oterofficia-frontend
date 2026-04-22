import { ROBOT_NAME } from "../../../features/robot/robot.constants";
import type {
    RobotQuickMenuAction,
    RobotQuickMenuActionPosition,
    RobotQuickMenuProps,
} from "./RobotQuickMenu.types";

const ACTION_POSITIONS: Record<number, RobotQuickMenuActionPosition[]> = {
    1: ["top"],
    2: ["left", "right"],
    3: ["left", "top", "right"],
};

type ActionDraft = Omit<RobotQuickMenuAction, "position">;

export const getRobotQuickMenuActions = ({
    isNotificationAlerting,
    isNotificationLoading = false,
    nextTheme,
    onConversationClick,
    onNotificationClick,
    onTravelClick,
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
        actions.push({
            ariaLabel: nextTheme === "mars" ? "Viajar para Marte" : "Voltar para Terra",
            iconWeight: "fill",
            id: "travel",
            label: nextTheme === "mars" ? "Marte" : "Terra",
            onClick: onTravelClick,
            tone: nextTheme === "mars" ? "travel-mars" : "travel-earth",
        });
    }

    const positions = ACTION_POSITIONS[actions.length] || ACTION_POSITIONS[3];

    return actions.map((action, index) => ({
        ...action,
        position: positions[index] || "top",
    }));
};

export const getQuickMenuBadgeLabel = (unreadCount: number) => (unreadCount > 9 ? "9+" : `${unreadCount}`);
