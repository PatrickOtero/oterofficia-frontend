import { InitialMenuContainer } from "./InitialMenu.style";
import { useNavigate } from "react-router-dom";
import { IInitialMenu } from "../../../../@Types/components/home/initialMenu";


export const InitialMenu = ({setEyeState, eyeState, setInfoTextHolo, setIsShowingMenu, setHologramActivated, setVisorPosition, setBotPosition}: IInitialMenu) => {

    const navigate = useNavigate();

    return (
        <InitialMenuContainer>
            <div className="initial-menu-main">
                <b className="site-title-on-initial-menu">OTEROFFICIA</b>
                <button onClick={() =>
                    {
                        setHologramActivated(false)
                        navigate("/aboutme")
                    }} className="initial-menu-button about-me">SOBRE MIM</button>
                <button className="initial-menu-button portfolio">PORTFOLIO</button>
                <button className="initial-menu-button studies">ESTUDOS</button>
                <button onClick={() =>
                     {
                        setHologramActivated(false);
                        setIsShowingMenu(false);
                        setInfoTextHolo(false);
                        setVisorPosition("visor-to-top");
                        setBotPosition("");
                        setEyeState("");
                     }} className="initial-menu-button studies">FECHAR</button>
            </div>
        </InitialMenuContainer>
    );
}