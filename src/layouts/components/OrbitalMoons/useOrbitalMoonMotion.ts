import { useEffect, useMemo, useRef } from "react";
import type { OrbitalMoonConfig } from "./orbitalMoons.types";
import {
    createOrbitalMoonMotion,
    getOrbitalMoonFrame,
    type OrbitalMoonMotion,
} from "./orbitalMoons.motion";

type MoonNodeMap = Record<string, HTMLDivElement | null>;

const formatMotionValue = (value: number, precision = 4) => value.toFixed(precision);

const applyMoonFrame = (node: HTMLDivElement, elapsedMs: number, motion: OrbitalMoonMotion) => {
    const frame = getOrbitalMoonFrame(elapsedMs, motion);

    node.style.setProperty("--moon-orbit-x", formatMotionValue(frame.x, 5));
    node.style.setProperty("--moon-orbit-y", formatMotionValue(frame.y, 5));
    node.style.setProperty("--moon-depth-scale", formatMotionValue(frame.scale));
    node.style.setProperty("--moon-depth-brightness", formatMotionValue(frame.brightness));
    node.style.setProperty("--moon-depth-saturation", formatMotionValue(frame.saturation));
    node.style.zIndex = frame.depth >= 0 ? "3" : "1";
};

export const useOrbitalMoonMotion = (moons: OrbitalMoonConfig[]) => {
    const moonNodesRef = useRef<MoonNodeMap>({});
    const moonMotion = useMemo(() => moons.map(createOrbitalMoonMotion), [moons]);

    useEffect(() => {
        let animationFrameId = 0;
        const startedAt = performance.now();

        const animateMoons = (now: number) => {
            const elapsedMs = now - startedAt;

            moonMotion.forEach((motion) => {
                const moonNode = moonNodesRef.current[motion.key];

                if (moonNode) {
                    applyMoonFrame(moonNode, elapsedMs, motion);
                }
            });

            animationFrameId = window.requestAnimationFrame(animateMoons);
        };

        animationFrameId = window.requestAnimationFrame(animateMoons);

        return () => window.cancelAnimationFrame(animationFrameId);
    }, [moonMotion]);

    return moonNodesRef;
};
