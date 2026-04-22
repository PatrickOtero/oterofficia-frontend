import type { NotificationFeed, NotificationItem } from "../../../features/notifications/types/notification";
import type {
    RobotAttentionTarget,
    RobotMotionIntent,
    RobotProjectionTarget,
    RobotSceneSlot,
} from "./types";

export type BeamTarget = "auth-panel" | "content-menu" | null;

export type SpaceTheme = "earth" | "mars";

export type GreetBotProps = {
    interactive?: boolean;
    beamTarget?: BeamTarget;
};

export type GreetBotRouteState = {
    isAboutRoute: boolean;
    isAuthRoute: boolean;
    isHomeRoute: boolean;
    isPortfolioRoute: boolean;
};

export type GreetBotQuickMenuState = {
    isNotificationAlerting: boolean;
    nextTheme: SpaceTheme;
    shouldShowQuickMenu: boolean;
    showConversation: boolean;
    showNotification: boolean;
    showTravel: boolean;
    unreadCount: number;
};

export type GreetBotController = {
    attentionTarget: RobotAttentionTarget;
    feed: NotificationFeed;
    handleConversationClick: () => void;
    handleConversationClose: () => void;
    handleMarkAllNotificationsAsRead: () => void;
    handleNotificationCenterClose: () => void;
    handleNotificationClick: () => void;
    handleNotificationItemClick: (item: NotificationItem) => void;
    handleRobotActivate: () => void;
    handleRobotHoverChange: (hovered: boolean) => void;
    handleTravelClick: () => void;
    isConversationOpen: boolean;
    isNotificationCenterOpen: boolean;
    isNotificationsLoading: boolean;
    motionIntent: RobotMotionIntent;
    projectionTarget: RobotProjectionTarget;
    conversationPlacement: "left" | "right";
    quickMenu: GreetBotQuickMenuState;
    sessionKey: string | null;
    shouldShowGreetText: boolean;
    slot: RobotSceneSlot;
};
