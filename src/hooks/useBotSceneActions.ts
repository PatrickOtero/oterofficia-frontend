import { useBotFunctionsContext } from "./useBotFunctionsContext";

export const useBotSceneActions = () => {
    const {
        setAboutMePage,
        setAuthPage,
        setEarthPosition,
        setHomePage,
        setIsShowingMenu,
        setPortfolioPage,
        setSceneTransition,
    } = useBotFunctionsContext();

    const centerBotOnHome = () => {
        setSceneTransition("idle");
        setAuthPage(false);
        setAboutMePage(false);
        setPortfolioPage(false);
        setHomePage(false);
        setEarthPosition("");
        setIsShowingMenu(false);
    };

    const showHomeMenu = (origin: "default" | "content" = "default") => {
        setSceneTransition(origin === "content" ? "content-to-home" : "idle");
        setAuthPage(false);
        setAboutMePage(false);
        setPortfolioPage(false);
        setHomePage(true);
        setEarthPosition("");
        setIsShowingMenu(true);
    };

    const openAboutMeScene = () => {
        setSceneTransition("idle");
        setAuthPage(false);
        setPortfolioPage(false);
        setHomePage(false);
        setAboutMePage(true);
        setEarthPosition("earth-hidden");
        setIsShowingMenu(true);
    };

    const openPortfolioScene = () => {
        setSceneTransition("idle");
        setAuthPage(false);
        setAboutMePage(false);
        setHomePage(false);
        setPortfolioPage(true);
        setEarthPosition("");
        setIsShowingMenu(true);
    };

    const openAuthScene = () => {
        setSceneTransition("idle");
        setAuthPage(true);
        setAboutMePage(false);
        setPortfolioPage(false);
        setHomePage(false);
        setEarthPosition("");
        setIsShowingMenu(false);
    };

    const openContentScene = (origin: "home" | "menu" | "content" = "home") => {
        setSceneTransition(
            origin === "home" ? "home-to-content" : origin === "menu" ? "menu-to-content" : "idle"
        );
        setAuthPage(false);
        setAboutMePage(false);
        setPortfolioPage(false);
        setHomePage(false);
        setIsShowingMenu(false);
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
