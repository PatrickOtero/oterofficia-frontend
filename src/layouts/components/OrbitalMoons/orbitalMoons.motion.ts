import type { OrbitalMoonConfig, OrbitalMoonStyle } from "./orbitalMoons.types";

export type OrbitalMoonMotion = {
    delayMs: number;
    durationMs: number;
    key: string;
};

export type OrbitalMoonFrame = {
    brightness: number;
    depth: number;
    saturation: number;
    scale: number;
    x: number;
    y: number;
};

const FULL_ORBIT_RADIANS = Math.PI * 2;
const DEFAULT_ORBIT_DURATION_MS = 180000;
const DEFAULT_ORBIT_WIDTH_FACTOR = 1.12;

const parseCssTimeToMs = (value: string, fallbackMs = 0) => {
    const normalizedValue = value.trim();
    const parsedValue = Number.parseFloat(normalizedValue);

    if (!Number.isFinite(parsedValue)) {
        return fallbackMs;
    }

    return normalizedValue.endsWith("ms") ? parsedValue : parsedValue * 1000;
};

const getPositiveDuration = (value: string) =>
    Math.max(parseCssTimeToMs(value, DEFAULT_ORBIT_DURATION_MS), 1);

const getDefaultOrbitWidth = (orbitSize: string) =>
    `calc(${orbitSize} * ${DEFAULT_ORBIT_WIDTH_FACTOR})`;

export const createOrbitalMoonStyle = (moon: OrbitalMoonConfig): OrbitalMoonStyle => ({
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
    "--moon-orbit-height": moon.orbitHeight ?? moon.orbitSize,
    "--moon-orbit-size": moon.orbitSize,
    "--moon-orbit-width": moon.orbitWidth ?? getDefaultOrbitWidth(moon.orbitSize),
    "--moon-shadow": moon.shadow,
    "--moon-shell-end": moon.shellEnd,
    "--moon-shell-mid": moon.shellMid,
    "--moon-shell-start": moon.shellStart,
    "--moon-size": moon.size,
    "--moon-spin-duration": moon.spinDuration,
    "--moon-track-opacity": moon.trackOpacity,
});

export const createOrbitalMoonMotion = (moon: OrbitalMoonConfig): OrbitalMoonMotion => ({
    delayMs: parseCssTimeToMs(moon.orbitDelay),
    durationMs: getPositiveDuration(moon.orbitDuration),
    key: moon.key,
});

export const getOrbitalMoonFrame = (
    elapsedMs: number,
    motion: OrbitalMoonMotion
): OrbitalMoonFrame => {
    const normalizedElapsed =
        (((elapsedMs - motion.delayMs) % motion.durationMs) + motion.durationMs) % motion.durationMs;
    const progress = normalizedElapsed / motion.durationMs;
    const angle = progress * FULL_ORBIT_RADIANS;
    const depth = Math.cos(angle);
    const depthProgress = (depth + 1) / 2;

    return {
        brightness: 0.76 + depthProgress * 0.3,
        depth,
        saturation: 0.88 + depthProgress * 0.16,
        scale: 0.9 + depthProgress * 0.16,
        x: Math.sin(angle),
        y: -Math.cos(angle),
    };
};
