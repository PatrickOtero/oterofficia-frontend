import { memo, type CSSProperties } from "react";
import { GenericCelestialRing } from "./GenericCelestialRing";
import { GenericCelestialContainer } from "./genericCelestialBody.style";
import { createPlanetInclinationStyle } from "./planetaryInclinations";
import { GENERIC_CELESTIAL_VISUALS, type GenericCelestialTheme } from "./planetVisuals";

type GenericCelestialBodyProps = {
    planetPosition: string;
    theme: GenericCelestialTheme;
};

export const GenericCelestialBody = memo(({ planetPosition, theme }: GenericCelestialBodyProps) => {
    const visual = GENERIC_CELESTIAL_VISUALS[theme];
    const style = {
        ...createPlanetInclinationStyle(theme),
        "--generic-body-glow": visual.glow,
        "--generic-body-scale": visual.scale,
        "--generic-body-shell": visual.shell,
        "--generic-body-size": visual.size,
        "--generic-body-texture": visual.texture,
        "--generic-body-texture-size": visual.textureSize ?? "100% 100%",
        "--generic-body-rotation-duration": visual.rotationDuration,
        "--generic-map-filter": visual.mapFilter ?? "saturate(1.05) contrast(1.04) brightness(1)",
        "--generic-map-opacity": visual.mapOpacity ?? "0.96",
        "--generic-ring-color": visual.ring?.color,
        "--generic-ring-height": visual.ring?.height,
        "--generic-ring-opacity": visual.ring?.opacity,
        "--generic-ring-rotate-offset": visual.ring?.rotateOffset,
        "--generic-ring-width": visual.ring?.width,
    } as CSSProperties;

    return (
        <GenericCelestialContainer style={style}>
            {visual.ring ? (
                <>
                    <GenericCelestialRing className={`generic-ring generic-ring-back ${visual.ring.className}`} />
                    <GenericCelestialRing className={`generic-ring generic-ring-front ${visual.ring.className}`} />
                </>
            ) : null}
            <div className={`generic-body ${visual.bodyClassName ?? ""} ${planetPosition}`}>
                <div className="generic-map-track">
                    <div className="generic-map-panel" />
                    <div className="generic-map-panel" />
                </div>
            </div>
        </GenericCelestialContainer>
    );
});
