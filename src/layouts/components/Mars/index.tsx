import { memo } from "react";
import { MarsContainer } from "./mars.style";

export const PlanetMars = memo(({ planetPosition }: { planetPosition: string }) => (
    <MarsContainer>
        <div className={`mars-main ${planetPosition}`}>
            <div className="mars-map-track">
                <div className="mars-map-panel" />
                <div className="mars-map-panel" />
            </div>
        </div>
    </MarsContainer>
));
