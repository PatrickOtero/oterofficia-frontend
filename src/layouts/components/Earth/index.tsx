import { memo } from "react";
import { EarthContainer } from "./earth.style";

export const PlanetEarth = memo(({ earthPosition }: { earthPosition: string }) => (
    <EarthContainer>
        <div className={`earth-main ${earthPosition}`} />
    </EarthContainer>
));
