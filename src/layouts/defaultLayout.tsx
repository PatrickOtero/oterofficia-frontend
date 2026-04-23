import { Outlet, useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../hooks/useBotSceneActions";
import { GreetBot } from "./components/greetbot";
import { SceneBackdrop } from "./components/SceneBackdrop";
import { DefaultContainer } from "./default.style";
import { SiteSign } from "./components/SiteSign";

export function DefaultLayout() {
    const {
        authPage,
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

            <SceneBackdrop planetPosition={earthPosition} />

            <SiteSign />
            <GreetBot />

            <Outlet />
        </DefaultContainer>
    );
}
