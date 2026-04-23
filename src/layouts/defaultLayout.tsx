import { Outlet, useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../hooks/useBotSceneActions";
import { GreetBot } from "./components/greetbot";
import { PlanetSystem } from "./components/PlanetSystem";
import { StarsBackground } from "./components/StarsBackground";
import { SceneParallaxLayer } from "./components/sceneCamera/SceneParallaxLayer";
import { DefaultContainer } from "./default.style";
import { SiteSign } from "./components/SiteSign";

export function DefaultLayout() {
    const {
        authPage,
        homePage,
        aboutMePage,
        portfolioPage,
        earthPosition,
        spaceTheme,
    } = useBotFunctionsContext();
    const { centerBotOnHome, showHomeMenu } = useBotSceneActions();

    const navigate = useNavigate();

    return (
        <DefaultContainer>
            <div
                className="layout-clickable-container"
                onClick={() => {
                    if (authPage) {
                        centerBotOnHome();
                        navigate("/");
                        return;
                    }

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

            <div className="scene-stage">
                <SceneParallaxLayer depth={0.06} zoomFactor={0.02}>
                    <StarsBackground theme={spaceTheme} />
                </SceneParallaxLayer>
                <div className="planet-system">
                    <PlanetSystem planetPosition={earthPosition} />
                </div>
            </div>

            <SiteSign />
            <GreetBot />

            <Outlet />
        </DefaultContainer>
    );
}
