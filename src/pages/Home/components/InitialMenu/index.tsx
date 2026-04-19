import { InitialMenuContainer } from "./InitialMenu.style";
import { useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../../hooks/useBotSceneActions";

export const InitialMenu = () => {
    const {
        setEarthPosition,
    } = useBotFunctionsContext();
    const { centerBotOnHome, openAboutMeScene, openPortfolioScene } = useBotSceneActions();

    const navigate = useNavigate();

    return (
        <InitialMenuContainer>
            <div className="initial-menu-main">
                <button
                    onClick={() => {
                        openAboutMeScene();
                        navigate("/aboutme");
                    }}
                    className="initial-menu-button about-me"
                >
                    SOBRE MIM
                </button>

                <button
                    onClick={() => {
                        openPortfolioScene();
                        navigate("/portfolio");
                    }}
                    className="initial-menu-button portfolio"
                >
                    PORTFOLIO
                </button>

                <button
                    onClick={() => {
                        centerBotOnHome();
                        setEarthPosition("");
                        navigate("/studies");
                    }}
                    className="initial-menu-button studies"
                >
                    ESTUDOS
                </button>

                <button
                    onClick={() => {
                        centerBotOnHome();
                    }}
                    className="initial-menu-button exit"
                >
                    SAIR
                </button>
            </div>
        </InitialMenuContainer>
    );
};
