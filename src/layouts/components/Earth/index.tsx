import { memo } from "react";
import { EarthContainer } from "./earth.style";

export const PlanetEarth = memo(({ earthPosition }: { earthPosition: string }) => (
    <EarthContainer>
        <div className={`earth-main ${earthPosition}`}>
            <div className="earth-map-track">
                <div className="earth-map-panel" />
                <div className="earth-map-panel" />
            </div>
        </div>
    </EarthContainer>
));
