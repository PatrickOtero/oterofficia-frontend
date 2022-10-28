import { Dispatch, ReactNode, SetStateAction } from "react"
import { IGithubProfile } from "../hooks/botContext";

export type ICompProps = {
    children: ReactNode;
  };  

export interface IBotContext {
    homePage: boolean;
    setHomePage: Dispatch<SetStateAction<boolean>>;
    aboutMePage: boolean;
    setAboutMePage:   Dispatch<SetStateAction<boolean>>;
    portfolioPage: boolean;
    setPortfolioPage:   Dispatch<SetStateAction<boolean>>;  
    infoTextHolo: boolean;
    setInfoTextHolo: Dispatch<SetStateAction<boolean>>;
    hologramActivated: boolean;
    setHologramActivated: Dispatch<SetStateAction<boolean>>;
    isShowingMenu: boolean;
    setIsShowingMenu: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;

    visorPosition: string;
    setVisorPosition: Dispatch<SetStateAction<string>>;
    botPosition: string;
    setBotPosition: Dispatch<SetStateAction<string>>;
    earthPosition: string;
    setEarthPosition: Dispatch<SetStateAction<string>>;
    eyeState: string;
    setEyeState: Dispatch<SetStateAction<string>>;
    holoPosition: string;
    setHoloPosition: Dispatch<SetStateAction<string>>;
}