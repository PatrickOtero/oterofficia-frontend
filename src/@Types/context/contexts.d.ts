import { Dispatch, ReactNode, SetStateAction } from "react";
import type { SpaceTheme } from "../../layouts/components/greetbot/spaceThemes";

export type ICompProps = {
    children: ReactNode;
};

export interface IBotContext {
    sceneTransition: "idle" | "content-to-home" | "home-to-content" | "menu-to-content";
    setSceneTransition: Dispatch<SetStateAction<"idle" | "content-to-home" | "home-to-content" | "menu-to-content">>;
    spaceTheme: SpaceTheme;
    setSpaceTheme: Dispatch<SetStateAction<SpaceTheme>>;
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
