import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GreetText } from "../GreetText";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { RoundRobotScene } from "./RoundRobotScene";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useNotifications } from "../../../features/notifications/hooks/useNotifications";
import { NotificationCenterModal } from "../../../features/notifications/components/NotificationCenterModal";
import { RobotConversationPanel } from "../../../features/robotConversation/components/RobotConversationPanel";
import { RobotQuickMenu } from "./RobotQuickMenu";
import type {
    RobotAttentionTarget,
    RobotMotionIntent,
    RobotProjectionTarget,
    RobotSceneSlot,
} from "./types";

type BeamTarget = "auth-panel" | "content-menu" | null;

type GreetBotProps = {
    interactive?: boolean;
    beamTarget?: BeamTarget;
};

export const GreetBot = memo(({ interactive = true, beamTarget = null }: GreetBotProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isHintVisible, setIsHintVisible] = useState(false);
    const [isBotHovered, setIsBotHovered] = useState(false);
    const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
    const [isConversationOpen, setIsConversationOpen] = useState(false);
    const [conversationSessionKey, setConversationSessionKey] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    const {
        feed,
        isLoading: isNotificationsLoading,
        markAllAsRead,
        markAsRead,
        refreshNotifications,
    } = useNotifications();
    const isHomeRoute = location.pathname === "/";
    const isAboutRoute = location.pathname === "/aboutme";
    const isPortfolioRoute = location.pathname === "/portfolio";
    const isAuthRoute =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/reset-password" ||
        location.pathname === "/verify-email" ||
        location.pathname === "/confirm-email-change" ||
        location.pathname === "/confirm-account-deletion";
    const {
        isShowingMenu,
        sceneTransition,
        setSpaceTheme,
        setSceneTransition,
        spaceTheme,
    } = useBotFunctionsContext();
    const { showHomeMenu } = useBotSceneActions();

    const isInteractiveAtHome = interactive && isHomeRoute;
    const isAboutScene = interactive && isAboutRoute;
    const isPortfolioScene = interactive && isPortfolioRoute;
    const isAuthScene = interactive && isAuthRoute;
    const isHomeMenuScene = interactive && isHomeRoute && isShowingMenu;
    const shouldDockInDefaultScene = isAboutScene || isPortfolioScene || isAuthScene || isHomeMenuScene;
    const isReturningFromContent = isHomeMenuScene && sceneTransition === "content-to-home";
    const shouldShowGreetText = isInteractiveAtHome && !isShowingMenu && isHintVisible && !isConversationOpen;

    useEffect(() => {
        if (!isReturningFromContent) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSceneTransition("idle");
        }, 1080);

        return () => window.clearTimeout(timeoutId);
    }, [isReturningFromContent, setSceneTransition]);

    useEffect(() => {
        if (interactive || (sceneTransition !== "home-to-content" && sceneTransition !== "menu-to-content")) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSceneTransition("idle");
        }, sceneTransition === "home-to-content" ? 980 : 220);

        return () => window.clearTimeout(timeoutId);
    }, [interactive, sceneTransition, setSceneTransition]);

    useEffect(() => {
        if (isInteractiveAtHome && !isShowingMenu) {
            return;
        }

        setIsHintVisible(false);
    }, [isInteractiveAtHome, isShowingMenu]);

    useEffect(() => {
        if (!isAuthenticated) {
            setIsNotificationCenterOpen(false);
            if (!interactive) {
                setIsBotHovered(false);
            }
        }
    }, [interactive, isAuthenticated]);

    useEffect(() => {
        if (!isConversationOpen) {
            return;
        }

        setIsHintVisible(false);
    }, [isConversationOpen]);

    useEffect(() => {
    closeConversationPanel();
}, [location.pathname]);

    useEffect(() => {
        if (!isBotHovered) {
            return;
        }

        if (isConversationOpen) {
            setIsHintVisible(false);
        }
    }, [isBotHovered, isConversationOpen]);

    useEffect(() => {
    if (shouldShowGreetText || isConversationOpen) {
        return;
    }

    setIsHintVisible(false);
}, [shouldShowGreetText, isConversationOpen]);

    const slot: RobotSceneSlot = interactive
        ? isReturningFromContent
            ? "home-returning"
            : shouldDockInDefaultScene
              ? "home-docked"
              : "home-center"
        : sceneTransition === "home-to-content"
          ? "content-entering"
          : "content-docked";

    const attentionTarget: RobotAttentionTarget = !interactive
        ? beamTarget
            ? "left"
            : "center"
        : shouldDockInDefaultScene
          ? "left"
          : "center";

    const projectionTarget: RobotProjectionTarget = !interactive
        ? beamTarget === "auth-panel"
            ? "auth"
            : beamTarget === "content-menu"
              ? "content"
              : "none"
        : isAuthScene
          ? "auth"
          : isAboutScene
            ? "about"
            : isPortfolioScene
              ? "portfolio"
              : isHomeMenuScene
                ? "home"
                : "none";

    const motionIntent: RobotMotionIntent =
        slot === "content-entering"
            ? "strafe-right"
            : slot === "home-returning"
              ? "strafe-left"
              : attentionTarget === "left"
                ? "turn-left"
                : "idle";

    const hasUnreadNotifications = feed.unreadCount > 0;
    const shouldShowConversationAction = isBotHovered;
    const shouldShowNotificationAction = Boolean(isAuthenticated && (hasUnreadNotifications || isBotHovered));
    const shouldShowTravelAction = isBotHovered;
    const shouldShowQuickMenu =
        shouldShowConversationAction || shouldShowTravelAction || shouldShowNotificationAction;
    const nextSpaceTheme = spaceTheme === "earth" ? "mars" : "earth";

    const openConversationPanel = () => {
    const nextSessionKey =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `conversation-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setConversationSessionKey(nextSessionKey);
    setIsConversationOpen(true);
};

const closeConversationPanel = () => {
    setIsConversationOpen(false);
    setConversationSessionKey(null);
};

    return (
        <>
            <RoundRobotScene
                attentionTarget={attentionTarget}
                hoverable
                interactive={interactive}
                motionIntent={motionIntent}
                projectionTarget={projectionTarget}
                onActivate={() => {
                    if (!isInteractiveAtHome) {
                        return;
                    }

                    setIsHintVisible(false);
                    showHomeMenu();
                }}
                onHoverChange={(hovered) => {
                    setIsBotHovered(hovered);

                    if (!isInteractiveAtHome || isShowingMenu) {
                        setIsHintVisible(false);
                        return;
                    }

                    setIsHintVisible(hovered);
                }}
                slot={slot}
            >
                {shouldShowQuickMenu ? (
                    <RobotQuickMenu
                        onConversationClick={openConversationPanel}
                        isNotificationAlerting={hasUnreadNotifications}
                        isNotificationLoading={isNotificationsLoading}
                        nextTheme={nextSpaceTheme}
                        onNotificationClick={() => {
                            void refreshNotifications();
                            setIsNotificationCenterOpen(true);
                        }}
                        onTravelClick={() => {
                            setSpaceTheme((currentTheme) => (currentTheme === "earth" ? "mars" : "earth"));
                        }}
                        showConversation={shouldShowConversationAction}
                        showNotification={shouldShowNotificationAction}
                        showTravel={shouldShowTravelAction}
                        unreadCount={feed.unreadCount}
                    />
                ) : null}
                {shouldShowGreetText ? (
                    <GreetText />
                ) : null}
            </RoundRobotScene>

            {isNotificationCenterOpen ? (
                <NotificationCenterModal
                    feed={feed}
                    onClose={() => setIsNotificationCenterOpen(false)}
                    onItemClick={(item) => {
                        const openTarget = async () => {
                            if (!item.readAt) {
                                await markAsRead(item.id);
                            }

                            setIsNotificationCenterOpen(false);

                            if (item.targetPath) {
                                navigate(item.targetPath);
                            }
                        };

                        void openTarget();
                    }}
                    onMarkAllAsRead={() => {
                        void markAllAsRead();
                    }}
                />
            ) : null}

            {isConversationOpen && conversationSessionKey ? (
    <RobotConversationPanel
        onClose={closeConversationPanel}
        sessionKey={conversationSessionKey}
    />
) : null}
        </>
    );
});
