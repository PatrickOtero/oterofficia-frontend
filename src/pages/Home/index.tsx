import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { InitialMenu } from "./components/InitialMenu"
import { HomeContainer } from "./Home.style"

export const HomePage = () => {

    const { setInfoTextHolo, setHologramActivated, hologramActivated, setIsShowingMenu, setVisorPosition, setEyeState, eyeState, setBotPosition} = useBotFunctionsContext();

    return (
        <HomeContainer>
            { hologramActivated &&
            <InitialMenu
                setInfoTextHolo={setInfoTextHolo}
                setHologramActivated={setHologramActivated}
                setIsShowingMenu={setIsShowingMenu}
                setVisorPosition={setVisorPosition}
                setEyeState={setEyeState}
                eyeState={eyeState}
                setBotPosition={setBotPosition}
                />
            }
        </HomeContainer>
    );
}