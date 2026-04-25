import type { RobotAttentionTarget, RobotMotionIntent } from "./types";

export const attentionOffsetMap: Record<RobotAttentionTarget, string> = {
    center: "0%",
    left: "-12%",
    right: "12%",
};

export const bodyTiltMap: Record<RobotMotionIntent, string> = {
    idle: "0deg",
    "turn-left": "-7deg",
    "turn-right": "7deg",
    "strafe-left": "-5deg",
    "strafe-right": "5deg",
};

export const bodyShiftMap: Record<RobotMotionIntent, string> = {
    idle: "0rem",
    "turn-left": "-0.18rem",
    "turn-right": "0.18rem",
    "strafe-left": "-0.68rem",
    "strafe-right": "0.68rem",
};
