import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { InitialMenu } from "./components/InitialMenu"
import { HomeContainer } from "./Home.style"

export const HomePage = () => {

    const { homePage, setHomePage, setInfoTextHolo, setHologramActivated, setIsShowingMenu, setVisorPosition, setEyeState, eyeState, setBotPosition, setAboutMePage} = useBotFunctionsContext();

    return (
        <HomeContainer>
            { homePage &&
            <InitialMenu
                setInfoTextHolo={setInfoTextHolo}
                setHologramActivated={setHologramActivated}
                setIsShowingMenu={setIsShowingMenu}
                setVisorPosition={setVisorPosition}
                setEyeState={setEyeState}
                eyeState={eyeState}
                setBotPosition={setBotPosition}
                setHomePage={setHomePage}
                setAboutMePage={setAboutMePage}
                />
            }
        </HomeContainer>
    );
}