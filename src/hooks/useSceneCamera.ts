import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    DEFAULT_SCENE_CAMERA_PRESET_ID,
    SCENE_CAMERA_PRESET_ORDER,
    getSceneCameraPresetValue,
} from "../features/sceneCamera/sceneCamera.presets";
import type {
    SceneCameraInputState,
    SceneCameraPresetId,
    SceneCameraState,
    SceneCameraVector,
} from "../features/sceneCamera/sceneCamera.types";
import {
    clamp,
    clampSceneCameraVector,
    damp,
    isEditableTarget,
    roundSceneCameraValue,
} from "../features/sceneCamera/sceneCamera.utils";
import { useBotFunctionsContext } from "./useBotFunctionsContext";

const MOVE_SPEED = 248;
const ZOOM_SPEED = 0.34;
const CAMERA_SMOOTHING = 8.8;
const INPUT_SMOOTHING = 11.2;
const MOBILE_CAMERA_QUERY = "(max-width: 640px)";
const CAMERA_STATE_COMMIT_INTERVAL_MS = 90;
const CAMERA_SETTLE_EPSILON = 0.025;
const INPUT_SETTLE_EPSILON = 0.01;

const CONTROLLED_KEYS = new Set([
    "a",
    "d",
    "w",
    "s",
    "q",
    "e",
    "arrowleft",
    "arrowright",
    "arrowup",
    "arrowdown",
    "r",
    "escape",
]);

type SceneCameraController = {
    applyPreset: (presetId: SceneCameraPresetId) => void;
    camera: SceneCameraState;
    exitManualMode: () => void;
    inputState: SceneCameraInputState;
    isManualMode: boolean;
    presetOrder: SceneCameraPresetId[];
    resetView: () => void;
    startManualMode: () => void;
    toggleManualMode: () => void;
};

const initialInputState: SceneCameraInputState = {
    thrust: 0,
    x: 0,
    y: 0,
    z: 0,
};

const getIsCompactSceneViewport = () =>
    typeof window !== "undefined" && window.matchMedia(MOBILE_CAMERA_QUERY).matches;

export const useSceneCamera = (): SceneCameraController => {
    const { spaceTheme } = useBotFunctionsContext();
    const [isCompactViewport, setIsCompactViewport] = useState(getIsCompactSceneViewport);
    const initialCamera = getSceneCameraPresetValue(DEFAULT_SCENE_CAMERA_PRESET_ID, spaceTheme, isCompactViewport);
    const [camera, setCamera] = useState<SceneCameraState>({
        ...initialCamera,
        activePreset: DEFAULT_SCENE_CAMERA_PRESET_ID,
        mode: "preset",
    });
    const [inputState, setInputState] = useState<SceneCameraInputState>(initialInputState);
    const cameraRef = useRef<SceneCameraVector>(initialCamera);
    const targetCameraRef = useRef<SceneCameraVector>(initialCamera);
    const inputStateRef = useRef<SceneCameraInputState>(initialInputState);
    const manualModeRef = useRef(false);
    const activePresetRef = useRef<SceneCameraPresetId | null>(DEFAULT_SCENE_CAMERA_PRESET_ID);
    const pressedKeysRef = useRef<Set<string>>(new Set());
    const documentCameraVarsRef = useRef<Record<string, string>>({});
    const scheduleCameraFrameRef = useRef<() => void>(() => undefined);

    const syncDocumentCameraVars = useCallback((nextCamera: SceneCameraVector, nextInputState: SceneCameraInputState) => {
        if (typeof document === "undefined") {
            return;
        }

        const rootStyle = document.documentElement.style;
        const nextVars = {
            "--scene-camera-x": `${roundSceneCameraValue(nextCamera.x)}px`,
            "--scene-camera-y": `${roundSceneCameraValue(nextCamera.y)}px`,
            "--scene-camera-zoom": `${roundSceneCameraValue(nextCamera.z)}`,
            "--scene-pilot-x": `${roundSceneCameraValue(nextInputState.x)}`,
            "--scene-pilot-y": `${roundSceneCameraValue(nextInputState.y)}`,
            "--scene-pilot-z": `${roundSceneCameraValue(nextInputState.z)}`,
            "--scene-pilot-thrust": `${roundSceneCameraValue(nextInputState.thrust)}`,
        };

        Object.entries(nextVars).forEach(([property, value]) => {
            if (documentCameraVarsRef.current[property] === value) {
                return;
            }

            documentCameraVarsRef.current[property] = value;
            rootStyle.setProperty(property, value);
        });
    }, []);

    const commitCameraState = useCallback(
        (
            nextCamera: SceneCameraVector,
            nextInputState: SceneCameraInputState,
            options?: { activePreset?: SceneCameraPresetId | null; manualMode?: boolean }
        ) => {
            const nextManualMode = options?.manualMode ?? manualModeRef.current;
            const nextActivePreset = options?.activePreset ?? activePresetRef.current;

            setCamera({
                ...nextCamera,
                activePreset: nextActivePreset,
                mode: nextManualMode ? "manual" : "preset",
            });
            setInputState(nextInputState);
        },
        []
    );

    const updateTargetCamera = useCallback(
        (
            nextTargetCamera: SceneCameraVector,
            options?: { activePreset?: SceneCameraPresetId | null; manualMode?: boolean; syncCurrent?: boolean }
        ) => {
            const clampedTarget = clampSceneCameraVector(nextTargetCamera);
            const nextManualMode = options?.manualMode ?? manualModeRef.current;
            const nextActivePreset = options?.activePreset ?? activePresetRef.current;

            targetCameraRef.current = clampedTarget;
            manualModeRef.current = nextManualMode;
            activePresetRef.current = nextActivePreset;

            if (options?.syncCurrent) {
                cameraRef.current = clampedTarget;
                syncDocumentCameraVars(clampedTarget, inputStateRef.current);
                commitCameraState(clampedTarget, inputStateRef.current, {
                    activePreset: nextActivePreset,
                    manualMode: nextManualMode,
                });
            } else {
                setCamera((currentState) => ({
                    ...currentState,
                    activePreset: nextActivePreset,
                    mode: nextManualMode ? "manual" : "preset",
                }));
            }

            scheduleCameraFrameRef.current();
        },
        [commitCameraState, syncDocumentCameraVars]
    );

    const applyPreset = useCallback(
        (presetId: SceneCameraPresetId) => {
            pressedKeysRef.current.clear();
            updateTargetCamera(getSceneCameraPresetValue(presetId, spaceTheme, isCompactViewport), {
                activePreset: presetId,
                manualMode: false,
            });
        },
        [isCompactViewport, spaceTheme, updateTargetCamera]
    );

    const resetView = useCallback(() => {
        applyPreset(DEFAULT_SCENE_CAMERA_PRESET_ID);
    }, [applyPreset]);

    const startManualMode = useCallback(() => {
        manualModeRef.current = true;
        setCamera((currentState) => ({
            ...currentState,
            mode: "manual",
        }));
        scheduleCameraFrameRef.current();
    }, []);

    const exitManualMode = useCallback(() => {
        pressedKeysRef.current.clear();
        manualModeRef.current = false;
        targetCameraRef.current = cameraRef.current;
        setCamera((currentState) => ({
            ...currentState,
            mode: "preset",
        }));
        scheduleCameraFrameRef.current();
    }, []);

    const toggleManualMode = useCallback(() => {
        if (manualModeRef.current) {
            exitManualMode();
            return;
        }

        startManualMode();
    }, [exitManualMode, startManualMode]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const mediaQuery = window.matchMedia(MOBILE_CAMERA_QUERY);
        const syncCompactViewport = () => setIsCompactViewport(mediaQuery.matches);

        syncCompactViewport();
        mediaQuery.addEventListener("change", syncCompactViewport);

        return () => {
            mediaQuery.removeEventListener("change", syncCompactViewport);
        };
    }, []);

    useEffect(() => {
        if (manualModeRef.current || !activePresetRef.current) {
            return;
        }

        updateTargetCamera(getSceneCameraPresetValue(activePresetRef.current, spaceTheme, isCompactViewport), {
            activePreset: activePresetRef.current,
            manualMode: false,
        });
    }, [isCompactViewport, spaceTheme, updateTargetCamera]);

    useEffect(() => {
        syncDocumentCameraVars(cameraRef.current, inputStateRef.current);

        let animationFrameId = 0;
        let previousTimestamp = 0;
        let lastStateCommitAt = 0;
        let hasCommittedSettledState = false;

        const scheduleTick = () => {
            if (animationFrameId) {
                return;
            }

            animationFrameId = window.requestAnimationFrame(tick);
        };

        function tick(timestamp: number) {
            animationFrameId = 0;

            if (!previousTimestamp) {
                previousTimestamp = timestamp;
            }

            const deltaSeconds = clamp((timestamp - previousTimestamp) / 1000, 0.001, 0.05);
            previousTimestamp = timestamp;

            const nextTargetCamera = { ...targetCameraRef.current };
            let inputX = 0;
            let inputY = 0;
            let inputZ = 0;

            if (manualModeRef.current) {
                if (pressedKeysRef.current.has("a") || pressedKeysRef.current.has("arrowleft")) {
                    inputX -= 1;
                }

                if (pressedKeysRef.current.has("d") || pressedKeysRef.current.has("arrowright")) {
                    inputX += 1;
                }

                if (pressedKeysRef.current.has("w") || pressedKeysRef.current.has("arrowup")) {
                    inputY -= 1;
                }

                if (pressedKeysRef.current.has("s") || pressedKeysRef.current.has("arrowdown")) {
                    inputY += 1;
                }

                if (pressedKeysRef.current.has("q")) {
                    inputZ += 1;
                }

                if (pressedKeysRef.current.has("e")) {
                    inputZ -= 1;
                }

                const planarMagnitude = Math.hypot(inputX, inputY);

                if (planarMagnitude > 1) {
                    inputX /= planarMagnitude;
                    inputY /= planarMagnitude;
                }

                nextTargetCamera.x += inputX * MOVE_SPEED * deltaSeconds;
                nextTargetCamera.y += inputY * MOVE_SPEED * deltaSeconds;
                nextTargetCamera.z += inputZ * ZOOM_SPEED * deltaSeconds;
                targetCameraRef.current = clampSceneCameraVector(nextTargetCamera);

                if ((inputX !== 0 || inputY !== 0 || inputZ !== 0) && activePresetRef.current) {
                    activePresetRef.current = null;
                    setCamera((currentState) => ({
                        ...currentState,
                        activePreset: null,
                    }));
                }
            }

            const nextCamera: SceneCameraVector = {
                x: damp(cameraRef.current.x, targetCameraRef.current.x, CAMERA_SMOOTHING, deltaSeconds),
                y: damp(cameraRef.current.y, targetCameraRef.current.y, CAMERA_SMOOTHING, deltaSeconds),
                z: damp(cameraRef.current.z, targetCameraRef.current.z, CAMERA_SMOOTHING, deltaSeconds),
            };

            const nextInputState: SceneCameraInputState = {
                x: damp(inputStateRef.current.x, inputX, INPUT_SMOOTHING, deltaSeconds),
                y: damp(inputStateRef.current.y, inputY, INPUT_SMOOTHING, deltaSeconds),
                z: damp(inputStateRef.current.z, inputZ, INPUT_SMOOTHING, deltaSeconds),
                thrust: 0,
            };

            nextInputState.thrust = clamp(
                Math.max(Math.abs(nextInputState.x), Math.abs(nextInputState.y), Math.abs(nextInputState.z)) * 0.94,
                0,
                1
            );

            cameraRef.current = nextCamera;
            inputStateRef.current = nextInputState;
            syncDocumentCameraVars(nextCamera, nextInputState);

            const cameraDistance =
                Math.abs(nextCamera.x - targetCameraRef.current.x) +
                Math.abs(nextCamera.y - targetCameraRef.current.y) +
                Math.abs(nextCamera.z - targetCameraRef.current.z);
            const inputDistance =
                Math.abs(nextInputState.x) +
                Math.abs(nextInputState.y) +
                Math.abs(nextInputState.z) +
                Math.abs(nextInputState.thrust);
            const isSettled = cameraDistance < CAMERA_SETTLE_EPSILON && inputDistance < INPUT_SETTLE_EPSILON;
            const shouldCommitState =
                timestamp - lastStateCommitAt >= CAMERA_STATE_COMMIT_INTERVAL_MS ||
                (isSettled && !hasCommittedSettledState);

            if (shouldCommitState) {
                lastStateCommitAt = timestamp;
                hasCommittedSettledState = isSettled;
                commitCameraState(nextCamera, nextInputState);
            }

            if (!isSettled) {
                hasCommittedSettledState = false;
            }

            if (!isSettled || pressedKeysRef.current.size > 0) {
                scheduleTick();
                return;
            }

            previousTimestamp = 0;
        }

        scheduleCameraFrameRef.current = scheduleTick;
        scheduleTick();

        return () => {
            scheduleCameraFrameRef.current = () => undefined;
            window.cancelAnimationFrame(animationFrameId);

            if (typeof document !== "undefined") {
                const rootStyle = document.documentElement.style;
                rootStyle.removeProperty("--scene-camera-x");
                rootStyle.removeProperty("--scene-camera-y");
                rootStyle.removeProperty("--scene-camera-zoom");
                rootStyle.removeProperty("--scene-pilot-x");
                rootStyle.removeProperty("--scene-pilot-y");
                rootStyle.removeProperty("--scene-pilot-z");
                rootStyle.removeProperty("--scene-pilot-thrust");
                documentCameraVarsRef.current = {};
            }
        };
    }, [commitCameraState, syncDocumentCameraVars]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const normalizedKey = event.key.toLowerCase();

            if (!CONTROLLED_KEYS.has(normalizedKey)) {
                return;
            }

            if (!manualModeRef.current || isEditableTarget(event.target)) {
                return;
            }

            if (normalizedKey === "escape") {
                event.preventDefault();
                exitManualMode();
                return;
            }

            if (normalizedKey === "r") {
                event.preventDefault();
                targetCameraRef.current = getSceneCameraPresetValue(
                    DEFAULT_SCENE_CAMERA_PRESET_ID,
                    spaceTheme,
                    isCompactViewport
                );
                activePresetRef.current = DEFAULT_SCENE_CAMERA_PRESET_ID;
                setCamera((currentState) => ({
                    ...currentState,
                    activePreset: DEFAULT_SCENE_CAMERA_PRESET_ID,
                }));
                scheduleCameraFrameRef.current();
                return;
            }

            pressedKeysRef.current.add(normalizedKey);
            scheduleCameraFrameRef.current();
            event.preventDefault();
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            pressedKeysRef.current.delete(event.key.toLowerCase());
            scheduleCameraFrameRef.current();
        };

        const clearPressedKeys = () => {
            pressedKeysRef.current.clear();
            scheduleCameraFrameRef.current();
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", clearPressedKeys);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", clearPressedKeys);
        };
    }, [exitManualMode, isCompactViewport, spaceTheme]);

    return useMemo(
        () => ({
            applyPreset,
            camera,
            exitManualMode,
            inputState,
            isManualMode: camera.mode === "manual",
            presetOrder: SCENE_CAMERA_PRESET_ORDER,
            resetView,
            startManualMode,
            toggleManualMode,
        }),
        [applyPreset, camera, exitManualMode, inputState, resetView, startManualMode, toggleManualMode]
    );
};
