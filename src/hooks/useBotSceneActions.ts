import { useBotFunctionsContext } from "./useBotFunctionsContext";

export const useBotSceneActions = () => {
    const {
        setAboutMePage,
        setAuthPage,
        setEarthPosition,
        setEyeState,
        setHologramActivated,
        setHomePage,
        setInfoTextHolo,
        setIsShowingMenu,
        setPortfolioPage,
        setSceneTransition,
        setVisorPosition,
    } = useBotFunctionsContext();

    const centerBotOnHome = () => {
        setSceneTransition("idle");
        setAuthPage(false);
        setAboutMePage(false);
        setPortfolioPage(false);
        setHomePage(false);
        setEarthPosition("");
        setHologramActivated(false);
        setIsShowingMenu(false);
        setInfoTextHolo(false);
        setVisorPosition("visor-to-top");
        setEyeState("");
    };

    const showHomeMenu = (origin: "default" | "content" = "default") => {
        setSceneTransition(origin === "content" ? "content-to-home" : "idle");
        setAuthPage(false);
        setAboutMePage(false);
        setPortfolioPage(false);
        setHomePage(true);
        setEarthPosition("");
        setHologramActivated(true);
        setIsShowingMenu(true);
        setInfoTextHolo(false);
        setVisorPosition("visor-to-left");
        setEyeState("emitting-holo");
    };

    const openAboutMeScene = () => {
        setSceneTransition("idle");
        setAuthPage(false);
        setPortfolioPage(false);
        setHomePage(false);
        setAboutMePage(true);
        setEarthPosition("earth-hidden");
        setHologramActivated(true);
        setIsShowingMenu(true);
        setInfoTextHolo(false);
        setVisorPosition("visor-to-left");
        setEyeState("emitting-holo");
    };

    const openPortfolioScene = () => {
        setSceneTransition("idle");
        setAuthPage(false);
        setAboutMePage(false);
        setHomePage(false);
        setPortfolioPage(true);
        setEarthPosition("");
        setHologramActivated(true);
        setIsShowingMenu(true);
        setInfoTextHolo(false);
        setVisorPosition("visor-to-diagonal-left");
        setEyeState("emitting-holo");
    };

    const openAuthScene = () => {
        setSceneTransition("idle");
        setAuthPage(true);
        setAboutMePage(false);
        setPortfolioPage(false);
        setHomePage(false);
        setEarthPosition("");
        setHologramActivated(true);
        setIsShowingMenu(false);
        setInfoTextHolo(false);
        setVisorPosition("visor-to-left");
        setEyeState("emitting-holo");
    };

    const openContentScene = (origin: "home" | "menu" | "content" = "home") => {
        setSceneTransition(
            origin === "home" ? "home-to-content" : origin === "menu" ? "menu-to-content" : "idle"
        );
        setAuthPage(false);
        setAboutMePage(false);
        setPortfolioPage(false);
        setHomePage(false);
        setHologramActivated(true);
        setIsShowingMenu(false);
        setInfoTextHolo(false);
        setVisorPosition("visor-to-left");
        setEyeState("emitting-holo");
    };

    return {
        centerBotOnHome,
        openContentScene,
        openAuthScene,
        openAboutMeScene,
        openPortfolioScene,
        showHomeMenu,
    };
};
