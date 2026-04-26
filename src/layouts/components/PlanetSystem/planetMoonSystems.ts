import type { SpaceTheme } from "../greetbot/spaceThemes";
import type { OrbitalMoonConfig } from "../OrbitalMoons";
import arielMap from "../../../assets/ariel-map.jpg";
import callistoMap from "../../../assets/callisto-map.jpg";
import charonMap from "../../../assets/charon-map.jpg";
import deimosMap from "../../../assets/deimos-map.jpg";
import dioneMap from "../../../assets/dione-map.jpg";
import dysnomiaMap from "../../../assets/dysnomia-map.jpg";
import enceladusMap from "../../../assets/enceladus-map.jpg";
import europaMap from "../../../assets/europa-map.jpg";
import ganymedeMap from "../../../assets/ganymede-map.jpg";
import hiiakaMap from "../../../assets/hiiaka-map.jpg";
import hydraMap from "../../../assets/hydra-map.jpg";
import ioMap from "../../../assets/io-map.jpg";
import mirandaMap from "../../../assets/miranda-map.jpg";
import mk2Map from "../../../assets/mk2-map.jpg";
import namakaMap from "../../../assets/namaka-map.jpg";
import nereidMap from "../../../assets/nereid-map.jpg";
import nixMap from "../../../assets/nix-map.jpg";
import moonMap from "../../../assets/moon-map.jpg";
import phobosMap from "../../../assets/phobos-map.jpg";
import rheaMap from "../../../assets/rhea-map.jpg";
import titanMap from "../../../assets/titan-map.jpg";
import titaniaMap from "../../../assets/titania-map.jpg";
import tritonMap from "../../../assets/triton-map.jpg";
import { EARTH_SCENE_CENTER_Y, JUPITER_SCENE_CENTER_Y, MARS_SCENE_CENTER_Y, SATURN_SCENE_CENTER_Y } from "./sceneAnchors";

const irregularAsteroidShape =
    "polygon(12% 24%, 28% 7%, 54% 4%, 79% 17%, 96% 42%, 86% 73%, 60% 94%, 27% 84%, 5% 55%)";

const icyMoon = (key: string, label: string, centerY: string, orbitSize: string, size: string, orbitDelay: string): OrbitalMoonConfig => ({
    centerY,
    glow: "rgba(222, 238, 255, 0.12)",
    key,
    label,
    map: moonMap,
    mapFilter: "saturate(0.72) contrast(1.08) brightness(1.02)",
    orbitDelay,
    orbitDuration: "210s",
    orbitSize,
    shadow: "rgba(52, 62, 82, 0.2)",
    shellEnd: "#aeb8c6",
    shellMid: "#dfe7ef",
    shellStart: "#fbfdff",
    size,
    spinDuration: "190s",
    trackOpacity: "0.9",
});

export const PLANET_MOON_SYSTEMS: Partial<Record<SpaceTheme, OrbitalMoonConfig[]>> = {
    earth: [
        {
            centerY: EARTH_SCENE_CENTER_Y,
            glow: "rgba(220, 235, 255, 0.12)",
            key: "moon",
            label: "Lua",
            map: moonMap,
            mapFilter: "saturate(0.82) contrast(1.08) brightness(1.02)",
            orbitDelay: "-36s",
            orbitDuration: "156s",
            orbitSize: "78rem",
            shadow: "rgba(44, 48, 58, 0.22)",
            shellEnd: "#8c8f93",
            shellMid: "#c6c9cc",
            shellStart: "#f3f4f5",
            size: "5.2rem",
            spinDuration: "180s",
            trackOpacity: "0.94",
        },
    ],
    mars: [
        {
            bodyClipPath: irregularAsteroidShape,
            bodyRadius: "42% 55% 48% 58% / 38% 48% 62% 52%",
            bodyRotate: "-14deg",
            bodyScaleX: "1.42",
            bodyScaleY: "0.86",
            centerY: MARS_SCENE_CENTER_Y,
            glow: "rgba(255, 215, 192, 0.08)",
            key: "phobos",
            label: "Phobos",
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
            bodyClipPath: irregularAsteroidShape,
            bodyRadius: "48% 44% 56% 42% / 44% 56% 38% 54%",
            bodyRotate: "18deg",
            bodyScaleX: "1.28",
            bodyScaleY: "0.78",
            centerY: MARS_SCENE_CENTER_Y,
            glow: "rgba(255, 225, 205, 0.06)",
            key: "deimos",
            label: "Deimos",
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
    ],
    jupiter: [
        { centerY: JUPITER_SCENE_CENTER_Y, glow: "rgba(255, 198, 120, 0.12)", key: "io", label: "Io", map: ioMap, mapFilter: "saturate(1.08) contrast(1.08) brightness(0.98)", orbitDelay: "-14s", orbitDuration: "122s", orbitSize: "78rem", shadow: "rgba(84, 28, 8, 0.26)", shellEnd: "#8d4f2d", shellMid: "#d59054", shellStart: "#f8d37c", size: "4.1rem", spinDuration: "118s", trackOpacity: "0.95" },
        { centerY: JUPITER_SCENE_CENTER_Y, glow: "rgba(196, 224, 255, 0.14)", key: "europa", label: "Europa", map: europaMap, mapFilter: "saturate(0.9) contrast(1.08) brightness(1.02)", orbitDelay: "-52s", orbitDuration: "156s", orbitSize: "90rem", shadow: "rgba(44, 58, 82, 0.2)", shellEnd: "#96a4b6", shellMid: "#d9e1eb", shellStart: "#f7fbff", size: "3.7rem", spinDuration: "148s", trackOpacity: "0.92" },
        { centerY: JUPITER_SCENE_CENTER_Y, glow: "rgba(220, 234, 255, 0.12)", key: "ganymede", label: "Ganymede", map: ganymedeMap, mapFilter: "saturate(0.86) contrast(1.06) brightness(0.98)", orbitDelay: "-108s", orbitDuration: "204s", orbitSize: "106rem", shadow: "rgba(48, 44, 38, 0.24)", shellEnd: "#80756a", shellMid: "#b6aca3", shellStart: "#ece6df", size: "4.8rem", spinDuration: "188s", trackOpacity: "0.94" },
        { centerY: JUPITER_SCENE_CENTER_Y, glow: "rgba(210, 223, 239, 0.1)", key: "callisto", label: "Callisto", map: callistoMap, mapFilter: "saturate(0.82) contrast(1.08) brightness(0.96)", orbitDelay: "-82s", orbitDuration: "246s", orbitSize: "120rem", shadow: "rgba(24, 22, 22, 0.28)", shellEnd: "#5b5651", shellMid: "#928980", shellStart: "#c8c0b7", size: "4.4rem", spinDuration: "214s", trackOpacity: "0.96" },
    ],
    saturn: [
        { centerY: SATURN_SCENE_CENTER_Y, glow: "rgba(255, 166, 94, 0.16)", key: "titan", label: "Titan", map: titanMap, mapFilter: "saturate(1.4) contrast(1.05) brightness(1.02)", orbitDelay: "-26s", orbitDuration: "138s", orbitSize: "92rem", shadow: "rgba(96, 42, 10, 0.22)", shellEnd: "#ac5a22", shellMid: "#ec983b", shellStart: "#ffbd6d", size: "5rem", spinDuration: "132s", trackOpacity: "0.9" },
        { centerY: SATURN_SCENE_CENTER_Y, glow: "rgba(245, 250, 255, 0.14)", key: "enceladus", label: "Enceladus", map: enceladusMap, mapFilter: "saturate(0.82) contrast(1.05) brightness(1.04)", orbitDelay: "-76s", orbitDuration: "174s", orbitSize: "106rem", shadow: "rgba(90, 110, 134, 0.16)", shellEnd: "#c3d1e4", shellMid: "#edf5fd", shellStart: "#ffffff", size: "3.2rem", spinDuration: "160s", trackOpacity: "0.88" },
        { centerY: SATURN_SCENE_CENTER_Y, glow: "rgba(232, 242, 255, 0.11)", key: "rhea", label: "Rhea", map: rheaMap, mapFilter: "saturate(0.78) contrast(1.04) brightness(1.02)", orbitDelay: "-102s", orbitDuration: "218s", orbitSize: "120rem", shadow: "rgba(60, 68, 82, 0.18)", shellEnd: "#aeb8c5", shellMid: "#dfe8f1", shellStart: "#fbfdff", size: "4.2rem", spinDuration: "194s", trackOpacity: "0.92" },
        { centerY: SATURN_SCENE_CENTER_Y, glow: "rgba(235, 240, 252, 0.1)", key: "dione", label: "Dione", map: dioneMap, mapFilter: "saturate(0.82) contrast(1.04) brightness(1.01)", orbitDelay: "-48s", orbitDuration: "254s", orbitSize: "132rem", shadow: "rgba(56, 62, 72, 0.18)", shellEnd: "#a8b0bb", shellMid: "#dde4ed", shellStart: "#f8fbff", size: "3.8rem", spinDuration: "228s", trackOpacity: "0.9" },
    ],
    uranus: [
        { ...icyMoon("miranda", "Miranda", EARTH_SCENE_CENTER_Y, "78rem", "3.2rem", "-22s"), map: mirandaMap },
        { ...icyMoon("ariel", "Ariel", EARTH_SCENE_CENTER_Y, "92rem", "3.6rem", "-76s"), map: arielMap },
        { ...icyMoon("titania", "Titania", EARTH_SCENE_CENTER_Y, "112rem", "4.4rem", "-132s"), map: titaniaMap },
    ],
    neptune: [
        { ...icyMoon("triton", "Triton", EARTH_SCENE_CENTER_Y, "92rem", "4.5rem", "-54s"), map: tritonMap, mapFilter: "saturate(0.86) contrast(1.08) brightness(1.01)" },
        { ...icyMoon("nereid", "Nereid", EARTH_SCENE_CENTER_Y, "114rem", "2.6rem", "-120s"), bodyClipPath: irregularAsteroidShape, bodyScaleX: "1.26", bodyScaleY: "0.82", map: nereidMap },
    ],
    pluto: [
        { ...icyMoon("charon", "Charon", EARTH_SCENE_CENTER_Y, "72rem", "4.2rem", "-28s"), map: charonMap },
        { ...icyMoon("nix", "Nix", EARTH_SCENE_CENTER_Y, "88rem", "2.2rem", "-84s"), bodyClipPath: irregularAsteroidShape, bodyScaleX: "1.36", bodyScaleY: "0.74", map: nixMap },
        { ...icyMoon("hydra", "Hydra", EARTH_SCENE_CENTER_Y, "102rem", "2.3rem", "-146s"), bodyClipPath: irregularAsteroidShape, bodyScaleX: "1.42", bodyScaleY: "0.7", map: hydraMap },
    ],
    haumea: [
        { ...icyMoon("hiiaka", "Hi'iaka", EARTH_SCENE_CENTER_Y, "66rem", "2.7rem", "-42s"), bodyClipPath: irregularAsteroidShape, bodyScaleX: "1.22", bodyScaleY: "0.86", map: hiiakaMap },
        { ...icyMoon("namaka", "Namaka", EARTH_SCENE_CENTER_Y, "82rem", "2rem", "-118s"), bodyClipPath: irregularAsteroidShape, bodyScaleX: "1.28", bodyScaleY: "0.78", map: namakaMap },
    ],
    makemake: [
        { ...icyMoon("mk2", "MK2", EARTH_SCENE_CENTER_Y, "66rem", "2rem", "-74s"), bodyClipPath: irregularAsteroidShape, bodyScaleX: "1.3", bodyScaleY: "0.8", map: mk2Map, shellEnd: "#2f2728", shellMid: "#5f5554", shellStart: "#9b918d" },
    ],
    eris: [
        { ...icyMoon("dysnomia", "Dysnomia", EARTH_SCENE_CENTER_Y, "68rem", "2.4rem", "-64s"), bodyClipPath: irregularAsteroidShape, bodyScaleX: "1.24", bodyScaleY: "0.84", map: dysnomiaMap },
    ],
};
