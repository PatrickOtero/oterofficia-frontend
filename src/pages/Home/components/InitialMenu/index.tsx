import { useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../../../hooks/useBotFunctionsContext";
import { useBotSceneActions } from "../../../../hooks/useBotSceneActions";
import { InitialMenuContainer } from "./InitialMenu.style";

export const InitialMenu = () => {
  const { setEarthPosition } = useBotFunctionsContext();
  const { centerBotOnHome, openAboutMeScene, openContentScene, openPortfolioScene } = useBotSceneActions();
  const navigate = useNavigate();

  return (
    <InitialMenuContainer>
      <div className="initial-menu-main">
        <button
          className="initial-menu-button about-me"
          onClick={() => {
            openAboutMeScene();
            navigate("/aboutme");
          }}
        >
          SOBRE MIM
        </button>

        <button
          className="initial-menu-button portfolio"
          onClick={() => {
            openPortfolioScene();
            navigate("/portfolio");
          }}
        >
          PORTFOLIO
        </button>

        <button
          className="initial-menu-button studies"
          onClick={() => {
            openContentScene("menu");
            setEarthPosition("");
            navigate("/studies");
          }}
        >
          ESTUDOS
        </button>

        <button
          className="initial-menu-button exit"
          onClick={() => {
            centerBotOnHome();
          }}
        >
          SAIR
        </button>
      </div>
    </InitialMenuContainer>
  );
};
