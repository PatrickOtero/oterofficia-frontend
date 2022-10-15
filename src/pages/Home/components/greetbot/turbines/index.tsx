import { TurbineContainer } from "./Turbine.style";

export const GreetBotTurbine = ({animDelay} : {animDelay: string}) => {
    return (
        <TurbineContainer>
            <div style={{animationDelay: `${animDelay}`}} className="turbine-container-zindex">
                <div style={{animationDelay: `${animDelay}`}} className="turbine-container-xindex">
                        <div className="turbine-shuttle"></div>
                    <div className="turbine-3d-container">
                    </div>
                </div>
            </div>
        </TurbineContainer>
    );
}