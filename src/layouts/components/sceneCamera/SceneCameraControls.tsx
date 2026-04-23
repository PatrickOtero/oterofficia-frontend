import { CrosshairSimple, GameController, ArrowsOutCardinal } from "phosphor-react";
import { SCENE_CAMERA_PRESETS } from "../../../features/sceneCamera/sceneCamera.presets";
import { useSceneCameraContext } from "../../../hooks/useSceneCameraContext";
import { SceneCameraHudContainer } from "./styles";

export const SceneCameraControls = () => {
    const { applyPreset, camera, isManualMode, presetOrder, resetView, toggleManualMode } = useSceneCameraContext();

    return (
        <SceneCameraHudContainer>
            <div className="scene-camera-panel">
                <div className="scene-camera-panel-header">
                    <span className="scene-camera-panel-label">Visao da cena</span>
                    <button className="scene-camera-reset" onClick={resetView} type="button">
                        <CrosshairSimple size={16} weight="bold" />
                        Resetar visao
                    </button>
                </div>

                <div className="scene-camera-presets" role="toolbar" aria-label="Presets de visao da cena">
                    {presetOrder.map((presetId) => {
                        const preset = SCENE_CAMERA_PRESETS[presetId];
                        const isActive = camera.activePreset === presetId;

                        return (
                            <button
                                aria-pressed={isActive}
                                className={`scene-camera-chip${isActive ? " active" : ""}`}
                                key={presetId}
                                onClick={() => applyPreset(presetId)}
                                title={preset.description}
                                type="button"
                            >
                                {preset.label}
                            </button>
                        );
                    })}
                </div>

                <div className="scene-camera-actions">
                    <button
                        aria-pressed={isManualMode}
                        className={`scene-camera-toggle${isManualMode ? " active" : ""}`}
                        onClick={toggleManualMode}
                        type="button"
                    >
                        <GameController size={16} weight="bold" />
                        {isManualMode ? "Sair do controle" : "Pilotar cenario"}
                    </button>

                    <div className="scene-camera-readout" aria-live="polite">
                        <ArrowsOutCardinal size={15} weight="bold" />
                        <span>
                            X {Math.round(camera.x)} | Y {Math.round(camera.y)} | Z {camera.z.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {isManualMode ? (
                <div className="scene-camera-manual-hint" role="status">
                    <span className="scene-camera-hint-title">Controles ativos</span>
                    <span>A/D ou setas: mover</span>
                    <span>W/S: subir e descer</span>
                    <span>Q/E: aproximar e afastar</span>
                    <span>R: resetar | Esc: sair</span>
                </div>
            ) : null}
        </SceneCameraHudContainer>
    );
};
