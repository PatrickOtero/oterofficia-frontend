import { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GreetBotContainer } from "./GreetBot.style";
import { GreetText } from "../GreetText";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { FrontPose } from "./poses/FrontPose";

type BeamTarget = "auth-panel" | "content-menu" | null;

type GreetBotProps = {
    interactive?: boolean;
    beamTarget?: BeamTarget;
};

export const GreetBot = memo(({ interactive = true, beamTarget = null }: GreetBotProps) => {
    const location = useLocation();
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
        authPage,
        setInfoTextHolo,
        infoTextHolo,
        setEyeState,
        eyeState,
        hologramActivated,
        isShowingMenu,
        homePage,
        aboutMePage,
        portfolioPage,
        sceneTransition,
        setSceneTransition,
        visorPosition,
    } = useBotFunctionsContext();
    const { showHomeMenu } = useBotSceneActions();

    const isInteractiveAtHome = interactive && isHomeRoute;
    const isAboutScene = interactive && isAboutRoute && aboutMePage;
    const isPortfolioScene = interactive && isPortfolioRoute && portfolioPage;
    const isAuthScene = interactive && isAuthRoute && authPage;
    const isHomeMenuScene = interactive && isHomeRoute && homePage && isShowingMenu;
    const shouldDockInDefaultScene = isAboutScene || isPortfolioScene || isAuthScene || isHomeMenuScene;
    const resolvedHologramState = interactive
        ? hologramActivated || shouldDockInDefaultScene
        : Boolean(beamTarget);
    const resolvedEyeState = interactive
        ? resolvedHologramState
            ? eyeState || "emitting-holo"
            : eyeState
        : beamTarget
          ? "emitting-holo"
          : "";
    const resolvedVisorPosition = interactive
        ? visorPosition
        : beamTarget
          ? "visor-to-left"
          : "visor-to-top";
    const shouldShowGreetText = isInteractiveAtHome && !isShowingMenu && infoTextHolo;
    const isReturningFromContent = isHomeMenuScene && sceneTransition === "content-to-home";

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

    const positionClass = interactive
        ? isReturningFromContent
            ? "position-home-returning"
            : shouldDockInDefaultScene
            ? "position-home-docked"
            : "position-home-center"
        : sceneTransition === "home-to-content"
          ? "position-content-entering"
          : "position-content-docked";

    const beamTargetClass = resolvedHologramState
        ? !interactive
            ? beamTarget === "auth-panel"
                ? "beam-target-auth"
                : beamTarget === "content-menu"
                  ? "beam-target-content"
                  : ""
            : isAuthScene
              ? "beam-target-auth"
              : isAboutScene
              ? "beam-target-about"
              : isPortfolioScene
                ? "beam-target-portfolio"
                : isHomeMenuScene
                  ? "beam-target-home"
                  : ""
        : "";

    return (
        <GreetBotContainer>
            <div className={`bot-roamer ${positionClass}`}>
                <div
                    className={`greetbot-body ${interactive ? "is-interactive" : "is-ambient"} ${beamTargetClass} pose-front`}
                    onClick={() => {
                        if (!isInteractiveAtHome) {
                            return;
                        }

                        setInfoTextHolo(false);
                        showHomeMenu();
                    }}
                    onMouseEnter={() => {
                        if (!isInteractiveAtHome || isShowingMenu) {
                            return;
                        }

                        setEyeState("emitting-holo");
                        setInfoTextHolo(true);
                    }}
                    onMouseLeave={() => {
                        if (!isInteractiveAtHome || isShowingMenu) {
                            return;
                        }

                        setInfoTextHolo(false);
                        setEyeState("");
                    }}
                >
                    <div className="bot-frame">
                        <FrontPose
                            eyeState={resolvedEyeState}
                            hologramActivated={resolvedHologramState}
                            visorPosition={resolvedVisorPosition}
                        />
                    </div>
                    {shouldShowGreetText ? <GreetText /> : null}
                </div>
            </div>
        </GreetBotContainer>
    );
});
