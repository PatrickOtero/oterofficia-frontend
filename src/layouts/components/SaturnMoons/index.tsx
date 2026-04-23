import { memo } from "react";
import dioneMap from "../../../assets/dione-map.jpg";
import enceladusMap from "../../../assets/enceladus-map.jpg";
import rheaMap from "../../../assets/rhea-map.jpg";
import titanMap from "../../../assets/titan-map.jpg";
import { OrbitalMoons, type OrbitalMoonConfig, type OrbitalMoonPlacement } from "../OrbitalMoons";
import { SATURN_SCENE_CENTER_Y } from "../PlanetSystem/sceneAnchors";

const centerY = SATURN_SCENE_CENTER_Y;

const moons: OrbitalMoonConfig[] = [
    {
        centerY,
        glow: "rgba(255, 166, 94, 0.16)",
        key: "titan",
        map: titanMap,
        mapFilter: "saturate(1.4) contrast(1.05) brightness(1.02)",
        orbitDelay: "-26s",
        orbitDuration: "138s",
        orbitSize: "92rem",
        shadow: "rgba(96, 42, 10, 0.22)",
        shellEnd: "#ac5a22",
        shellMid: "#ec983b",
        shellStart: "#ffbd6d",
        size: "5rem",
        spinDuration: "132s",
        trackOpacity: "0.9",
    },
    {
        centerY,
        glow: "rgba(245, 250, 255, 0.14)",
        key: "enceladus",
        map: enceladusMap,
        mapFilter: "saturate(0.82) contrast(1.05) brightness(1.04)",
        orbitDelay: "-76s",
        orbitDuration: "174s",
        orbitSize: "106rem",
        shadow: "rgba(90, 110, 134, 0.16)",
        shellEnd: "#c3d1e4",
        shellMid: "#edf5fd",
        shellStart: "#ffffff",
        size: "3.2rem",
        spinDuration: "160s",
        trackOpacity: "0.88",
    },
    {
        centerY,
        glow: "rgba(232, 242, 255, 0.11)",
        key: "rhea",
        map: rheaMap,
        mapFilter: "saturate(0.78) contrast(1.04) brightness(1.02)",
        orbitDelay: "-102s",
        orbitDuration: "218s",
        orbitSize: "120rem",
        shadow: "rgba(60, 68, 82, 0.18)",
        shellEnd: "#aeb8c5",
        shellMid: "#dfe8f1",
        shellStart: "#fbfdff",
        size: "4.2rem",
        spinDuration: "194s",
        trackOpacity: "0.92",
    },
    {
        centerY,
        glow: "rgba(235, 240, 252, 0.1)",
        key: "dione",
        map: dioneMap,
        mapFilter: "saturate(0.82) contrast(1.04) brightness(1.01)",
        orbitDelay: "-48s",
        orbitDuration: "254s",
        orbitSize: "132rem",
        shadow: "rgba(56, 62, 72, 0.18)",
        shellEnd: "#a8b0bb",
        shellMid: "#dde4ed",
        shellStart: "#f8fbff",
        size: "3.8rem",
        spinDuration: "228s",
        trackOpacity: "0.9",
    },
];

type SaturnMoonsProps = {
    placement?: OrbitalMoonPlacement;
};

export const SaturnMoons = memo(({ placement = "back" }: SaturnMoonsProps) => (
    <OrbitalMoons mobileScale="0.6" moons={moons} placement={placement} tabletScale="0.74" />
));
