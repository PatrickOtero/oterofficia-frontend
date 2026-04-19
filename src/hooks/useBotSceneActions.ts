import { useBotFunctionsContext } from "./useBotFunctionsContext";

export const useBotSceneActions = () => {
    const {
        setAboutMePage,
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

    const openContentScene = () => {
        setSceneTransition("home-to-content");
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
        openAboutMeScene,
        openPortfolioScene,
        showHomeMenu,
    };
};
