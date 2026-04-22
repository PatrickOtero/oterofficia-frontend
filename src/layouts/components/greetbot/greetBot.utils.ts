import type {
    BeamTarget,
    GreetBotQuickMenuState,
    GreetBotRouteState,
    SpaceTheme,
} from "./greetBot.types";
import type {
    RobotAttentionTarget,
    RobotMotionIntent,
    RobotProjectionTarget,
    RobotSceneSlot,
} from "./types";

const AUTH_ROUTES = new Set([
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/confirm-email-change",
    "/confirm-account-deletion",
]);

type SceneTransition = "idle" | "content-to-home" | "home-to-content" | "menu-to-content";

type QuickMenuVisibilityInput = {
    interactive: boolean;
    isAuthenticated: boolean;
    isBotHovered: boolean;
    isShowingMenu: boolean;
    isTouchDevice: boolean;
    spaceTheme: SpaceTheme;
    unreadCount: number;
};

export const getGreetBotRouteState = (pathname: string): GreetBotRouteState => ({
    isAboutRoute: pathname === "/aboutme",
    isAuthRoute: AUTH_ROUTES.has(pathname),
    isHomeRoute: pathname === "/",
    isPortfolioRoute: pathname === "/portfolio",
});

export const getRobotSceneSlot = ({
    interactive,
    isReturningFromContent,
    sceneTransition,
    shouldDockInDefaultScene,
}: {
    interactive: boolean;
    isReturningFromContent: boolean;
    sceneTransition: SceneTransition;
    shouldDockInDefaultScene: boolean;
}): RobotSceneSlot => {
    if (!interactive) {
        return sceneTransition === "home-to-content" ? "content-entering" : "content-docked";
    }

    if (isReturningFromContent) {
        return "home-returning";
    }

    return shouldDockInDefaultScene ? "home-docked" : "home-center";
};

export const getRobotAttentionTarget = ({
    beamTarget,
    interactive,
    shouldDockInDefaultScene,
}: {
    beamTarget: BeamTarget;
    interactive: boolean;
    shouldDockInDefaultScene: boolean;
}): RobotAttentionTarget => {
    if (!interactive) {
        return beamTarget ? "left" : "center";
    }

    return shouldDockInDefaultScene ? "left" : "center";
};

export const getRobotProjectionTarget = ({
    beamTarget,
    interactive,
    isAboutScene,
    isAuthScene,
    isHomeMenuScene,
    isPortfolioScene,
}: {
    beamTarget: BeamTarget;
    interactive: boolean;
    isAboutScene: boolean;
    isAuthScene: boolean;
    isHomeMenuScene: boolean;
    isPortfolioScene: boolean;
}): RobotProjectionTarget => {
    if (!interactive) {
        if (beamTarget === "auth-panel") {
            return "auth";
        }

        if (beamTarget === "content-menu") {
            return "content";
        }

        return "none";
    }

    if (isAuthScene) {
        return "auth";
    }

    if (isAboutScene) {
        return "about";
    }

    if (isPortfolioScene) {
        return "portfolio";
    }

    return isHomeMenuScene ? "home" : "none";
};

export const getRobotMotionIntent = ({
    attentionTarget,
    slot,
}: {
    attentionTarget: RobotAttentionTarget;
    slot: RobotSceneSlot;
}): RobotMotionIntent => {
    if (slot === "content-entering") {
        return "strafe-right";
    }

    if (slot === "home-returning") {
        return "strafe-left";
    }

    return attentionTarget === "left" ? "turn-left" : "idle";
};

export const getRobotConversationPlacement = (slot: RobotSceneSlot) =>
    slot === "home-center" ? "right" : "left";

export const getQuickMenuState = ({
    interactive,
    isAuthenticated,
    isBotHovered,
    isShowingMenu,
    isTouchDevice,
    spaceTheme,
    unreadCount,
}: QuickMenuVisibilityInput): GreetBotQuickMenuState => {
    const isNotificationAlerting = unreadCount > 0;
    const shouldKeepQuickMenuVisible = interactive && isTouchDevice && !isShowingMenu;
    const showConversation = shouldKeepQuickMenuVisible || isBotHovered;
    const showNotification = Boolean(
        isAuthenticated && (isNotificationAlerting || isBotHovered || shouldKeepQuickMenuVisible)
    );
    const showTravel = shouldKeepQuickMenuVisible || isBotHovered;

    return {
        isNotificationAlerting,
        nextTheme: getNextSpaceTheme(spaceTheme),
        shouldShowQuickMenu: !isShowingMenu && (showConversation || showNotification || showTravel),
        showConversation,
        showNotification,
        showTravel,
        unreadCount,
    };
};

export const getNextSpaceTheme = (spaceTheme: SpaceTheme): SpaceTheme =>
    spaceTheme === "earth" ? "mars" : "earth";

export const createConversationSessionKey = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return `conversation-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
