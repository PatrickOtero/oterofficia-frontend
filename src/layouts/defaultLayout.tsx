import { Outlet } from "react-router-dom";
import { useBotFunctionsContext } from "../hooks/useBotFunctionsContext";
import { PlanetEarth } from "./components/Earth";
import { GreetBot } from "./components/greetbot";
import { GreetingLetters } from "./components/GreetingLetters";
import { Moon } from "./components/Moon";
import { StarsBackground } from "./components/StarsBackground";
import { DefaultContainer } from "./default.style";

export function DefaultLayout() {

    const { setInfoTextHolo, infoTextHolo, setHologramActivated, setVisorPosition, setBotPosition, visorPosition, botPosition, setEyeState, eyeState, hologramActivated, setIsShowingMenu, isShowingMenu } = useBotFunctionsContext();

    return (
       <DefaultContainer>
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
            <StarsBackground/>
            <GreetingLetters/>
            <Moon/>
            <PlanetEarth/>
            <Outlet/>
       </DefaultContainer>
    )
}