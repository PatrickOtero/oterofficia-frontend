import { Outlet } from "react-router-dom";
import { useBotFunctionsContext } from "../hooks/useBotFunctionsContext";
import { HomePage } from "../pages/Home";
import { PlanetEarth } from "./components/Earth";
import { GreetBot } from "./components/greetbot";
import { GreetingLetters } from "./components/GreetingLetters";
import { Moon } from "./components/Moon";
import { StarsBackground } from "./components/StarsBackground";
import { DefaultContainer } from "./default.style";

export function DefaultLayout() {

    const { setInfoTextHolo, infoTextHolo, setHologramActivated, setVisorPosition, setBotPosition, visorPosition, botPosition, setEyeState, eyeState, hologramActivated, setIsShowingMenu, isShowingMenu, setHomePage, aboutMePage } = useBotFunctionsContext();

    return (
       <DefaultContainer>
            <GreetBot
                setHomePage={setHomePage}
                aboutMePage={aboutMePage}
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