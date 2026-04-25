import type { CSSProperties } from "react";

export const PLANETARY_INCLINATIONS = {
    mercury: "0.034deg",
    venus: "177.4deg",
    earth: "23.4deg",
    moon: "6.7deg",
    mars: "25.2deg",
    jupiter: "3.1deg",
    saturn: "26.7deg",
    uranus: "97.8deg",
    neptune: "28.3deg",
    ceres: "4deg",
    pluto: "119.5deg",
    haumea: "0deg",
    makemake: "0deg",
    eris: "0deg",
} as const;

export type InclinedCelestialBody = keyof typeof PLANETARY_INCLINATIONS;

export const createPlanetInclinationStyle = (body: InclinedCelestialBody): CSSProperties =>
    ({
        "--planet-inclination": PLANETARY_INCLINATIONS[body],
    }) as CSSProperties;
