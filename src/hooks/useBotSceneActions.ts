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
        setVisorPosition,
    } = useBotFunctionsContext();

    const centerBotOnHome = () => {
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

    const showHomeMenu = () => {
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

    return {
        centerBotOnHome,
        openAboutMeScene,
        openPortfolioScene,
        showHomeMenu,
    };
};
