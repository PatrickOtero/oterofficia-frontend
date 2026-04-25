import { memo } from "react";
import { CelestialTexturePanels } from "../PlanetSystem/CelestialTexturePanels";
import { createPlanetInclinationStyle } from "../PlanetSystem/planetaryInclinations";
import { EarthContainer } from "./earth.style";

export const PlanetEarth = memo(({ earthPosition }: { earthPosition: string }) => (
    <EarthContainer style={createPlanetInclinationStyle("earth")}>
        <div className={`earth-main ${earthPosition}`}>
            <CelestialTexturePanels panelClassName="earth-map-panel" trackClassName="earth-map-track" />
        </div>
    </EarthContainer>
));
