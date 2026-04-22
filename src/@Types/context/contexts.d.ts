import { Dispatch, ReactNode, SetStateAction } from "react";

export type ICompProps = {
    children: ReactNode;
};

export interface IBotContext {
    sceneTransition: "idle" | "content-to-home" | "home-to-content" | "menu-to-content";
    setSceneTransition: Dispatch<SetStateAction<"idle" | "content-to-home" | "home-to-content" | "menu-to-content">>;
    spaceTheme: "earth" | "mars";
    setSpaceTheme: Dispatch<SetStateAction<"earth" | "mars">>;
    homePage: boolean;
    setHomePage: Dispatch<SetStateAction<boolean>>;
    authPage: boolean;
    setAuthPage: Dispatch<SetStateAction<boolean>>;
    aboutMePage: boolean;
    setAboutMePage: Dispatch<SetStateAction<boolean>>;
    portfolioPage: boolean;
    setPortfolioPage: Dispatch<SetStateAction<boolean>>;
    isShowingMenu: boolean;
    setIsShowingMenu: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    earthPosition: string;
    setEarthPosition: Dispatch<SetStateAction<string>>;
}
