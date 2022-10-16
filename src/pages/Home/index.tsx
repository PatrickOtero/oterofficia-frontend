import { HomeContainer} from "./home.style";
import { GreetBot } from "./components/greetbot";
import { PlanetEarth } from "./components/Earth";
import { useState } from "react"
import { InitialMenu } from "./components/InitialMenu";

export const Home = () => {
    const [ infoTextHolo, setInfoTextHolo ] = useState<boolean>(false)
    const [ visorPosition, setVisorPosition ] = useState<string>("visor-to-top")
    const [ botPosition, setBotPosition ] = useState<string>("")
    const [ hologramActivated, setHologramActivated ] = useState<boolean>(false)
    const [ isShowingMenu, setIsShowingMenu ] = useState<boolean>(false)
    const [ eyeState, setEyeState ] = useState<string>("")

    return (
        <HomeContainer>
            <PlanetEarth/>
            <GreetBot
                setInfoTextHolo={setInfoTextHolo}
                infoTextHolo={infoTextHolo}
                setHologramActivated={setHologramActivated}
                setVisorPosition={setVisorPosition}
                setBotPosition={setBotPosition}
                visorPosition={visorPosition} botPosition={botPosition}
                setEyeState={setEyeState}
                eyeState={eyeState}
                hologramActivated={hologramActivated}
                setIsShowingMenu={setIsShowingMenu}
                isShowingMenu={isShowingMenu}
                />
                {
                    hologramActivated &&
                    <InitialMenu
                     setInfoTextHolo={setInfoTextHolo}
                     setHologramActivated={setHologramActivated}
                     setIsShowingMenu={setIsShowingMenu}
                     setVisorPosition={setVisorPosition}
                     setEyeState={setEyeState}
                     eyeState={eyeState}
                     setBotPosition={setBotPosition}
                     />
                }
        </HomeContainer>
    );
}