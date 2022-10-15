import { InitialMenuContainer } from "./InitialMenu.style";
import { Dispatch, SetStateAction} from "react"

interface IInitialMenu {
    setHologramActivated: Dispatch<SetStateAction<boolean>>
    setVisorPosition: Dispatch<SetStateAction<string>>
    setBotPosition: Dispatch<SetStateAction<string>>
}

export const InitialMenu = ({setHologramActivated, setVisorPosition, setBotPosition}: IInitialMenu) => {

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
                        setVisorPosition("");
                        setBotPosition("");
                     }} className="initial-menu-button studies">FECHAR</button>
            </div>
        </InitialMenuContainer>
    );
}