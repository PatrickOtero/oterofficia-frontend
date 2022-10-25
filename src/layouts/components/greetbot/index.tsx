import { GreetBotContainer } from "./GreetBot.style";
import { GreetBotTurbine } from "./turbines";
import { HologramBeam } from "./hologramBeam";
import { GreetText } from "../GreetText";
import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";

export const GreetBot = () => {

    const { setInfoTextHolo, infoTextHolo, setHologramActivated, setBotPosition, setVisorPosition, setEyeState, eyeState, hologramActivated, setIsShowingMenu, isShowingMenu, visorPosition, botPosition, aboutMePage, setHomePage, holoPosition } = useBotFunctionsContext()

    return (
        <GreetBotContainer>
            <div
             className={`greetbot-body ${botPosition}`}
             onMouseEnter={() =>
                 {
                    setEyeState("emitting-holo")
                    setInfoTextHolo(true);
                }}
              onClick={() =>
                {
                    setInfoTextHolo(false);
                    setVisorPosition("visor-to-left");
                    setBotPosition( !aboutMePage ? "bot-showing-menu" : botPosition);
                    setEyeState("emitting-holo")
                    setHomePage(true);
                    setHologramActivated(true);
                    setIsShowingMenu(true);
                }}>
                    <div className="greetbot01-inner-form">
                        
                </div>
                    <div className={`greetBot01-visor ${visorPosition}`}>
                        <div className="gb-visor-horizontal">
                            <div className={`gb-eyes eyeLeft ${eyeState}`}></div>
                            <div className={`gb-eyes eyeRight ${eyeState}`}></div>
                        </div>
                        <div className="gb-visor-vertical">
                        <div className="gb-mouth"></div>
                        </div>
                    </div>
                <div className="turbines-container">
                    <GreetBotTurbine animDelay="1s"/>
                    <GreetBotTurbine animDelay="2s"/>
                    <GreetBotTurbine animDelay="3s"/>
                </div>
                { hologramActivated &&
                    <>
                        <HologramBeam eyeBeamPosition={holoPosition}/>
                        <HologramBeam eyeBeamPosition={holoPosition}/>
                    </>
                }
                { !isShowingMenu && infoTextHolo &&
                    <>
                        <GreetText/>
                    </>
                }
            </div>
        </GreetBotContainer>
    );
}