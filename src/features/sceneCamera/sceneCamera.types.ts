export type SceneCameraMode = "preset" | "manual";

export type SceneCameraPresetId =
    | "default"
    | "planet-full"
    | "close-up"
    | "wide-orbit"
    | "centered";

export type SceneCameraVector = {
    x: number;
    y: number;
    z: number;
};

export type SceneCameraState = SceneCameraVector & {
    activePreset: SceneCameraPresetId | null;
    mode: SceneCameraMode;
};

export type SceneCameraPreset = {
    description: string;
    id: SceneCameraPresetId;
    label: string;
    value: SceneCameraVector;
};

export type SceneCameraInputState = {
    thrust: number;
    x: number;
    y: number;
    z: number;
};
