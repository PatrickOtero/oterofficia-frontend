import type { SpaceTheme } from "./spaceThemes";

export type RobotQuickMenuActionSource = {
    activeScenePresetLabel: string;
    cameraHint?: string;
    isContentScene?: boolean;
    isCameraManualMode: boolean;
    isNotificationAlerting: boolean;
    isNotificationLoading?: boolean;
    nextScenePresetLabel: string;
    nextTheme: SpaceTheme;
    onCameraClick: () => void;
    onCameraNextClick: () => void;
    onCameraPreviousClick: () => void;
    previousTheme: SpaceTheme;
    previousScenePresetLabel: string;
    onConversationClick: () => void;
    onNotificationClick: () => void;
    onTravelClick: () => void;
    onTravelNextClick: () => void;
    onTravelPreviousClick: () => void;
    showCamera: boolean;
    showConversation: boolean;
    showNotification: boolean;
    showTravel: boolean;
    unreadCount: number;
};

export type RobotQuickMenuProps = {
    actions: RobotQuickMenuAction[];
};

export type RobotQuickMenuLauncherMode = "content" | "default";

export type RobotQuickMenuActionId = "camera" | "notification" | "conversation" | "travel";

export type RobotQuickMenuActionPosition = "bottom" | "left" | "top" | "right";

export type RobotQuickMenuActionTone =
    | "camera-manual"
    | "camera-preset"
    | "notification"
    | "conversation"
    | "travel-earth"
    | "travel-space"
    | "travel-asteroids"
    | "travel-jupiter"
    | "travel-mars"
    | "travel-saturn";

export type RobotQuickMenuNavigation = {
    nextAriaLabel: string;
    onNextClick: () => void;
    onPreviousClick: () => void;
    previousAriaLabel: string;
};

export type RobotQuickMenuAction = {
    alerting?: boolean;
    ariaLabel?: string;
    caption?: string;
    iconWeight?: "fill" | "regular";
    id: RobotQuickMenuActionId;
    label: string;
    navigation?: RobotQuickMenuNavigation;
    onClick: () => void;
    position: RobotQuickMenuActionPosition;
    tone: RobotQuickMenuActionTone;
    unreadCount?: number;
};
