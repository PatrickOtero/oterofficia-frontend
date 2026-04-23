import { memo } from "react";
import { JupiterContainer } from "./jupiter.style";

export const PlanetJupiter = memo(({ planetPosition }: { planetPosition: string }) => (
    <JupiterContainer>
        <div className={`jupiter-main ${planetPosition}`}>
            <div className="jupiter-map-track">
                <div className="jupiter-map-panel" />
                <div className="jupiter-map-panel" />
            </div>
        </div>
    </JupiterContainer>
));
