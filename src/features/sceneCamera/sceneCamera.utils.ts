import { SCENE_CAMERA_LIMITS } from "./sceneCamera.presets";
import type { SceneCameraVector } from "./sceneCamera.types";

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

export const damp = (current: number, target: number, smoothing: number, deltaSeconds: number) =>
    lerp(current, target, 1 - Math.exp(-smoothing * deltaSeconds));

export const clampSceneCameraVector = (camera: SceneCameraVector): SceneCameraVector => ({
    x: clamp(camera.x, SCENE_CAMERA_LIMITS.x.min, SCENE_CAMERA_LIMITS.x.max),
    y: clamp(camera.y, SCENE_CAMERA_LIMITS.y.min, SCENE_CAMERA_LIMITS.y.max),
    z: clamp(camera.z, SCENE_CAMERA_LIMITS.z.min, SCENE_CAMERA_LIMITS.z.max),
});

export const roundSceneCameraValue = (value: number, precision = 1000) =>
    Math.round(value * precision) / precision;

export const isEditableTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    const tagName = target.tagName.toLowerCase();

    if (tagName === "input" || tagName === "textarea" || tagName === "select") {
        return true;
    }

    return target.isContentEditable || Boolean(target.closest("[contenteditable='true']"));
};
