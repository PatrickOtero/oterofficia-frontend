import type { NotificationFeed, NotificationItem } from "../../../features/notifications/types/notification";
import type { SpaceTheme } from "./spaceThemes";
import type {
    RobotAttentionTarget,
    RobotMotionIntent,
    RobotProjectionTarget,
    RobotSceneSlot,
} from "./types";

export type BeamTarget = "auth-panel" | "content-panel" | null;

export type GreetBotProps = {
    interactive?: boolean;
    beamTarget?: BeamTarget;
    onConversationVisibilityChange?: (isOpen: boolean) => void;
};

export type GreetBotRouteState = {
    isAboutRoute: boolean;
    isAuthRoute: boolean;
    isHomeRoute: boolean;
    isPortfolioRoute: boolean;
};

export type GreetBotQuickMenuState = {
    activeScenePresetLabel: string;
    cameraHint?: string;
    currentTheme: SpaceTheme;
    isNotificationAlerting: boolean;
    isSceneCameraManualMode: boolean;
    launcherMode: "content" | "default";
    nextScenePresetLabel: string;
    nextTheme: SpaceTheme;
    previousScenePresetLabel: string;
    previousTheme: SpaceTheme;
    shouldShowQuickMenu: boolean;
    showCamera: boolean;
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
    handleSceneCameraClick: () => void;
    handleSceneCameraNextClick: () => void;
    handleSceneCameraPreviousClick: () => void;
    handleTravelClick: () => void;
    handleTravelNextClick: () => void;
    handleTravelPreviousClick: () => void;
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
