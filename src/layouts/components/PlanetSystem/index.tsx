import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { PlanetEarth } from "../Earth";
import { PlanetJupiter } from "../Jupiter";
import { JupiterMoons } from "../JupiterMoons";
import { PlanetMars } from "../Mars";
import { MarsMoons } from "../MarsMoons";
import { Moon } from "../Moon";
import { PlanetSaturn } from "../Saturn";
import { SaturnMoons } from "../SaturnMoons";
import { SceneParallaxLayer } from "../sceneCamera/SceneParallaxLayer";

type PlanetSystemProps = {
    planetPosition: string;
};

export const PlanetSystem = ({ planetPosition }: PlanetSystemProps) => {
    const { spaceTheme } = useBotFunctionsContext();

    if (spaceTheme === "space" || spaceTheme === "asteroids") {
        return null;
    }

    if (spaceTheme === "mars") {
        return (
            <>
                <SceneParallaxLayer depth={0.16} zoomFactor={0.08}>
                    <MarsMoons />
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
                    <JupiterMoons />
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
                    <SaturnMoons />
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
                <Moon />
            </SceneParallaxLayer>
            <SceneParallaxLayer depth={0.32} zoomFactor={0.46}>
                <PlanetEarth earthPosition={planetPosition} />
            </SceneParallaxLayer>
        </>
    );
};
