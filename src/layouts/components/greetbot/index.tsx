import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GreetText } from "../GreetText";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { RoundRobotScene } from "./RoundRobotScene";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useNotifications } from "../../../features/notifications/hooks/useNotifications";
import { NotificationCenterModal } from "../../../features/notifications/components/NotificationCenterModal";
import { RobotQuickMenu } from "./RobotQuickMenu";
import { robotInsightsApi } from "../../../features/robot/api/robotInsightsApi";
import { SiteVisitorSummary } from "../../../features/robot/types/robotInsights";
import {
    ensureAdminPresenceSession,
    getAdminPresenceBriefingWindow,
} from "../../../features/robot/utils/adminPresenceWindow";
import { RobotSpeechBubble } from "./RobotSpeechBubble";
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

type RobotSpeech = {
    detail?: string;
    message: string;
    title?: string;
};

const formatShortDateTime = (value: string | null) => {
    if (!value) {
        return null;
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        month: "2-digit",
    }).format(new Date(value));
};

const pluralize = (value: number, singular: string, plural: string) => (value === 1 ? singular : plural);

const buildVisitorBriefingSpeech = (summary: SiteVisitorSummary): RobotSpeech => {
    const lastVisit = formatShortDateTime(summary.lastVisitAt);

    if (!summary.since || !summary.until) {
        return {
            detail: lastVisit ? `Ultimo movimento no radar: ${lastVisit}.` : undefined,
            message: `Ainda nao tenho sua ultima saida registrada. No radar atual, ja detectei ${summary.totalVisitors} ${pluralize(summary.totalVisitors, "visitante", "visitantes")} no seu site.`,
            title: "Radar sem ancora",
        };
    }

    if (summary.visitorsSince <= 0) {
        return {
            detail: lastVisit ? `Ultimo movimento captado em ${lastVisit}.` : undefined,
            message: "Desde a ultima vez que voce esteve fora, nenhum visitante novo apareceu no radar do seu site.",
            title: "Tudo calmo",
        };
    }

    const entriesSnippet =
        summary.entriesSince > summary.visitorsSince
            ? ` Foram ${summary.entriesSince} entradas nesse intervalo.`
            : "";
    const newVisitorsSnippet =
        summary.newVisitorsSince > 0
            ? ` ${summary.newVisitorsSince} ${pluralize(summary.newVisitorsSince, "era", "eram")} visitante${summary.newVisitorsSince === 1 ? "" : "s"} totalmente novo${summary.newVisitorsSince === 1 ? "" : "s"} por aqui.`
            : " Todos ja tinham passado por aqui antes.";

    return {
        detail: lastVisit ? `Ultima leitura captada em ${lastVisit}.` : undefined,
        message: `Enquanto voce esteve fora, ${summary.visitorsSince} ${pluralize(summary.visitorsSince, "visitante apareceu", "visitantes apareceram")} no seu site.${entriesSnippet}${newVisitorsSnippet}`,
        title: "Atualizacao do radar",
    };
};

export const GreetBot = memo(({ interactive = true, beamTarget = null }: GreetBotProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isHintVisible, setIsHintVisible] = useState(false);
    const [isBotHovered, setIsBotHovered] = useState(false);
    const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
    const [robotSpeech, setRobotSpeech] = useState<RobotSpeech | null>(null);
    const { isAdmin, isAuthenticated, user } = useAuth();
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
    const shouldShowGreetText = isInteractiveAtHome && !isShowingMenu && isHintVisible && !robotSpeech;

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
            setIsBotHovered(false);
            setRobotSpeech(null);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!robotSpeech) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setRobotSpeech(null);
        }, 9000);

        return () => window.clearTimeout(timeoutId);
    }, [robotSpeech]);

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
    const shouldAllowNotificationHover = Boolean(isAuthenticated);
    const shouldShowNotificationAction = Boolean(isAuthenticated && (hasUnreadNotifications || isBotHovered));
    const shouldShowUpdateAction = Boolean(isAdmin && isBotHovered);
    const shouldShowTravelAction = isBotHovered;
    const shouldShowQuickMenu = shouldShowTravelAction || shouldShowNotificationAction || shouldShowUpdateAction;
    const nextSpaceTheme = spaceTheme === "earth" ? "mars" : "earth";

    return (
        <>
            <RoundRobotScene
                attentionTarget={attentionTarget}
                hoverable={Boolean(!interactive || (isAuthenticated && shouldAllowNotificationHover))}
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
                        onUpdateClick={() => {
                            const openRobotUpdateSpeech = async () => {
                                setRobotSpeech({
                                    message: "Estou varrendo o radar do seu site para te atualizar sobre o movimento enquanto voce esteve fora.",
                                    title: "Lendo o espaco",
                                });

                                try {
                                    const briefingWindow = user
                                        ? (() => {
                                              const currentWindow = getAdminPresenceBriefingWindow(user.id);

                                              if (currentWindow.until) {
                                                  return currentWindow;
                                              }

                                              return ensureAdminPresenceSession(user.id);
                                          })()
                                        : { since: null, until: null };
                                    const summary = await robotInsightsApi.fetchSiteVisitorSummary(briefingWindow);
                                    setRobotSpeech(buildVisitorBriefingSpeech(summary));
                                } catch (_error) {
                                    setRobotSpeech({
                                        message: "Nao consegui ler o radar agora. Tenta me chamar de novo em alguns instantes.",
                                        title: "Sinal instavel",
                                    });
                                }
                            };

                            void openRobotUpdateSpeech();
                        }}
                        showNotification={shouldShowNotificationAction}
                        showTravel={shouldShowTravelAction}
                        showUpdate={shouldShowUpdateAction}
                        unreadCount={feed.unreadCount}
                    />
                ) : null}
                {robotSpeech ? (
                    <RobotSpeechBubble
                        detail={robotSpeech.detail}
                        message={robotSpeech.message}
                        title={robotSpeech.title}
                    />
                ) : shouldShowGreetText ? (
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

        </>
    );
});
