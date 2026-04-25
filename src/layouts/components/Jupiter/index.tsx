import { memo } from "react";
import { CelestialTexturePanels } from "../PlanetSystem/CelestialTexturePanels";
import { createPlanetInclinationStyle } from "../PlanetSystem/planetaryInclinations";
import { JupiterRing } from "./JupiterRing";
import { JupiterContainer } from "./jupiter.style";

export const PlanetJupiter = memo(({ planetPosition }: { planetPosition: string }) => (
    <JupiterContainer style={createPlanetInclinationStyle("jupiter")}>
        <JupiterRing className="jupiter-ring-art jupiter-ring-back" gradientId="jupiter-ring-back-gradient" segment="back" />
        <div className={`jupiter-main ${planetPosition}`}>
            <CelestialTexturePanels panelClassName="jupiter-map-panel" trackClassName="jupiter-map-track" />
        </div>
        <JupiterRing className="jupiter-ring-art jupiter-ring-front" gradientId="jupiter-ring-front-gradient" segment="front" />
    </JupiterContainer>
));
