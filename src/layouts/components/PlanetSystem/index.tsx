import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { GenericCelestialBody } from "./GenericCelestialBody";
import { PLANET_MOON_SYSTEMS } from "./planetMoonSystems";
import { GENERIC_CELESTIAL_VISUALS, type GenericCelestialTheme } from "./planetVisuals";
import { PlanetEarth } from "../Earth";
import { PlanetJupiter } from "../Jupiter";
import { PlanetMars } from "../Mars";
import { OrbitalMoons } from "../OrbitalMoons";
import { PlanetSaturn } from "../Saturn";
import { SceneParallaxLayer } from "../sceneCamera/SceneParallaxLayer";

type PlanetSystemProps = {
    planetPosition: string;
};

export const PlanetSystem = ({ planetPosition }: PlanetSystemProps) => {
    const { spaceTheme } = useBotFunctionsContext();
    const moons = PLANET_MOON_SYSTEMS[spaceTheme] ?? [];

    if (spaceTheme === "space" || spaceTheme === "asteroids") {
        return null;
    }

    if (spaceTheme in GENERIC_CELESTIAL_VISUALS) {
        return (
            <>
                {moons.length ? (
                    <SceneParallaxLayer depth={0.16} zoomFactor={0.08}>
                        <OrbitalMoons moons={moons} />
                    </SceneParallaxLayer>
                ) : null}
                <SceneParallaxLayer depth={0.34} zoomFactor={0.5}>
                    <GenericCelestialBody planetPosition={planetPosition} theme={spaceTheme as GenericCelestialTheme} />
                </SceneParallaxLayer>
            </>
        );
    }

    if (spaceTheme === "mars") {
        return (
            <>
                <SceneParallaxLayer depth={0.16} zoomFactor={0.08}>
                    <OrbitalMoons moons={moons} />
                </SceneParallaxLayer>
                <SceneParallaxLayer depth={0.34} zoomFactor={0.5}>
                    <PlanetMars planetPosition={planetPosition} />
                </SceneParallaxLayer>
            </>
        );
    }

    if (spaceTheme === "jupiter") {
        return (
            <>
                <SceneParallaxLayer depth={0.18} zoomFactor={0.1}>
                    <OrbitalMoons mobileScale="0.64" moons={moons} tabletScale="0.78" />
                </SceneParallaxLayer>
                <SceneParallaxLayer depth={0.38} zoomFactor={0.56}>
                    <PlanetJupiter planetPosition={planetPosition} />
                </SceneParallaxLayer>
            </>
        );
    }

    if (spaceTheme === "saturn") {
        return (
            <>
                <SceneParallaxLayer depth={0.17} zoomFactor={0.1}>
                    <OrbitalMoons mobileScale="0.6" moons={moons} tabletScale="0.74" />
                </SceneParallaxLayer>
                <SceneParallaxLayer depth={0.39} zoomFactor={0.58}>
                    <PlanetSaturn planetPosition={planetPosition} />
                </SceneParallaxLayer>
            </>
        );
    }

    return (
        <>
            <SceneParallaxLayer depth={0.15} zoomFactor={0.08}>
                <OrbitalMoons moons={moons} />
            </SceneParallaxLayer>
            <SceneParallaxLayer depth={0.32} zoomFactor={0.46}>
                <PlanetEarth earthPosition={planetPosition} />
            </SceneParallaxLayer>
        </>
    );
};
