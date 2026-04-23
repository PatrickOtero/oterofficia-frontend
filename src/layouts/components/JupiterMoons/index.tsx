import { memo } from "react";
import callistoMap from "../../../assets/callisto-map.jpg";
import europaMap from "../../../assets/europa-map.jpg";
import ganymedeMap from "../../../assets/ganymede-map.jpg";
import ioMap from "../../../assets/io-map.jpg";
import { OrbitalMoons, type OrbitalMoonConfig, type OrbitalMoonPlacement } from "../OrbitalMoons";
import { JUPITER_SCENE_CENTER_Y } from "../PlanetSystem/sceneAnchors";

const centerY = JUPITER_SCENE_CENTER_Y;

const moons: OrbitalMoonConfig[] = [
    {
        centerY,
        glow: "rgba(255, 198, 120, 0.12)",
        key: "io",
        map: ioMap,
        mapFilter: "saturate(1.08) contrast(1.08) brightness(0.98)",
        orbitDelay: "-14s",
        orbitDuration: "122s",
        orbitSize: "78rem",
        shadow: "rgba(84, 28, 8, 0.26)",
        shellEnd: "#8d4f2d",
        shellMid: "#d59054",
        shellStart: "#f8d37c",
        size: "4.1rem",
        spinDuration: "118s",
        trackOpacity: "0.95",
    },
    {
        centerY,
        glow: "rgba(196, 224, 255, 0.14)",
        key: "europa",
        map: europaMap,
        mapFilter: "saturate(0.9) contrast(1.08) brightness(1.02)",
        orbitDelay: "-52s",
        orbitDuration: "156s",
        orbitSize: "90rem",
        shadow: "rgba(44, 58, 82, 0.2)",
        shellEnd: "#96a4b6",
        shellMid: "#d9e1eb",
        shellStart: "#f7fbff",
        size: "3.7rem",
        spinDuration: "148s",
        trackOpacity: "0.92",
    },
    {
        centerY,
        glow: "rgba(220, 234, 255, 0.12)",
        key: "ganymede",
        map: ganymedeMap,
        mapFilter: "saturate(0.86) contrast(1.06) brightness(0.98)",
        orbitDelay: "-108s",
        orbitDuration: "204s",
        orbitSize: "106rem",
        shadow: "rgba(48, 44, 38, 0.24)",
        shellEnd: "#80756a",
        shellMid: "#b6aca3",
        shellStart: "#ece6df",
        size: "4.8rem",
        spinDuration: "188s",
        trackOpacity: "0.94",
    },
    {
        centerY,
        glow: "rgba(210, 223, 239, 0.1)",
        key: "callisto",
        map: callistoMap,
        mapFilter: "saturate(0.82) contrast(1.08) brightness(0.96)",
        orbitDelay: "-82s",
        orbitDuration: "246s",
        orbitSize: "120rem",
        shadow: "rgba(24, 22, 22, 0.28)",
        shellEnd: "#5b5651",
        shellMid: "#928980",
        shellStart: "#c8c0b7",
        size: "4.4rem",
        spinDuration: "214s",
        trackOpacity: "0.96",
    },
];

type JupiterMoonsProps = {
    placement?: OrbitalMoonPlacement;
};

export const JupiterMoons = memo(({ placement = "back" }: JupiterMoonsProps) => (
    <OrbitalMoons mobileScale="0.64" moons={moons} placement={placement} tabletScale="0.78" />
));
