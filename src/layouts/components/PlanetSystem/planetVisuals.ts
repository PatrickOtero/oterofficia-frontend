import type { SpaceTheme } from "../greetbot/spaceThemes";
import ceresMap from "../../../assets/ceres-global-map.jpg";
import erisMap from "../../../assets/eris-map.jpg";
import haumeaMap from "../../../assets/haumea-map.jpg";
import makemakeMap from "../../../assets/makemake-map.jpg";
import mercuryMap from "../../../assets/mercury-global-map.jpg";
import neptuneMap from "../../../assets/neptune-map.jpg";
import plutoMap from "../../../assets/pluto-global-map.jpg";
import uranusMap from "../../../assets/uranus-map.jpg";
import venusMap from "../../../assets/venus-global-view.jpg";

export type GenericCelestialTheme = Exclude<
    SpaceTheme,
    | "earth"
    | "mars"
    | "jupiter"
    | "saturn"
    | "space"
    | "asteroids"
>;

type RingVisual = {
    className: string;
    color: string;
    height: string;
    opacity: string;
    rotateOffset: string;
    width: string;
};

export type GenericCelestialVisual = {
    bodyClassName?: string;
    glow: string;
    mapBlendMode?: string;
    mapFilter?: string;
    mapOpacity?: string;
    ring?: RingVisual;
    rotationDuration: string;
    scale: string;
    shell: string;
    size: string;
    texture: string;
    textureSize?: string;
};

export const GENERIC_CELESTIAL_VISUALS: Record<GenericCelestialTheme, GenericCelestialVisual> = {
    mercury: {
        glow: "rgba(220, 204, 184, 0.1)",
        scale: "1.08",
        shell: "linear-gradient(145deg, #b8afa6 0%, #6f6a67 48%, #2f3032 100%)",
        rotationDuration: "176s",
        size: "62rem",
        texture: `url(${mercuryMap})`,
        textureSize: "100% 100%",
    },
    venus: {
        glow: "rgba(255, 213, 146, 0.16)",
        mapFilter: "saturate(1.04) contrast(1.04) brightness(0.98)",
        rotationDuration: "420s",
        scale: "1.07",
        shell: "linear-gradient(145deg, #f2cc88 0%, #c8833a 50%, #6a351c 100%)",
        size: "88rem",
        texture: `url(${venusMap})`,
        textureSize: "100% 100%",
    },
    uranus: {
        glow: "rgba(151, 223, 226, 0.16)",
        ring: { className: "generic-ring-uranus", color: "rgba(185, 216, 218, 0.38)", height: "24rem", opacity: "0.5", rotateOffset: "79deg", width: "122rem" },
        rotationDuration: "214s",
        scale: "1.04",
        shell: "linear-gradient(145deg, #c9f2ef 0%, #75c9cf 52%, #2b7f8d 100%)",
        size: "86rem",
        texture: `url(${uranusMap})`,
        textureSize: "100% 100%",
    },
    neptune: {
        glow: "rgba(84, 140, 255, 0.18)",
        ring: { className: "generic-ring-neptune", color: "rgba(146, 174, 219, 0.28)", height: "20rem", opacity: "0.42", rotateOffset: "-8deg", width: "118rem" },
        rotationDuration: "196s",
        scale: "1.04",
        shell: "linear-gradient(145deg, #6aa2ff 0%, #2a58d3 50%, #10205f 100%)",
        size: "84rem",
        texture: `url(${neptuneMap})`,
        textureSize: "100% 100%",
    },
    ceres: {
        glow: "rgba(210, 210, 205, 0.1)",
        mapFilter: "saturate(0.86) contrast(1.08) brightness(0.94)",
        mapOpacity: "0.94",
        rotationDuration: "168s",
        scale: "1",
        shell: "linear-gradient(145deg, #c9c5ba 0%, #817c75 54%, #353538 100%)",
        size: "36rem",
        texture: `url(${ceresMap})`,
        textureSize: "100% 100%",
    },
    pluto: {
        glow: "rgba(224, 188, 166, 0.12)",
        mapFilter: "saturate(0.94) contrast(1.06) brightness(0.96)",
        mapOpacity: "0.95",
        rotationDuration: "244s",
        scale: "1",
        shell: "linear-gradient(145deg, #d6b79e 0%, #9b6c58 48%, #4d3840 100%)",
        size: "42rem",
        texture: `url(${plutoMap})`,
        textureSize: "100% 100%",
    },
    haumea: {
        bodyClassName: "generic-body-haumea",
        glow: "rgba(225, 230, 238, 0.11)",
        ring: { className: "generic-ring-haumea", color: "rgba(230, 228, 220, 0.24)", height: "10rem", opacity: "0.38", rotateOffset: "-8deg", width: "82rem" },
        rotationDuration: "92s",
        scale: "1",
        shell: "linear-gradient(145deg, #e7e8e5 0%, #b9b9b3 54%, #626265 100%)",
        size: "34rem",
        texture: `url(${haumeaMap})`,
        textureSize: "100% 100%",
    },
    makemake: {
        glow: "rgba(199, 115, 88, 0.1)",
        mapFilter: "saturate(1.02) contrast(1.04) brightness(0.96)",
        rotationDuration: "178s",
        scale: "1",
        shell: "linear-gradient(145deg, #bd765f 0%, #8f3e32 52%, #3e2225 100%)",
        size: "38rem",
        texture: `url(${makemakeMap})`,
        textureSize: "100% 100%",
    },
    eris: {
        glow: "rgba(228, 232, 242, 0.12)",
        mapFilter: "saturate(0.9) contrast(1.08) brightness(1.02)",
        rotationDuration: "238s",
        scale: "1",
        shell: "linear-gradient(145deg, #edf0f4 0%, #b8c0cc 54%, #667083 100%)",
        size: "40rem",
        texture: `url(${erisMap})`,
        textureSize: "100% 100%",
    },
};
