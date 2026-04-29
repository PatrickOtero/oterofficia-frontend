import { memo, useMemo } from "react";
import { createOrbitalMoonStyle } from "./orbitalMoons.motion";
import { OrbitalMoonsContainer } from "./orbitalMoons.style";
import type { OrbitalMoonConfig, OrbitalMoonsContainerStyle } from "./orbitalMoons.types";
import { useOrbitalMoonMotion } from "./useOrbitalMoonMotion";

export type { OrbitalMoonConfig } from "./orbitalMoons.types";

type OrbitalMoonsProps = {
    moons: OrbitalMoonConfig[];
    mobileScale?: string;
    tabletScale?: string;
};

const createContainerStyle = (
    tabletScale: string,
    mobileScale: string
): OrbitalMoonsContainerStyle => ({
    "--planetary-moons-mobile-scale": mobileScale,
    "--planetary-moons-tablet-scale": tabletScale,
});

export const OrbitalMoons = memo(
    ({
        moons,
        mobileScale = "0.68",
        tabletScale = "0.82",
    }: OrbitalMoonsProps) => {
        const moonNodesRef = useOrbitalMoonMotion(moons);
        const containerStyle = useMemo(
            () => createContainerStyle(tabletScale, mobileScale),
            [mobileScale, tabletScale]
        );

        return (
            <OrbitalMoonsContainer style={containerStyle}>
                {moons.map((moon) => (
                    <div className="orbital-moon-system" key={moon.key} style={createOrbitalMoonStyle(moon)}>
                        <div
                            className="orbital-moon-position"
                            ref={(node) => {
                                moonNodesRef.current[moon.key] = node;
                            }}
                        >
                            <div className="orbital-moon-depth">
                                <div className="orbital-moon-body">
                                    <div className="orbital-moon-surface">
                                        <div className="orbital-moon-track">
                                            <div className="orbital-moon-panel" />
                                            <div className="orbital-moon-panel" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </OrbitalMoonsContainer>
        );
    }
);
