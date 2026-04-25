import type { RobotProjectionTarget } from "./types";

export type ProjectionBounds = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type ProjectionStyleState = {
    beamOriginX: string;
    beamOriginY: string;
    beamAngle: string;
    beamLength: string;
    eyeScale: string;
    eyeShiftX: string;
    eyeShiftY: string;
    visorScale: string;
    visorShiftX: string;
    visorShiftY: string;
    visorTilt: string;
};

export type ProjectionVisualPreset = Omit<
    ProjectionStyleState,
    "beamOriginX" | "beamOriginY" | "beamAngle" | "beamLength"
> & {
    angle: string;
    length: string;
};

export type ProjectionTargetSelectors = Record<RobotProjectionTarget, string[]>;
