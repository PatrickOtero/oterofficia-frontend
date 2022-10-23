import { useState } from "react"

export const useBotFunctionsContextProvider = () => {
    const [ infoTextHolo, setInfoTextHolo ] = useState<boolean>(false)
    const [ visorPosition, setVisorPosition ] = useState<string>("visor-to-top")
    const [ botPosition, setBotPosition ] = useState<string>("")
    const [ earthPosition, setEarthPosition] = useState<string>("")
    const [ hologramActivated, setHologramActivated ] = useState<boolean>(false)
    const [ isShowingMenu, setIsShowingMenu ] = useState<boolean>(false)
    const [ eyeState, setEyeState ] = useState<string>("")

    const [ aboutMePage, setAboutMePage ] = useState<boolean>(false)

    const [ homePage, setHomePage ] = useState<boolean>(false)

    return {
        infoTextHolo,
        setInfoTextHolo,
        visorPosition,
        setVisorPosition,
        botPosition,
        setBotPosition,
        earthPosition,
        setEarthPosition,
        hologramActivated,
        setHologramActivated,
        isShowingMenu,
        setIsShowingMenu,
        eyeState,
        setEyeState,

        aboutMePage,
        setAboutMePage,

        homePage,
        setHomePage,
    }
}