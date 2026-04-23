import { memo } from "react";
import deimosMap from "../../../assets/deimos-map.jpg";
import phobosMap from "../../../assets/phobos-map.jpg";
import { OrbitalMoons, type OrbitalMoonConfig, type OrbitalMoonPlacement } from "../OrbitalMoons";
import { MARS_SCENE_CENTER_Y } from "../PlanetSystem/sceneAnchors";

const centerY = MARS_SCENE_CENTER_Y;

const moons: OrbitalMoonConfig[] = [
    {
        centerY,
        glow: "rgba(255, 215, 192, 0.08)",
        key: "phobos",
        map: phobosMap,
        mapFilter: "saturate(0.92) contrast(1.06) brightness(0.98)",
        orbitDelay: "-18s",
        orbitDuration: "120s",
        orbitSize: "76rem",
        shadow: "rgba(10, 10, 16, 0.22)",
        shellEnd: "#6a6257",
        shellMid: "#aa9f90",
        shellStart: "#d9d2c6",
        size: "3.6rem",
        spinDuration: "114s",
        trackOpacity: "0.96",
    },
    {
        centerY,
        glow: "rgba(255, 225, 205, 0.06)",
        key: "deimos",
        map: deimosMap,
        mapFilter: "saturate(0.92) contrast(1.06) brightness(0.98)",
        orbitDelay: "-102s",
        orbitDuration: "176s",
        orbitSize: "88rem",
        shadow: "rgba(12, 10, 16, 0.24)",
        shellEnd: "#6a6257",
        shellMid: "#b4a697",
        shellStart: "#e2dbce",
        size: "2.9rem",
        spinDuration: "162s",
        trackOpacity: "0.96",
    },
];

type MarsMoonsProps = {
    placement?: OrbitalMoonPlacement;
};

export const MarsMoons = memo(({ placement = "back" }: MarsMoonsProps) => (
    <OrbitalMoons mobileScale="0.68" moons={moons} placement={placement} tabletScale="0.82" />
));
