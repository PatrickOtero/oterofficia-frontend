import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GreetText } from "../GreetText";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { RoundRobotScene } from "./RoundRobotScene";
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
    const [isHintVisible, setIsHintVisible] = useState(false);
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
        setSceneTransition,
    } = useBotFunctionsContext();
    const { showHomeMenu } = useBotSceneActions();

    const isInteractiveAtHome = interactive && isHomeRoute;
    const isAboutScene = interactive && isAboutRoute;
    const isPortfolioScene = interactive && isPortfolioRoute;
    const isAuthScene = interactive && isAuthRoute;
    const isHomeMenuScene = interactive && isHomeRoute && isShowingMenu;
    const shouldDockInDefaultScene = isAboutScene || isPortfolioScene || isAuthScene || isHomeMenuScene;
    const isReturningFromContent = isHomeMenuScene && sceneTransition === "content-to-home";
    const shouldShowGreetText = isInteractiveAtHome && !isShowingMenu && isHintVisible;

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

    return (
        <RoundRobotScene
            attentionTarget={attentionTarget}
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
                if (!isInteractiveAtHome || isShowingMenu) {
                    setIsHintVisible(false);
                    return;
                }

                setIsHintVisible(hovered);
            }}
            slot={slot}
        >
            {shouldShowGreetText ? <GreetText /> : null}
        </RoundRobotScene>
    );
});
