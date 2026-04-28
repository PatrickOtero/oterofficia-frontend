import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { GenericCelestialBody } from "./GenericCelestialBody";
import { PLANET_MOON_SYSTEMS } from "./planetMoonSystems";
import { GENERIC_CELESTIAL_VISUALS, type GenericCelestialTheme } from "./planetVisuals";
import { PlanetEarth } from "../Earth";
import { PlanetJupiter } from "../Jupiter";
import { PlanetMars } from "../Mars";
import { OrbitalMoons, type OrbitalMoonConfig } from "../OrbitalMoons";
import { PlanetSaturn } from "../Saturn";
import { SceneParallaxLayer } from "../sceneCamera/SceneParallaxLayer";

type PlanetSystemProps = {
    planetPosition: string;
};

const renderOrbitalMoons = (
    moons: OrbitalMoonConfig[],
    tabletScale?: string,
    mobileScale?: string
) => moons?.length ? (
    <OrbitalMoons mobileScale={mobileScale} moons={moons} tabletScale={tabletScale} />
) : null;

export const PlanetSystem = ({ planetPosition }: PlanetSystemProps) => {
    const { spaceTheme } = useBotFunctionsContext();
    const moons = PLANET_MOON_SYSTEMS[spaceTheme] ?? [];

    if (spaceTheme === "space" || spaceTheme === "asteroids") {
        return null;
    }

    if (spaceTheme in GENERIC_CELESTIAL_VISUALS) {
        return (
            <SceneParallaxLayer depth={0.34} zoomFactor={0.5}>
                {renderOrbitalMoons(moons)}
                <GenericCelestialBody planetPosition={planetPosition} theme={spaceTheme as GenericCelestialTheme} />
            </SceneParallaxLayer>
        );
    }

    if (spaceTheme === "mars") {
        return (
            <SceneParallaxLayer depth={0.34} zoomFactor={0.5}>
                {renderOrbitalMoons(moons)}
                <PlanetMars planetPosition={planetPosition} />
            </SceneParallaxLayer>
        );
    }

    if (spaceTheme === "jupiter") {
        return (
            <SceneParallaxLayer depth={0.38} zoomFactor={0.56}>
                {renderOrbitalMoons(moons, "0.78", "0.64")}
                <PlanetJupiter planetPosition={planetPosition} />
            </SceneParallaxLayer>
        );
    }

    if (spaceTheme === "saturn") {
        return (
            <SceneParallaxLayer depth={0.39} zoomFactor={0.58}>
                {renderOrbitalMoons(moons, "0.74", "0.6")}
                <PlanetSaturn planetPosition={planetPosition} />
            </SceneParallaxLayer>
        );
    }

    return (
        <SceneParallaxLayer depth={0.32} zoomFactor={0.46}>
            {renderOrbitalMoons(moons)}
            <PlanetEarth earthPosition={planetPosition} />
        </SceneParallaxLayer>
    );
};
