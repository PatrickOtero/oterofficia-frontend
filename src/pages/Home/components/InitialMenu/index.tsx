import { InitialMenuContainer } from "./InitialMenu.style";
import { useNavigate } from "react-router-dom";
import { useBotFunctionsContext } from "../../../../hooks/useBotFunctionsContext";

export const InitialMenu = () => {
    const { setHomePage, setInfoTextHolo, setHologramActivated, setIsShowingMenu, setVisorPosition, setEyeState, eyeState, setBotPosition, setAboutMePage, setEarthPosition, setPortfolioPage, setHoloPosition } = useBotFunctionsContext()

    const navigate = useNavigate();

    return (
        <InitialMenuContainer>
            <div className="initial-menu-main">
                <b className="site-title-on-initial-menu">OTEROFFICIA</b>
                <button onClick={() =>
                    {
                        setHomePage(false)
                        setBotPosition("bot-showing-aboutme")
                        setEarthPosition("earth-hidden")
                        setAboutMePage(true)
                        navigate("/aboutme")
                    }} className="initial-menu-button about-me">SOBRE MIM</button>
                <button onClick={() =>
                    {
                        setHomePage(false)
                        setBotPosition("bot-showing-portfolio")
                        setVisorPosition("visor-to-diagonal-left")
                        setHoloPosition("eye-beam-position-for-portfolio")
                        setPortfolioPage(true)
                        navigate("/portfolio")
                    }}  className="initial-menu-button portfolio">PORTFOLIO</button>
                <button className="initial-menu-button studies">ESTUDOS</button>
                <button onClick={() =>
                     {
                        setHomePage(false)
                        setHologramActivated(false);
                        setIsShowingMenu(false);
                        setInfoTextHolo(false);
                        setVisorPosition("visor-to-top");
                        setBotPosition("");
                        setEyeState("")
                     }} className="initial-menu-button studies">SAIR</button>
            </div>
        </InitialMenuContainer>
    );
}