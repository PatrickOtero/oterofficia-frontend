import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useNotifications } from "../../../features/notifications/hooks/useNotifications";
import type { NotificationItem } from "../../../features/notifications/types/notification";
import { useTouchDevice } from "../../../hooks/useTouchDevice";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import type { GreetBotController, GreetBotProps } from "./greetBot.types";
import {
    createConversationSessionKey,
    getGreetBotRouteState,
    getQuickMenuState,
    getRobotConversationPlacement,
    getRobotAttentionTarget,
    getRobotMotionIntent,
    getRobotProjectionTarget,
    getRobotSceneSlot,
} from "./greetBot.utils";

export const useGreetBotController = ({
    beamTarget = null,
    interactive = true,
}: GreetBotProps): GreetBotController => {
    const location = useLocation();
    const navigate = useNavigate();
    const isTouchDevice = useTouchDevice();
    const [isHintVisible, setIsHintVisible] = useState(false);
    const [isBotHovered, setIsBotHovered] = useState(false);
    const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
    const [isConversationOpen, setIsConversationOpen] = useState(false);
    const [sessionKey, setSessionKey] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    const {
        feed,
        isLoading: isNotificationsLoading,
        markAllAsRead,
        markAsRead,
        refreshNotifications,
    } = useNotifications();
    const {
        isShowingMenu,
        sceneTransition,
        setSpaceTheme,
        setSceneTransition,
        spaceTheme,
    } = useBotFunctionsContext();
    const { showHomeMenu } = useBotSceneActions();
    const routeState = getGreetBotRouteState(location.pathname);

    const isInteractiveAtHome = interactive && routeState.isHomeRoute;
    const isAboutScene = interactive && routeState.isAboutRoute;
    const isPortfolioScene = interactive && routeState.isPortfolioRoute;
    const isAuthScene = interactive && routeState.isAuthRoute;
    const isHomeMenuScene = interactive && routeState.isHomeRoute && isShowingMenu;
    const shouldDockInDefaultScene = isAboutScene || isPortfolioScene || isAuthScene || isHomeMenuScene;
    const isReturningFromContent = isHomeMenuScene && sceneTransition === "content-to-home";
    const slot = getRobotSceneSlot({
        interactive,
        isReturningFromContent,
        sceneTransition,
        shouldDockInDefaultScene,
    });
    const attentionTarget = getRobotAttentionTarget({
        beamTarget,
        interactive,
        shouldDockInDefaultScene,
    });
    const projectionTarget = getRobotProjectionTarget({
        beamTarget,
        interactive,
        isAboutScene,
        isAuthScene,
        isHomeMenuScene,
        isPortfolioScene,
    });
    const motionIntent = getRobotMotionIntent({
        attentionTarget,
        slot,
    });
    const conversationPlacement = getRobotConversationPlacement(slot);
    const quickMenu = getQuickMenuState({
        interactive,
        isAuthenticated,
        isBotHovered,
        isShowingMenu,
        isTouchDevice,
        spaceTheme,
        unreadCount: feed.unreadCount,
    });
    const shouldShowGreetText = isInteractiveAtHome && !isShowingMenu && isHintVisible && !isConversationOpen;

    const handleConversationClose = () => {
        setIsConversationOpen(false);
        setSessionKey(null);
    };

    const handleConversationClick = () => {
        setSessionKey(createConversationSessionKey());
        setIsConversationOpen(true);
    };

    const handleNotificationCenterClose = () => {
        setIsNotificationCenterOpen(false);
    };

    const handleNotificationClick = () => {
        void refreshNotifications();
        setIsNotificationCenterOpen(true);
    };

    const handleTravelClick = () => {
        setSpaceTheme((currentTheme) => (currentTheme === "earth" ? "mars" : "earth"));
    };

    const handleRobotActivate = () => {
        if (!isInteractiveAtHome) {
            return;
        }

        setIsHintVisible(false);
        showHomeMenu();
    };

    const handleRobotHoverChange = (hovered: boolean) => {
        setIsBotHovered(hovered);

        if (!isInteractiveAtHome || isShowingMenu) {
            setIsHintVisible(false);
            return;
        }

        setIsHintVisible(hovered);
    };

    const handleNotificationItemClick = (item: NotificationItem) => {
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
    };

    const handleMarkAllNotificationsAsRead = () => {
        void markAllAsRead();
    };

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
        setIsConversationOpen(false);
        setSessionKey(null);
    }, [location.pathname]);

    return {
        attentionTarget,
        feed,
        handleConversationClick,
        handleConversationClose,
        handleMarkAllNotificationsAsRead,
        handleNotificationCenterClose,
        handleNotificationClick,
        handleNotificationItemClick,
        handleRobotActivate,
        handleRobotHoverChange,
        handleTravelClick,
        isConversationOpen,
        isNotificationCenterOpen,
        isNotificationsLoading,
        motionIntent,
        projectionTarget,
        conversationPlacement,
        quickMenu,
        sessionKey,
        shouldShowGreetText,
        slot,
    };
};
