import { useBotFunctionsContext } from "../../hooks/useBotFunctionsContext";
import { InitialMenu } from "./components/InitialMenu"
import { HomeContainer } from "./Home.style"

export const HomePage = () => {

    const { homePage } = useBotFunctionsContext();

    return (
        <HomeContainer>
            { homePage &&
                <InitialMenu/>
            }
        </HomeContainer>
    );
}