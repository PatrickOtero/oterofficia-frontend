import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { PlanetSystem } from "../PlanetSystem";
import { StarsBackground } from "../StarsBackground";
import { SceneParallaxLayer } from "../sceneCamera/SceneParallaxLayer";

type SceneBackdropProps = {
    planetPosition: string;
};

export const SceneBackdrop = ({ planetPosition }: SceneBackdropProps) => {
    const { spaceTheme } = useBotFunctionsContext();

    return (
        <div className="scene-stage">
            <SceneParallaxLayer depth={0.06} zoomFactor={0.02}>
                <StarsBackground theme={spaceTheme} />
            </SceneParallaxLayer>
            <div className="planet-system">
                <PlanetSystem planetPosition={planetPosition} />
            </div>
        </div>
    );
};
