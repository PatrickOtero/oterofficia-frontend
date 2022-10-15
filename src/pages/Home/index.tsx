import { HomeContainer} from "./home.style";
import { StarsBackground } from "./components/starsBackground";
import { GreetBot } from "./components/greetbot";
import { PlanetEarth } from "./components/earth";
import { useState } from "react"
import { InitialMenu } from "./components/InitialMenu";

export const Home = () => {
    const [ visorPosition, setVisorPosition ] = useState<string>("")
    const [ botPosition, setBotPosition ] = useState<string>("")
    const [ hologramActivated, setHologramActivated ] = useState<boolean>(false)

    return (
        <HomeContainer>
            <PlanetEarth/>
           <StarsBackground/>
            <GreetBot
                setHologramActivated={setHologramActivated}
                setVisorPosition={setVisorPosition}
                setBotPosition={setBotPosition}
                visorPosition={visorPosition} botPosition={botPosition}
                hologramActivated={hologramActivated}/>
                {
                    hologramActivated &&
                    <InitialMenu
                     setHologramActivated={setHologramActivated}
                     setVisorPosition={setVisorPosition}
                     setBotPosition={setBotPosition}
                     />
                }
        </HomeContainer>
    );
}