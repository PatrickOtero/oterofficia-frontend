import { useState } from "react"

export const useBotFunctionsContextProvider = () => {
    const [ infoTextHolo, setInfoTextHolo ] = useState<boolean>(false)
    const [ visorPosition, setVisorPosition ] = useState<string>("visor-to-top")
    const [ botPosition, setBotPosition ] = useState<string>("")
    const [ hologramActivated, setHologramActivated ] = useState<boolean>(false)
    const [ isShowingMenu, setIsShowingMenu ] = useState<boolean>(false)
    const [ eyeState, setEyeState ] = useState<string>("")

    return {
        infoTextHolo,
        setInfoTextHolo,
        visorPosition,
        setVisorPosition,
        botPosition,
        setBotPosition,
        hologramActivated,
        setHologramActivated,
        isShowingMenu,
        setIsShowingMenu,
        eyeState,
        setEyeState
    }
}