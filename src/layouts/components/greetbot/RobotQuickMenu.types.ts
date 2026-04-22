import type { SpaceTheme } from "./greetBot.types";

export type RobotQuickMenuProps = {
    isNotificationAlerting: boolean;
    isNotificationLoading?: boolean;
    nextTheme: SpaceTheme;
    onConversationClick: () => void;
    onNotificationClick: () => void;
    onTravelClick: () => void;
    showConversation: boolean;
    showNotification: boolean;
    showTravel: boolean;
    unreadCount: number;
};

export type RobotQuickMenuActionId = "notification" | "conversation" | "travel";

export type RobotQuickMenuActionPosition = "left" | "top" | "right";

export type RobotQuickMenuActionTone =
    | "notification"
    | "conversation"
    | "travel-earth"
    | "travel-mars";

export type RobotQuickMenuAction = {
    alerting?: boolean;
    ariaLabel?: string;
    iconWeight?: "fill" | "regular";
    id: RobotQuickMenuActionId;
    label: string;
    onClick: () => void;
    position: RobotQuickMenuActionPosition;
    tone: RobotQuickMenuActionTone;
    unreadCount?: number;
};
