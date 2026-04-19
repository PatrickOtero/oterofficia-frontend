import { GreetBotTurbine } from "../turbines";
import { BotHead } from "./BotHead";

type Props = {
    visorPosition: string;
    eyeState: string;
    hologramActivated: boolean;
};

export const PoseSkeleton = ({
    visorPosition,
    eyeState,
    hologramActivated,
}: Props) => {
    return (
        <div className="bot-pose pose-front">
            <BotHead
                visorPosition={visorPosition}
                eyeState={eyeState}
                hologramActivated={hologramActivated}
            />

            <div className="bot-neck" />
            <div className="bot-torso">
                <div className="bot-core" />
            </div>
            <div className="bot-pelvis" />

            <div className="segment shoulder-left" />
            <div className="segment shoulder-right" />

            <div className="segment upper-arm-left" />
            <div className="segment upper-arm-right" />

            <div className="segment forearm-left" />
            <div className="segment forearm-right" />

            <div className="hand hand-left" />
            <div className="hand hand-right" />

            <div className="small-segment thigh-left" />
            <div className="small-segment thigh-right" />

            <div className="small-segment shin-left" />
            <div className="small-segment shin-right" />

            <div className="foot foot-left">
                <GreetBotTurbine animDelay="1s" />
            </div>

            <div className="foot foot-right">
                <GreetBotTurbine animDelay="1.6s" />
            </div>
        </div>
    );
};