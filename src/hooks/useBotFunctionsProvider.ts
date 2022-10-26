import { useState } from "react"

export const useBotFunctionsContextProvider = () => {

    const [ visorPosition, setVisorPosition ] = useState<string>("visor-to-top")
    const [ botPosition, setBotPosition ] = useState<string>("")
    const [ earthPosition, setEarthPosition] = useState<string>("")
    const [ eyeState, setEyeState ] = useState<string>("")
    const [ holoPosition, setHoloPosition ] = useState<string>("")

    const [ hologramActivated, setHologramActivated ] = useState<boolean>(false)
    const [ infoTextHolo, setInfoTextHolo ] = useState<boolean>(false)
    const [ isShowingMenu, setIsShowingMenu ] = useState<boolean>(false)
    const [ homePage, setHomePage ] = useState<boolean>(false)
    const [ aboutMePage, setAboutMePage ] = useState<boolean>(false)
    const [ portfolioPage, setPortfolioPage ] = useState<boolean>(false)
    const [ isShowingVideo, setIsShowingVideo ] = useState<boolean>(false)

    return {
        visorPosition,
        setVisorPosition,
        botPosition,
        setBotPosition,
        earthPosition,
        setEarthPosition,
        eyeState,
        setEyeState,
        setHoloPosition,
        holoPosition,

        aboutMePage,
        setAboutMePage,
        homePage,
        setHomePage,
        setPortfolioPage,
        portfolioPage,
        isShowingMenu,
        setIsShowingMenu,
        hologramActivated,
        setHologramActivated,
        infoTextHolo,
        setInfoTextHolo
    }
}