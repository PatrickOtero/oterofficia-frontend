import type { RobotProjectionTarget } from "./types";
import type { ProjectionTargetSelectors, ProjectionVisualPreset } from "./robotProjection.types";

export const projectionTargetSelectors: ProjectionTargetSelectors = {
    none: [],
    home: [".initial-menu-main"],
    about: [".aboutme-page-main"],
    portfolio: [".portfolio-page-main", ".content-stage"],
    auth: [".auth-scene-panel"],
    content: [".content-main", ".content-stage"],
};

export const projectionHotspotMap: Record<RobotProjectionTarget, { x: number; y: number }> = {
    none: { x: 0.5, y: 0.5 },
    home: { x: 0.5, y: 0.5 },
    about: { x: 0.5, y: 0.5 },
    portfolio: { x: 0.5, y: 0.5 },
    auth: { x: 0.5, y: 0.5 },
    content: { x: 0.5, y: 0.5 },
};

export const projectionMap: Record<RobotProjectionTarget, ProjectionVisualPreset> = {
    none: {
        angle: "0deg",
        length: "0rem",
        eyeScale: "1",
        eyeShiftX: "0rem",
        eyeShiftY: "0rem",
        visorScale: "1",
        visorShiftX: "0rem",
        visorShiftY: "0rem",
        visorTilt: "0deg",
    },
    home: {
        angle: "20deg",
        length: "59rem",
        eyeScale: "0.64",
        eyeShiftX: "-0.28rem",
        eyeShiftY: "0rem",
        visorScale: "0.78",
        visorShiftX: "-0.82rem",
        visorShiftY: "0rem",
        visorTilt: "-10deg",
    },
    about: {
        angle: "33deg",
        length: "47rem",
        eyeScale: "0.62",
        eyeShiftX: "-0.3rem",
        eyeShiftY: "-0.06rem",
        visorScale: "0.76",
        visorShiftX: "-0.88rem",
        visorShiftY: "-0.08rem",
        visorTilt: "-11deg",
    },
    portfolio: {
        angle: "35deg",
        length: "45rem",
        eyeScale: "0.62",
        eyeShiftX: "-0.28rem",
        eyeShiftY: "-0.04rem",
        visorScale: "0.77",
        visorShiftX: "-0.84rem",
        visorShiftY: "-0.04rem",
        visorTilt: "-10deg",
    },
    auth: {
        angle: "37deg",
        length: "42rem",
        eyeScale: "0.64",
        eyeShiftX: "-0.26rem",
        eyeShiftY: "-0.04rem",
        visorScale: "0.78",
        visorShiftX: "-0.78rem",
        visorShiftY: "-0.04rem",
        visorTilt: "-9deg",
    },
    content: {
        angle: "58deg",
        length: "25rem",
        eyeScale: "0.6",
        eyeShiftX: "-0.2rem",
        eyeShiftY: "-0.14rem",
        visorScale: "0.78",
        visorShiftX: "-0.5rem",
        visorShiftY: "-0.34rem",
        visorTilt: "-7deg",
    },
};
