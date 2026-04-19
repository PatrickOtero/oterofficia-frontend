import { CSSProperties } from "react";
import { TurbineContainer } from "./Turbine.style";

export const GreetBotTurbine = ({ animDelay }: { animDelay: string }) => {
    return (
        <TurbineContainer>
            <div
                className="turbine-container-zindex"
                style={{ "--thruster-delay": animDelay } as CSSProperties}
            >
                <div className="turbine-container-xindex">
                    <div className="turbine-3d-container" />
                    <div className="turbine-shuttle" />
                </div>
            </div>
        </TurbineContainer>
    );
};