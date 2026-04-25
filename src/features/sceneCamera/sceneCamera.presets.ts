import type { SpaceTheme } from "../../layouts/components/greetbot/spaceThemes";
import type { SceneCameraPreset, SceneCameraPresetId, SceneCameraVector } from "./sceneCamera.types";

export const SCENE_CAMERA_LIMITS = {
    x: { max: 280, min: -280 },
    y: { max: 360, min: -360 },
    z: { max: 1.26, min: 0.34 },
} as const;

export const DEFAULT_SCENE_CAMERA_PRESET_ID: SceneCameraPresetId = "default";

export const SCENE_CAMERA_PRESETS: Record<SceneCameraPresetId, SceneCameraPreset> = {
    default: {
        description: "Visão equilibrada da cena principal.",
        id: "default",
        label: "Padrão",
        value: { x: 0, y: -88, z: 1 },
    },
    "planet-full": {
        description: "Mostra o planeta inteiro com enquadramento estável e sem arremessar a cena para o topo.",
        id: "planet-full",
        label: "Planeta inteiro",
        value: { x: 0, y: 88, z: 0.52 },
    },
    "close-up": {
        description: "Aproxima a cena sem deformar o enquadramento do planeta.",
        id: "close-up",
        label: "Aproximado",
        value: { x: 0, y: -18, z: 1.1 },
    },
    "wide-orbit": {
        description: "Abre a cena para mostrar o planeta inteiro junto da extensão das órbitas.",
        id: "wide-orbit",
        label: "Órbita ampla",
        value: { x: 0, y: 18, z: 0.4 },
    },
    centered: {
        description: "Reposiciona a cena para um enquadramento mais equilibrado e central.",
        id: "centered",
        label: "Centralizado",
        value: { x: 0, y: 170, z: 0.72 },
    },
};

const compactBodyPreset: Record<SceneCameraPresetId, SceneCameraVector> = {
    default: { x: 0, y: -84, z: 1 },
    "planet-full": { x: 0, y: 98, z: 0.56 },
    "close-up": { x: 0, y: -20, z: 1.12 },
    "wide-orbit": { x: 0, y: 20, z: 0.44 },
    centered: { x: 0, y: 168, z: 0.72 },
};

const SCENE_CAMERA_THEME_PRESET_VALUES: Partial<Record<SpaceTheme, Record<SceneCameraPresetId, SceneCameraVector>>> = {
    mercury: compactBodyPreset,
    venus: compactBodyPreset,
    earth: {
        default: { x: 0, y: -92, z: 1 },
        "planet-full": { x: 0, y: 94, z: 0.52 },
        "close-up": { x: 0, y: -22, z: 1.1 },
        "wide-orbit": { x: 0, y: 18, z: 0.4 },
        centered: { x: 0, y: 176, z: 0.72 },
    },
    mars: {
        default: { x: 0, y: -86, z: 1 },
        "planet-full": { x: 0, y: 90, z: 0.52 },
        "close-up": { x: 0, y: -18, z: 1.08 },
        "wide-orbit": { x: 0, y: 16, z: 0.4 },
        centered: { x: 0, y: 170, z: 0.72 },
    },
    jupiter: {
        default: { x: 0, y: -108, z: 1 },
        "planet-full": { x: 0, y: 72, z: 0.48 },
        "close-up": { x: 0, y: -24, z: 1.06 },
        "wide-orbit": { x: 0, y: 34, z: 0.37 },
        centered: { x: 0, y: 150, z: 0.68 },
    },
    saturn: {
        default: { x: 0, y: -82, z: 1 },
        "planet-full": { x: 0, y: 68, z: 0.44 },
        "close-up": { x: 0, y: -16, z: 1.02 },
        "wide-orbit": { x: 0, y: 22, z: 0.33 },
        centered: { x: 0, y: 132, z: 0.64 },
    },
    uranus: {
        default: { x: 0, y: -86, z: 1 },
        "planet-full": { x: 0, y: 84, z: 0.5 },
        "close-up": { x: 0, y: -20, z: 1.08 },
        "wide-orbit": { x: 0, y: 18, z: 0.38 },
        centered: { x: 0, y: 154, z: 0.68 },
    },
    neptune: {
        default: { x: 0, y: -88, z: 1 },
        "planet-full": { x: 0, y: 84, z: 0.5 },
        "close-up": { x: 0, y: -22, z: 1.08 },
        "wide-orbit": { x: 0, y: 18, z: 0.38 },
        centered: { x: 0, y: 154, z: 0.68 },
    },
    ceres: compactBodyPreset,
    pluto: compactBodyPreset,
    haumea: compactBodyPreset,
    makemake: compactBodyPreset,
    eris: compactBodyPreset,
    space: {
        default: { x: 0, y: 0, z: 1 },
        "planet-full": { x: 0, y: 0, z: 0.82 },
        "close-up": { x: 0, y: 0, z: 1.18 },
        "wide-orbit": { x: 0, y: 0, z: 0.62 },
        centered: { x: 0, y: 0, z: 0.9 },
    },
    asteroids: {
        default: { x: 0, y: 0, z: 1 },
        "planet-full": { x: 0, y: 0, z: 0.82 },
        "close-up": { x: 0, y: 0, z: 1.18 },
        "wide-orbit": { x: 0, y: 0, z: 0.62 },
        centered: { x: 0, y: 0, z: 0.9 },
    },
};

export const SCENE_CAMERA_PRESET_ORDER: SceneCameraPresetId[] = [
    "default",
    "planet-full",
    "close-up",
    "wide-orbit",
    "centered",
];

export const getSceneCameraPresetValue = (
    presetId: SceneCameraPresetId,
    spaceTheme: SpaceTheme = "earth"
): SceneCameraVector => SCENE_CAMERA_THEME_PRESET_VALUES[spaceTheme]?.[presetId] || SCENE_CAMERA_PRESETS[presetId].value;

export const getSceneCameraPresetLabel = (presetId: SceneCameraPresetId) =>
    SCENE_CAMERA_PRESETS[presetId].label;

export const getNextSceneCameraPresetId = (presetId: SceneCameraPresetId): SceneCameraPresetId => {
    const currentIndex = SCENE_CAMERA_PRESET_ORDER.indexOf(presetId);

    if (currentIndex === -1) {
        return DEFAULT_SCENE_CAMERA_PRESET_ID;
    }

    return SCENE_CAMERA_PRESET_ORDER[(currentIndex + 1) % SCENE_CAMERA_PRESET_ORDER.length];
};

export const getPreviousSceneCameraPresetId = (presetId: SceneCameraPresetId): SceneCameraPresetId => {
    const currentIndex = SCENE_CAMERA_PRESET_ORDER.indexOf(presetId);

    if (currentIndex === -1) {
        return DEFAULT_SCENE_CAMERA_PRESET_ID;
    }

    return SCENE_CAMERA_PRESET_ORDER[
        (currentIndex - 1 + SCENE_CAMERA_PRESET_ORDER.length) % SCENE_CAMERA_PRESET_ORDER.length
    ];
};
