import type { ReactNode } from "react";

export type RobotSceneSlot =
    | "home-center"
    | "home-docked"
    | "home-returning"
    | "content-entering"
    | "content-docked";

export type RobotAttentionTarget = "center" | "left" | "right";

export type RobotProjectionTarget = "none" | "home" | "about" | "portfolio" | "auth" | "content";

export type RobotMotionIntent =
    | "idle"
    | "turn-left"
    | "turn-right"
    | "strafe-left"
    | "strafe-right";

export type RoundRobotSceneProps = {
    slot: RobotSceneSlot;
    interactive?: boolean;
    attentionTarget?: RobotAttentionTarget;
    motionIntent?: RobotMotionIntent;
    projectionTarget?: RobotProjectionTarget;
    activationKey?: number;
    onActivate?: () => void;
    onHoverChange?: (hovered: boolean) => void;
    children?: ReactNode;
};

export type RoundRobotProps = {
    attentionTarget?: RobotAttentionTarget;
    motionIntent?: RobotMotionIntent;
    projectionTarget?: RobotProjectionTarget;
    hovered: boolean;
    activated: boolean;
    interactive?: boolean;
};
