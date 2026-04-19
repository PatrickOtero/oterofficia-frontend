import { Outlet, useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../hooks/useBotSceneActions";
import { PlanetEarth } from "./components/Earth";
import { GreetBot } from "./components/greetbot";
import { Moon } from "./components/Moon";
import { StarsBackground } from "./components/StarsBackground";
import { DefaultContainer } from "./default.style";
import { SiteSign } from "./components/SiteSign";

export function DefaultLayout() {
    const {
        homePage,
        aboutMePage,
        portfolioPage,
        earthPosition,
    } = useBotFunctionsContext();
    const { centerBotOnHome, showHomeMenu } = useBotSceneActions();

    const navigate = useNavigate();

    return (
        <DefaultContainer>
            <div
                className="layout-clickable-container"
                onClick={() => {
                    if (aboutMePage || portfolioPage) {
                        showHomeMenu();
                        navigate("/");
                        return;
                    }

                    if (homePage) {
                        centerBotOnHome();
                        navigate("/");
                    }
                }}
            />

            <StarsBackground />
            <div className="planet-system">
                <Moon />
                <PlanetEarth earthPosition={earthPosition} />
            </div>

            <SiteSign />
            <GreetBot />

            <Outlet />
        </DefaultContainer>
    );
}
