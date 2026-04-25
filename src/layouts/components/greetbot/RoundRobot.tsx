import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { OrbitalTurbines } from "./OrbitalTurbines";
import { RobotFigure } from "./styles";
import { attentionOffsetMap, bodyShiftMap, bodyTiltMap } from "./robotMotion.constants";
import { projectionHotspotMap, projectionMap, projectionTargetSelectors } from "./robotProjection.constants";
import type { ProjectionStyleState } from "./robotProjection.types";
import { createDefaultProjectionStyle, resolveProjectedBeamLength } from "./robotProjection.utils";
import type { RoundRobotProps } from "./types";

export const RoundRobot = ({
    attentionTarget = "center",
    motionIntent = "idle",
    projectionTarget = "none",
    hovered,
    activated,
    interactive = true,
}: RoundRobotProps) => {
    const projectorAnchorRef = useRef<HTMLDivElement | null>(null);
    const projection = projectionMap[projectionTarget];
    const [projectionStyle, setProjectionStyle] = useState<ProjectionStyleState>(
        createDefaultProjectionStyle(projection)
    );

    useEffect(() => {
        setProjectionStyle(createDefaultProjectionStyle(projection));
    }, [
        projection.angle,
        projection.eyeScale,
        projection.eyeShiftX,
        projection.eyeShiftY,
        projection.length,
        projectionTarget,
        projection.visorScale,
        projection.visorShiftX,
        projection.visorShiftY,
        projection.visorTilt,
        projection,
    ]);

    useLayoutEffect(() => {
        if (projectionTarget === "none") {
            return;
        }

        let animationFrameId = 0;
        let stabilizationFrame = 0;
        let resizeObserver: ResizeObserver | null = null;

        const readTargetElement = () => {
            for (const selector of projectionTargetSelectors[projectionTarget]) {
                const element = document.querySelector(selector);

                if (element instanceof HTMLElement) {
                    return element;
                }
            }

            return null;
        };

        const updateProjection = () => {
            const projectorAnchor = projectorAnchorRef.current;
            const targetElement = readTargetElement();
            const sceneHost =
                projectorAnchor?.closest(".robot-scene-roamer") instanceof HTMLElement
                    ? projectorAnchor.closest(".robot-scene-roamer")
                    : null;

            if (!projectorAnchor || !targetElement || !sceneHost) {
                if (stabilizationFrame < 180) {
                    stabilizationFrame += 1;
                    animationFrameId = window.requestAnimationFrame(updateProjection);
                }

                return;
            }

            const anchorRect = projectorAnchor.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();
            const sceneHostRect = sceneHost.getBoundingClientRect();
            const anchorCenterX = anchorRect.left + anchorRect.width / 2;
            const anchorCenterY = anchorRect.top + anchorRect.height / 2;
            const hotspot = projectionHotspotMap[projectionTarget];
            const targetPointX = targetRect.left + targetRect.width * hotspot.x;
            const targetPointY = targetRect.top + targetRect.height * hotspot.y;
            const deltaX = targetPointX - anchorCenterX;
            const deltaY = targetPointY - anchorCenterY;
            const distance = Math.hypot(deltaX, deltaY);

            if (!distance) {
                return;
            }

            const normalizedX = deltaX / distance;
            const normalizedY = deltaY / distance;
            const nextBeamAngle = `${(Math.atan2(deltaY, deltaX) * 180) / Math.PI}deg`;
            const nextBeamLength = `${resolveProjectedBeamLength({
                anchorX: anchorCenterX,
                anchorY: anchorCenterY,
                targetX: targetPointX,
                targetY: targetPointY,
                targetRect,
            })}px`;
            const nextEyeShiftX = `${Math.max(-0.46, Math.min(0.46, normalizedX * 0.38))}rem`;
            const nextEyeShiftY = `${Math.max(-0.2, Math.min(0.2, normalizedY * 0.16))}rem`;
            const nextVisorShiftX = `${Math.max(-1.12, Math.min(1.12, normalizedX * 0.98))}rem`;
            const nextVisorShiftY = `${Math.max(-0.56, Math.min(0.56, normalizedY * 0.48))}rem`;
            const nextVisorTilt = `${Math.max(-15, Math.min(15, normalizedX * 12 + normalizedY * 5))}deg`;

            setProjectionStyle((current) => {
                const nextState = {
                    beamOriginX: `${anchorCenterX - sceneHostRect.left}px`,
                    beamOriginY: `${anchorCenterY - sceneHostRect.top}px`,
                    beamAngle: nextBeamAngle,
                    beamLength: nextBeamLength,
                    eyeScale: projection.eyeScale,
                    eyeShiftX: nextEyeShiftX,
                    eyeShiftY: nextEyeShiftY,
                    visorScale: projection.visorScale,
                    visorShiftX: nextVisorShiftX,
                    visorShiftY: nextVisorShiftY,
                    visorTilt: nextVisorTilt,
                };

                return current.beamOriginX === nextState.beamOriginX &&
                    current.beamOriginY === nextState.beamOriginY &&
                    current.beamAngle === nextState.beamAngle &&
                    current.beamLength === nextState.beamLength &&
                    current.eyeScale === nextState.eyeScale &&
                    current.eyeShiftX === nextState.eyeShiftX &&
                    current.eyeShiftY === nextState.eyeShiftY &&
                    current.visorScale === nextState.visorScale &&
                    current.visorShiftX === nextState.visorShiftX &&
                    current.visorShiftY === nextState.visorShiftY &&
                    current.visorTilt === nextState.visorTilt
                    ? current
                    : nextState;
            });

            if (stabilizationFrame < 180) {
                stabilizationFrame += 1;
                animationFrameId = window.requestAnimationFrame(updateProjection);
            }

            if (!resizeObserver) {
                resizeObserver = new ResizeObserver(() => {
                    window.requestAnimationFrame(updateProjection);
                });
                resizeObserver.observe(projectorAnchor);
                resizeObserver.observe(targetElement);
            }
        };

        const handleViewportChange = () => {
            window.requestAnimationFrame(updateProjection);
        };

        window.addEventListener("resize", handleViewportChange);
        window.addEventListener("scroll", handleViewportChange, true);
        updateProjection();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleViewportChange);
            window.removeEventListener("scroll", handleViewportChange, true);
            resizeObserver?.disconnect();
        };
    }, [
        projection.eyeScale,
        projection.eyeShiftX,
        projection.eyeShiftY,
        projection.visorScale,
        projectionTarget,
    ]);

    const visualStyle =
        {
            "--face-offset": attentionOffsetMap[attentionTarget],
            "--body-tilt": bodyTiltMap[motionIntent],
            "--body-shift": bodyShiftMap[motionIntent],
            "--beam-origin-x": projectionStyle.beamOriginX,
            "--beam-origin-y": projectionStyle.beamOriginY,
            "--beam-angle": projectionStyle.beamAngle,
            "--beam-length": projectionStyle.beamLength,
            "--eye-scale": projectionStyle.eyeScale,
            "--eye-shift-x": projectionStyle.eyeShiftX,
            "--eye-shift-y": projectionStyle.eyeShiftY,
            "--visor-scale": projectionStyle.visorScale,
            "--visor-shift-x": projectionStyle.visorShiftX,
            "--visor-shift-y": projectionStyle.visorShiftY,
            "--visor-tilt": projectionStyle.visorTilt,
        } as CSSProperties;

    return (
        <RobotFigure
            $activated={activated}
            $hovered={hovered}
            $interactive={interactive}
            $projecting={projectionTarget !== "none"}
            style={visualStyle}
        >
            <div className="robot-hologram-overlay" aria-hidden="true">
                <span className="robot-hologram-beam robot-hologram-beam-outer" />
                <span className="robot-hologram-beam robot-hologram-beam-inner" />
                <span className="robot-hologram-origin" />
            </div>
            <div className="robot-shadow" aria-hidden="true" />
            <div className="robot-float-shell">
                <OrbitalTurbines hovered={hovered} />

                <div className="robot-body" aria-hidden="true">
                    <div className="robot-body-aura" />
                    <div className="robot-body-shell">
                        <div className="robot-body-rim" />
                        <div className="robot-body-core" />
                        <div className="robot-body-highlight" />
                        <div className="robot-body-bottom-glow" />

                        <div className="robot-visor">
                            <div className="robot-visor-glass">
                                <span className={`robot-visor-eye ${projectionTarget !== "none" ? "projecting" : ""}`} />
                                <span className="robot-visor-scan" />
                            </div>
                            <div className="robot-visor-projector">
                                <div className="robot-visor-projector-anchor" ref={projectorAnchorRef} />
                            </div>
                        </div>

                        <div className="robot-sensor robot-sensor-left" />
                        <div className="robot-sensor robot-sensor-right" />
                        <div className="robot-top-halo" />
                    </div>
                </div>
            </div>
        </RobotFigure>
    );
};
