import { Dispatch, SetStateAction} from "react"

interface IInitialMenu {
    setInfoTextHolo: Dispatch<SetStateAction<boolean>>
    setHologramActivated: Dispatch<SetStateAction<boolean>>
    setIsShowingMenu: Dispatch<SetStateAction<boolean>>
    setVisorPosition: Dispatch<SetStateAction<string>>
    setBotPosition: Dispatch<SetStateAction<string>>
    setEyeState: Dispatch<SetStateAction<string>>
    setAboutMePage: Dispatch<SetStateAction<boolean>>;
    setHomePage: Dispatch<SetStateAction<boolean>>;

    eyeState: string;
}