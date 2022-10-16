import { GreetBotContainer } from "./GreetBot.style";
import { GreetBotTurbine } from "./turbines";
import {Dispatch, SetStateAction} from "react"
import { HologramBeam } from "./hologramBeam";
import { GreetText } from "../GreetText";

interface IGreetBot {
    setVisorPosition: Dispatch<SetStateAction<string>>
    setBotPosition: Dispatch<SetStateAction<string>>
    setHologramActivated: Dispatch<SetStateAction<boolean>>
    setIsShowingMenu: Dispatch<SetStateAction<boolean>>
    setInfoTextHolo: Dispatch<SetStateAction<boolean>>
    setEyeState: Dispatch<SetStateAction<string>>

    eyeState: string;
    visorPosition: string;
    botPosition: string;
    infoTextHolo: boolean;
    hologramActivated: boolean;
    isShowingMenu: boolean;
}

export const GreetBot = ({setInfoTextHolo, infoTextHolo, setHologramActivated, setBotPosition, setVisorPosition, setEyeState, eyeState, hologramActivated, setIsShowingMenu, isShowingMenu, visorPosition, botPosition}: IGreetBot) => {

    return (
        <GreetBotContainer>
            <div
             onMouseEnter={() =>
                 {
                    setEyeState("emitting-holo")
                    setInfoTextHolo(true);
                }}
              onClick={() =>
                {
                    setInfoTextHolo(false);
                    setVisorPosition("visor-to-left");
                    setEyeState("blue")
                    setBotPosition("bot-showing-menu");
                    setEyeState("emitting-holo")
                    setHologramActivated(true);
                    setIsShowingMenu(true);
                }} className={`greetbot-body ${botPosition}`}>
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
                        <HologramBeam/>
                        <HologramBeam/>
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