import type { CSSProperties } from "react";
import { memo } from "react";
import deimosMap from "../../../assets/deimos-map.jpg";
import phobosMap from "../../../assets/phobos-map.jpg";
import { MarsMoonsContainer } from "./moons.style";

const moons = [
    {
        key: "phobos",
        map: phobosMap,
        size: "3.6rem",
        orbitSize: "76rem",
        orbitBottom: "-29rem",
        orbitDuration: "120s",
        orbitDelay: "-18s",
        spinDuration: "114s",
        top: "9.4rem",
    },
    {
        key: "deimos",
        map: deimosMap,
        size: "2.9rem",
        orbitSize: "88rem",
        orbitBottom: "-34rem",
        orbitDuration: "176s",
        orbitDelay: "-102s",
        spinDuration: "162s",
        top: "7.4rem",
    },
];

type MoonOrbitStyle = CSSProperties & {
    "--moon-map": string;
    "--moon-orbit-delay": string;
    "--moon-orbit-bottom": string;
    "--moon-orbit-duration": string;
    "--moon-orbit-size": string;
    "--moon-size": string;
    "--moon-spin-duration": string;
    "--moon-top": string;
};

const createMoonOrbitStyle = (moon: (typeof moons)[number]): MoonOrbitStyle => ({
    "--moon-map": `url(${moon.map})`,
    "--moon-orbit-delay": moon.orbitDelay,
    "--moon-orbit-bottom": moon.orbitBottom,
    "--moon-orbit-duration": moon.orbitDuration,
    "--moon-orbit-size": moon.orbitSize,
    "--moon-size": moon.size,
    "--moon-spin-duration": moon.spinDuration,
    "--moon-top": moon.top,
});

export const MarsMoons = memo(() => (
    <MarsMoonsContainer>
        {moons.map((moon) => (
            <div className="mars-moon-orbit" key={moon.key} style={createMoonOrbitStyle(moon)}>
                <div className="mars-moon-body">
                    <div className="mars-moon-surface">
                        <div className="mars-moon-track">
                            <div className="mars-moon-panel" />
                            <div className="mars-moon-panel" />
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </MarsMoonsContainer>
));
