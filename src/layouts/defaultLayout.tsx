import { Outlet, useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../hooks/useBotFunctionsContext";
import { PlanetEarth } from "./components/Earth";
import { GreetBot } from "./components/greetbot";
import { Moon } from "./components/Moon";
import { StarsBackground } from "./components/StarsBackground";
import { DefaultContainer } from "./default.style";

export function DefaultLayout() {

    const { earthPosition } = useBotFunctionsContext();

    const {setHoloPosition, setHomePage, setBotPosition, setEarthPosition, setHologramActivated, setIsShowingMenu, setInfoTextHolo, setVisorPosition, setEyeState, setAboutMePage } = useBotFunctionsContext();

    const navigate = useNavigate();


    return (
       <DefaultContainer>
            <div  className="layout-clicable-container" onClick={() => {
                    setBotPosition("")
                    setEarthPosition("")
                    setAboutMePage(false)
                    setHomePage(false)
                    setHologramActivated(false);
                    setIsShowingMenu(false);
                    setInfoTextHolo(false);
                    setVisorPosition("visor-to-top");
                    setEyeState("")
                    setHoloPosition("")
                    navigate("/")}}>
            </div>
                <GreetBot/>
                <StarsBackground/>
                <Moon/>
                <PlanetEarth earthPosition={earthPosition}/>
            <Outlet/>
       </DefaultContainer>
    )
}