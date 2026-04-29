import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useNotifications } from "../../../features/notifications/hooks/useNotifications";
import type { NotificationItem } from "../../../features/notifications/types/notification";
import {
    DEFAULT_SCENE_CAMERA_PRESET_ID,
    getNextSceneCameraPresetId,
    getPreviousSceneCameraPresetId,
    getSceneCameraPresetLabel,
} from "../../../features/sceneCamera/sceneCamera.presets";
import { useTouchDevice } from "../../../hooks/useTouchDevice";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { useSceneCameraContext } from "../../../hooks/useSceneCameraContext";
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
import { getNextSpaceTheme, getPreviousSpaceTheme } from "./spaceThemes";

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
    const { applyPreset, camera, isManualMode, toggleManualMode } = useSceneCameraContext();
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
    const isConversationLauncherScene = !interactive || isAboutScene || isPortfolioScene || isAuthScene;
    const isReturningFromContent = isHomeMenuScene && sceneTransition === "content-to-home";
    const isContentConversationFocused = !interactive && isTouchDevice && isConversationOpen;
    const slot = getRobotSceneSlot({
        isContentConversationFocused,
        interactive,
        isReturningFromContent,
        sceneTransition,
        shouldDockInDefaultScene,
    });
    const attentionTarget = getRobotAttentionTarget({
        beamTarget,
        isConversationFocused: isContentConversationFocused,
        interactive,
        shouldDockInDefaultScene,
    });
    const baseProjectionTarget = getRobotProjectionTarget({
        beamTarget,
        interactive,
        isAboutScene,
        isAuthScene,
        isHomeMenuScene,
        isPortfolioScene,
    });
    const projectionTarget = isContentConversationFocused ? "none" : baseProjectionTarget;
    const motionIntent = getRobotMotionIntent({
        attentionTarget,
        slot,
    });
    const conversationPlacement = getRobotConversationPlacement(slot);
    const activeScenePresetId = camera.activePreset ?? DEFAULT_SCENE_CAMERA_PRESET_ID;
    const activeScenePresetLabel =
        camera.activePreset === null && !isManualMode
            ? "Livre"
            : getSceneCameraPresetLabel(activeScenePresetId);
    const nextScenePresetId = getNextSceneCameraPresetId(activeScenePresetId);
    const previousScenePresetId = getPreviousSceneCameraPresetId(activeScenePresetId);
    const quickMenu = getQuickMenuState({
        activeScenePresetLabel,
        isSceneCameraManualMode: isManualMode,
        interactive,
        isAuthenticated,
        isBotHovered,
        isConversationLauncherScene,
        isShowingMenu,
        isTouchDevice,
        nextScenePresetLabel: getSceneCameraPresetLabel(nextScenePresetId),
        spaceTheme,
        previousScenePresetLabel: getSceneCameraPresetLabel(previousScenePresetId),
        unreadCount: feed.unreadCount,
    });
    const shouldShowGreetText = isInteractiveAtHome && !isShowingMenu && isHintVisible && !isConversationOpen;

    const handleConversationClose = useCallback(() => {
        setIsConversationOpen(false);
        setSessionKey(null);
    }, []);

    const handleConversationClick = useCallback(() => {
        setSessionKey(createConversationSessionKey());
        setIsConversationOpen(true);
    }, []);

    const handleNotificationCenterClose = useCallback(() => {
        setIsNotificationCenterOpen(false);
    }, []);

    const handleNotificationClick = useCallback(() => {
        void refreshNotifications();
        setIsNotificationCenterOpen(true);
    }, [refreshNotifications]);

    const handleTravelClick = useCallback(() => {
        setSpaceTheme((currentTheme) => getNextSpaceTheme(currentTheme));
    }, [setSpaceTheme]);

    const handleTravelNextClick = useCallback(() => {
        setSpaceTheme((currentTheme) => getNextSpaceTheme(currentTheme));
    }, [setSpaceTheme]);

    const handleTravelPreviousClick = useCallback(() => {
        setSpaceTheme((currentTheme) => getPreviousSpaceTheme(currentTheme));
    }, [setSpaceTheme]);

    const handleSceneCameraClick = useCallback(() => {
        toggleManualMode();
    }, [toggleManualMode]);

    const handleSceneCameraNextClick = useCallback(() => {
        applyPreset(nextScenePresetId);
    }, [applyPreset, nextScenePresetId]);

    const handleSceneCameraPreviousClick = useCallback(() => {
        applyPreset(previousScenePresetId);
    }, [applyPreset, previousScenePresetId]);

    const handleRobotActivate = useCallback(() => {
        if (!isInteractiveAtHome) {
            return;
        }

        setIsHintVisible(false);
        showHomeMenu();
    }, [isInteractiveAtHome, showHomeMenu]);

    const handleRobotHoverChange = useCallback((hovered: boolean) => {
        setIsBotHovered(hovered);

        if (!isInteractiveAtHome || isShowingMenu) {
            setIsHintVisible(false);
            return;
        }

        setIsHintVisible(hovered);
    }, [isInteractiveAtHome, isShowingMenu]);

    const handleNotificationItemClick = useCallback((item: NotificationItem) => {
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
    }, [markAsRead, navigate]);

    const handleMarkAllNotificationsAsRead = useCallback(() => {
        void markAllAsRead();
    }, [markAllAsRead]);

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
        handleSceneCameraClick,
        handleSceneCameraNextClick,
        handleSceneCameraPreviousClick,
        handleTravelClick,
        handleTravelNextClick,
        handleTravelPreviousClick,
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
