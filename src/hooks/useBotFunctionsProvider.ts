import { useState } from "react";

export const useBotFunctionsContextProvider = () => {
    const [sceneTransition, setSceneTransition] = useState<
        "idle" | "content-to-home" | "home-to-content" | "menu-to-content"
    >("idle");
    const [earthPosition, setEarthPosition] = useState<string>("");
    const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);
    const [homePage, setHomePage] = useState<boolean>(false);
    const [authPage, setAuthPage] = useState<boolean>(false);
    const [aboutMePage, setAboutMePage] = useState<boolean>(false);
    const [portfolioPage, setPortfolioPage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return {
        sceneTransition,
        setSceneTransition,
        earthPosition,
        setEarthPosition,
        authPage,
        setAuthPage,
        aboutMePage,
        setAboutMePage,
        homePage,
        setHomePage,
        portfolioPage,
        setPortfolioPage,
        isShowingMenu,
        setIsShowingMenu,
        isLoading,
        setIsLoading,
    };
};
