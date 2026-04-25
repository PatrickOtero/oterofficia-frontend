import type { CSSProperties } from "react";
import { memo } from "react";
import { OrbitalMoonsContainer } from "./orbitalMoons.style";

export type OrbitalMoonPlacement = "back" | "front";

export type OrbitalMoonConfig = {
    bodyClipPath?: string;
    bodyRadius?: string;
    bodyRotate?: string;
    bodyScaleX?: string;
    bodyScaleY?: string;
    centerY: string;
    glow: string;
    key: string;
    label?: string;
    map: string;
    mapFilter?: string;
    orbitDelay: string;
    orbitDuration: string;
    orbitSize: string;
    shadow: string;
    shellEnd: string;
    shellMid: string;
    shellStart: string;
    size: string;
    spinDuration: string;
    trackOpacity?: string;
};

type OrbitalMoonsProps = {
    moons: OrbitalMoonConfig[];
    mobileScale?: string;
    placement?: OrbitalMoonPlacement;
    tabletScale?: string;
};

type OrbitalMoonStyle = CSSProperties & {
    "--moon-body-clip-path"?: string;
    "--moon-body-radius"?: string;
    "--moon-body-rotate"?: string;
    "--moon-body-scale-x"?: string;
    "--moon-body-scale-y"?: string;
    "--moon-center-y": string;
    "--moon-glow": string;
    "--moon-map": string;
    "--moon-map-filter"?: string;
    "--moon-orbit-delay": string;
    "--moon-orbit-duration": string;
    "--moon-orbit-size": string;
    "--moon-shadow": string;
    "--moon-shell-end": string;
    "--moon-shell-mid": string;
    "--moon-shell-start": string;
    "--moon-size": string;
    "--moon-spin-duration": string;
    "--moon-track-opacity"?: string;
};

type OrbitalMoonsContainerStyle = CSSProperties & {
    "--planetary-moons-mobile-scale": string;
    "--planetary-moons-tablet-scale": string;
};

const createMoonStyle = (moon: OrbitalMoonConfig): OrbitalMoonStyle => ({
    "--moon-body-clip-path": moon.bodyClipPath,
    "--moon-body-radius": moon.bodyRadius,
    "--moon-body-rotate": moon.bodyRotate,
    "--moon-body-scale-x": moon.bodyScaleX,
    "--moon-body-scale-y": moon.bodyScaleY,
    "--moon-center-y": moon.centerY,
    "--moon-glow": moon.glow,
    "--moon-map": `url(${moon.map})`,
    "--moon-map-filter": moon.mapFilter,
    "--moon-orbit-delay": moon.orbitDelay,
    "--moon-orbit-duration": moon.orbitDuration,
    "--moon-orbit-size": moon.orbitSize,
    "--moon-shadow": moon.shadow,
    "--moon-shell-end": moon.shellEnd,
    "--moon-shell-mid": moon.shellMid,
    "--moon-shell-start": moon.shellStart,
    "--moon-size": moon.size,
    "--moon-spin-duration": moon.spinDuration,
    "--moon-track-opacity": moon.trackOpacity,
});

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
        placement = "back",
        tabletScale = "0.82",
    }: OrbitalMoonsProps) => (
        <OrbitalMoonsContainer data-placement={placement} style={createContainerStyle(tabletScale, mobileScale)}>
            {moons.map((moon) => (
                <div className="orbital-moon-system" key={moon.key} style={createMoonStyle(moon)}>
                    <div className="orbital-moon-orbit">
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
            ))}
        </OrbitalMoonsContainer>
    )
);
