import type { CSSProperties } from "react";

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
    orbitHeight?: string;
    orbitSize: string;
    orbitWidth?: string;
    shadow: string;
    shellEnd: string;
    shellMid: string;
    shellStart: string;
    size: string;
    spinDuration: string;
    trackOpacity?: string;
};

export type OrbitalMoonStyle = CSSProperties & {
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
    "--moon-orbit-height": string;
    "--moon-orbit-size": string;
    "--moon-orbit-width": string;
    "--moon-shadow": string;
    "--moon-shell-end": string;
    "--moon-shell-mid": string;
    "--moon-shell-start": string;
    "--moon-size": string;
    "--moon-spin-duration": string;
    "--moon-track-opacity"?: string;
};

export type OrbitalMoonsContainerStyle = CSSProperties & {
    "--planetary-moons-mobile-scale": string;
    "--planetary-moons-tablet-scale": string;
};
