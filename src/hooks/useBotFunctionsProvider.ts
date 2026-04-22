import { useEffect, useState } from "react";

const getInitialSpaceTheme = (): "earth" | "mars" => {
    if (typeof window === "undefined") {
        return "earth";
    }

    const storedTheme = window.localStorage.getItem("oterofficia-space-theme");

    return storedTheme === "mars" ? "mars" : "earth";
};

export const useBotFunctionsContextProvider = () => {
    const [sceneTransition, setSceneTransition] = useState<
        "idle" | "content-to-home" | "home-to-content" | "menu-to-content"
    >("idle");
    const [spaceTheme, setSpaceTheme] = useState<"earth" | "mars">(getInitialSpaceTheme);
    const [earthPosition, setEarthPosition] = useState<string>("");
    const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);
    const [homePage, setHomePage] = useState<boolean>(false);
    const [authPage, setAuthPage] = useState<boolean>(false);
    const [aboutMePage, setAboutMePage] = useState<boolean>(false);
    const [portfolioPage, setPortfolioPage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        window.localStorage.setItem("oterofficia-space-theme", spaceTheme);
    }, [spaceTheme]);

    return {
        sceneTransition,
        setSceneTransition,
        spaceTheme,
        setSpaceTheme,
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
