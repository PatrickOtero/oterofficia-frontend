import { InitialMenuContainer } from "./InitialMenu.style";
import { Dispatch, SetStateAction} from "react"

interface IInitialMenu {
    setInfoTextHolo: Dispatch<SetStateAction<boolean>>
    setHologramActivated: Dispatch<SetStateAction<boolean>>
    setIsShowingMenu: Dispatch<SetStateAction<boolean>>
    setVisorPosition: Dispatch<SetStateAction<string>>
    setBotPosition: Dispatch<SetStateAction<string>>
    setEyeState: Dispatch<SetStateAction<string>>

    eyeState: string;
}

export const InitialMenu = ({setEyeState, eyeState, setInfoTextHolo, setIsShowingMenu, setHologramActivated, setVisorPosition, setBotPosition}: IInitialMenu) => {

    return (
        <InitialMenuContainer>
            <div className="initial-menu-main">
                <b className="site-title-on-initial-menu">OTEROFFICIA</b>
                <button className="initial-menu-button about-me">SOBRE MIM</button>
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