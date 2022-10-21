import { Dispatch, ReactNode, SetStateAction } from "react"
import { IGithubProfile } from "../hooks/botContext";

export type ICompProps = {
    children: ReactNode;
  };  

export interface IBotContext {
    handleGetGithubProfile: () => Promise<void>;
    githubProfile: IGithubProfile;
    setGithubProfile: Dispatch<SetStateAction<IGithubProfile>>;
    
    infoTextHolo: boolean;
    setInfoTextHolo: Dispatch<SetStateAction<boolean>>;

    visorPosition: string;
    setVisorPosition: Dispatch<SetStateAction<string>>;

    botPosition: string;
    setBotPosition: Dispatch<SetStateAction<string>>;
    
    earthPosition: string;
    setEarthPosition: Dispatch<SetStateAction<string>>;

    hologramActivated: boolean;
    setHologramActivated: Dispatch<SetStateAction<boolean>>;

    isShowingMenu: boolean;
    setIsShowingMenu: Dispatch<SetStateAction<boolean>>;

    eyeState: string;
    setEyeState: Dispatch<SetStateAction<string>>;

    homePage: boolean;
    setHomePage: Dispatch<SetStateAction<boolean>>;

    aboutMePage: boolean;
    setAboutMePage: Dispatch<SetStateAction<boolean>>;
}

export interface IGithubProfile {
    name: string;
    avatar_url: string;
    url: string;
    bio: string;
}