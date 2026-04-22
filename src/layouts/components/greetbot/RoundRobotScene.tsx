import { useEffect, useRef, useState } from "react";
import { RoundRobot } from "./RoundRobot";
import { RobotSceneContainer } from "./styles";
import type { RoundRobotSceneProps } from "./types";

export const RoundRobotScene = ({
    activationKey = 0,
    attentionTarget = "center",
    children,
    hoverable = false,
    interactive = true,
    motionIntent = "idle",
    projectionTarget = "none",
    onActivate,
    onHoverChange,
    slot,
}: RoundRobotSceneProps) => {
    const [hovered, setHovered] = useState(false);
    const [activated, setActivated] = useState(false);
    const activationTimeoutRef = useRef<number | null>(null);
    const canHover = interactive || hoverable;

    const triggerActivation = () => {
        setActivated(true);

        if (activationTimeoutRef.current) {
            window.clearTimeout(activationTimeoutRef.current);
        }

        activationTimeoutRef.current = window.setTimeout(() => {
            setActivated(false);
            activationTimeoutRef.current = null;
        }, 520);
    };

    useEffect(() => {
        if (canHover) {
            return;
        }

        setHovered(false);
    }, [canHover]);

    useEffect(() => {
        if (activationKey < 1) {
            return;
        }

        triggerActivation();
    }, [activationKey]);

    useEffect(
        () => () => {
            if (activationTimeoutRef.current) {
                window.clearTimeout(activationTimeoutRef.current);
            }
        },
        []
    );

    const handleActivate = () => {
        if (!interactive) {
            return;
        }

        triggerActivation();
        onActivate?.();
    };

    const handleHoverChange = (nextHovered: boolean) => {
        if (!canHover) {
            return;
        }

        setHovered(nextHovered);
        onHoverChange?.(nextHovered);
    };

    return (
        <RobotSceneContainer $hoverable={hoverable} $interactive={interactive} $slot={slot}>
            <div className="robot-scene-roamer">
                <div
                    className="robot-scene-shell"
                    onBlur={() => handleHoverChange(false)}
                    onClick={handleActivate}
                    onFocus={() => handleHoverChange(true)}
                    onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") {
                            return;
                        }

                        event.preventDefault();
                        handleActivate();
                    }}
                    onMouseEnter={() => handleHoverChange(true)}
                    onMouseLeave={() => handleHoverChange(false)}
                    role={interactive ? "button" : undefined}
                    tabIndex={interactive ? 0 : -1}
                >
                    <div className="robot-scene-robot">
                        <RoundRobot
                            activated={activated}
                            attentionTarget={attentionTarget}
                            hovered={hovered}
                            interactive={interactive}
                            motionIntent={motionIntent}
                            projectionTarget={projectionTarget}
                        />
                    </div>
                    {children ? <div className="robot-scene-overlay">{children}</div> : null}
                </div>
            </div>
        </RobotSceneContainer>
    );
};
