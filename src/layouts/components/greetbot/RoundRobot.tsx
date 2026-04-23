import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { OrbitalTurbines } from "./OrbitalTurbines";
import { RobotFigure } from "./styles";
import type { RobotProjectionTarget, RoundRobotProps } from "./types";

const attentionOffsetMap = {
    center: "0%",
    left: "-12%",
    right: "12%",
} as const;

const bodyTiltMap = {
    idle: "0deg",
    "turn-left": "-7deg",
    "turn-right": "7deg",
    "strafe-left": "-5deg",
    "strafe-right": "5deg",
} as const;

const bodyShiftMap = {
    idle: "0rem",
    "turn-left": "-0.18rem",
    "turn-right": "0.18rem",
    "strafe-left": "-0.68rem",
    "strafe-right": "0.68rem",
} as const;

const projectionTargetSelectors: Record<RobotProjectionTarget, string[]> = {
    none: [],
    home: [".initial-menu-main"],
    about: [".aboutme-page-main"],
    portfolio: [".portfolio-page-main", ".content-stage"],
    auth: [".auth-scene-panel"],
    content: [".content-main", ".content-stage"],
};

const projectionHotspotMap: Record<RobotProjectionTarget, { x: number; y: number }> = {
    none: { x: 0.5, y: 0.5 },
    home: { x: 0.5, y: 0.5 },
    about: { x: 0.5, y: 0.5 },
    portfolio: { x: 0.5, y: 0.5 },
    auth: { x: 0.5, y: 0.5 },
    content: { x: 0.5, y: 0.5 },
};

type ProjectionBounds = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

const insetProjectionBounds = (rect: DOMRect, inset: number): ProjectionBounds => {
    const insetX = Math.max(0, Math.min(inset, rect.width / 2 - 1));
    const insetY = Math.max(0, Math.min(inset, rect.height / 2 - 1));

    return {
        left: rect.left + insetX,
        right: rect.right - insetX,
        top: rect.top + insetY,
        bottom: rect.bottom - insetY,
    };
};

const resolveProjectedBeamLength = ({
    anchorX,
    anchorY,
    targetX,
    targetY,
    targetRect,
}: {
    anchorX: number;
    anchorY: number;
    targetX: number;
    targetY: number;
    targetRect: DOMRect;
}) => {
    const deltaX = targetX - anchorX;
    const deltaY = targetY - anchorY;
    const distance = Math.hypot(deltaX, deltaY);

    if (!distance) {
        return 0;
    }

    const clippedBounds = insetProjectionBounds(
        targetRect,
        Math.min(10, Math.max(4, Math.min(targetRect.width, targetRect.height) * 0.02))
    );
    const intersections: number[] = [];

    const pushIntersection = (factor: number, coordinate: number, min: number, max: number) => {
        if (factor > 0 && factor < 1 && coordinate >= min && coordinate <= max) {
            intersections.push(factor);
        }
    };

    if (deltaX !== 0) {
        const leftFactor = (clippedBounds.left - anchorX) / deltaX;
        const rightFactor = (clippedBounds.right - anchorX) / deltaX;

        pushIntersection(leftFactor, anchorY + leftFactor * deltaY, clippedBounds.top, clippedBounds.bottom);
        pushIntersection(rightFactor, anchorY + rightFactor * deltaY, clippedBounds.top, clippedBounds.bottom);
    }

    if (deltaY !== 0) {
        const topFactor = (clippedBounds.top - anchorY) / deltaY;
        const bottomFactor = (clippedBounds.bottom - anchorY) / deltaY;

        pushIntersection(topFactor, anchorX + topFactor * deltaX, clippedBounds.left, clippedBounds.right);
        pushIntersection(bottomFactor, anchorX + bottomFactor * deltaX, clippedBounds.left, clippedBounds.right);
    }

    if (!intersections.length) {
        return distance;
    }

    return distance * Math.min(...intersections);
};

const projectionMap: Record<
    RobotProjectionTarget,
    {
        angle: string;
        length: string;
        eyeScale: string;
        eyeShiftX: string;
        eyeShiftY: string;
        visorScale: string;
        visorShiftX: string;
        visorShiftY: string;
        visorTilt: string;
    }
> = {
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

type ProjectionStyleState = {
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
    const [projectionStyle, setProjectionStyle] = useState<ProjectionStyleState>({
        beamOriginX: "-9999px",
        beamOriginY: "-9999px",
        beamAngle: projection.angle,
        beamLength: projection.length,
        eyeScale: projection.eyeScale,
        eyeShiftX: projection.eyeShiftX,
        eyeShiftY: projection.eyeShiftY,
        visorScale: projection.visorScale,
        visorShiftX: projection.visorShiftX,
        visorShiftY: projection.visorShiftY,
        visorTilt: projection.visorTilt,
    });

    useEffect(() => {
        setProjectionStyle({
            beamOriginX: "-9999px",
            beamOriginY: "-9999px",
            beamAngle: projection.angle,
            beamLength: projection.length,
            eyeScale: projection.eyeScale,
            eyeShiftX: projection.eyeShiftX,
            eyeShiftY: projection.eyeShiftY,
            visorScale: projection.visorScale,
            visorShiftX: projection.visorShiftX,
            visorShiftY: projection.visorShiftY,
            visorTilt: projection.visorTilt,
        });
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
