import {Dispatch, SetStateAction} from "react"

interface IGreetBot {
    setVisorPosition: Dispatch<SetStateAction<string>>
    setBotPosition: Dispatch<SetStateAction<string>>
    setHologramActivated: Dispatch<SetStateAction<boolean>>
    setIsShowingMenu: Dispatch<SetStateAction<boolean>>
    setInfoTextHolo: Dispatch<SetStateAction<boolean>>
    setEyeState: Dispatch<SetStateAction<string>>
    setHomePage: Dispatch<SetStateAction<boolean>>;

    eyeState: string;
    visorPosition: string;
    botPosition: string;
    infoTextHolo: boolean;
    hologramActivated: boolean;
    isShowingMenu: boolean;
    aboutMePage: boolean
}