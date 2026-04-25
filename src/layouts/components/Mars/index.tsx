import { memo } from "react";
import { CelestialTexturePanels } from "../PlanetSystem/CelestialTexturePanels";
import { createPlanetInclinationStyle } from "../PlanetSystem/planetaryInclinations";
import { MarsContainer } from "./mars.style";

export const PlanetMars = memo(({ planetPosition }: { planetPosition: string }) => (
    <MarsContainer style={createPlanetInclinationStyle("mars")}>
        <div className={`mars-main ${planetPosition}`}>
            <CelestialTexturePanels panelClassName="mars-map-panel" trackClassName="mars-map-track" />
        </div>
    </MarsContainer>
));
