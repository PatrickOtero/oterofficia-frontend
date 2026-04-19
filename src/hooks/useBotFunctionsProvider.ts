import { useState } from "react";

export const useBotFunctionsContextProvider = () => {
    const [sceneTransition, setSceneTransition] = useState<"idle" | "content-to-home" | "home-to-content">("idle");
    const [visorPosition, setVisorPosition] = useState<string>("visor-to-top");
    const [earthPosition, setEarthPosition] = useState<string>("");
    const [eyeState, setEyeState] = useState<string>("");

    const [hologramActivated, setHologramActivated] = useState<boolean>(false);
    const [infoTextHolo, setInfoTextHolo] = useState<boolean>(false);
    const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);
    const [homePage, setHomePage] = useState<boolean>(false);
    const [aboutMePage, setAboutMePage] = useState<boolean>(false);
    const [portfolioPage, setPortfolioPage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return {
        sceneTransition,
        setSceneTransition,
        visorPosition,
        setVisorPosition,
        earthPosition,
        setEarthPosition,
        eyeState,
        setEyeState,
        aboutMePage,
        setAboutMePage,
        homePage,
        setHomePage,
        portfolioPage,
        setPortfolioPage,
        isShowingMenu,
        setIsShowingMenu,
        hologramActivated,
        setHologramActivated,
        infoTextHolo,
        setInfoTextHolo,
        isLoading,
        setIsLoading,
    };
};
