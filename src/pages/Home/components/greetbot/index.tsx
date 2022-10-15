import { GreetBotContainer } from "./GreetBot.style";
import { GreetBotTurbine } from "./turbines";
import {Dispatch, SetStateAction} from "react"

interface IGreetBot {
    setVisorPosition: Dispatch<SetStateAction<string>>
    setBotPosition: Dispatch<SetStateAction<string>>
    setHologramActivated: Dispatch<SetStateAction<boolean>>

    visorPosition: string;
    botPosition: string;
    hologramActivated: boolean;
}

export const GreetBot = ({setHologramActivated, setBotPosition, setVisorPosition, hologramActivated, visorPosition, botPosition}: IGreetBot) => {

    return (
        <GreetBotContainer>
            <div onMouseEnter={() =>
                {
                    setVisorPosition("visor-to-left");
                    setBotPosition("bot-showing-menu");
                    setHologramActivated(true);
                }} className={`greetbot-body ${botPosition}`}>
                <div className="greetbot01-static-part">
                    <div className="greetbot01-static-part-inner-form"></div>
                    <div className={`greetBot01-visor ${visorPosition}`}>
                        <div className="gb-visor-horizontal">
                            <div className="gb-eyes eyeLeft"></div>
                            <div className="gb-eyes eyeRight"></div>
                        </div>
                        <div className="gb-visor-vertical">
                        <div className="gb-mouth"></div>
                        </div>
                    </div>
                </div>
                <div className="greetbot01-moving-part">
                <div className="greetbot01-moving-part-inner-form">
                </div>
                </div>
                <div className="turbines-container">
                    <GreetBotTurbine animDelay="1s"/>
                    <GreetBotTurbine animDelay="2s"/>
                    <GreetBotTurbine animDelay="3s"/>
                </div>
                { hologramActivated &&
                    <>
                        <div className="greetBot-menu-hologram-light-beam eye-beam-1"></div>
                        <div className="greetBot-menu-hologram-light-beam eye-beam-2"></div>
                    </>
                }
            </div>
        </GreetBotContainer>
    );
}