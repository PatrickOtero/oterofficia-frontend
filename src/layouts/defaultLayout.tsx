import { Outlet, useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../hooks/useBotFunctionsContext";
import { PlanetEarth } from "./components/Earth";
import { GreetBot } from "./components/greetbot";
import { Moon } from "./components/Moon";
import { StarsBackground } from "./components/StarsBackground";
import { DefaultContainer } from "./default.style";

export function DefaultLayout() {

    const { earthPosition } = useBotFunctionsContext();

    const {homePage, aboutMePage, portfolioPage , setPortfolioPage, setHoloPosition, setHomePage, setBotPosition, setEarthPosition, setHologramActivated, setIsShowingMenu, setInfoTextHolo, setVisorPosition, setEyeState, setAboutMePage } = useBotFunctionsContext();

    const navigate = useNavigate();


    return (
       <DefaultContainer>
            <div  className="layout-clickable-container" onClick={() => {
                    if (homePage) {
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
                        navigate("/")
                    }
                    if (aboutMePage) {
                        setAboutMePage(false);
                        setHomePage(true)
                        setBotPosition("bot-showing-menu");
                        setEarthPosition("")
                        navigate("/")
                    }
                    if (portfolioPage) {
                        setPortfolioPage(false);
                        setHomePage(true)
                        setBotPosition("bot-showing-menu");
                        setVisorPosition("visor-to-left")
                        setEarthPosition("")
                        setHoloPosition("")
                        navigate("/")
                    }
                    }}>
            </div>
                <GreetBot/>
                <StarsBackground/>
                <Moon/>
                <PlanetEarth earthPosition={earthPosition}/>
            <Outlet/>
       </DefaultContainer>
    )
}