import type { ProjectionBounds } from "./robotProjection.types";

export const createDefaultProjectionStyle = ({
    angle,
    length,
    eyeScale,
    eyeShiftX,
    eyeShiftY,
    visorScale,
    visorShiftX,
    visorShiftY,
    visorTilt,
}: {
    angle: string;
    length: string;
    eyeScale: string;
    eyeShiftX: string;
    eyeShiftY: string;
    visorScale: string;
    visorShiftX: string;
    visorShiftY: string;
    visorTilt: string;
}) => ({
    beamOriginX: "-9999px",
    beamOriginY: "-9999px",
    beamAngle: angle,
    beamLength: length,
    eyeScale,
    eyeShiftX,
    eyeShiftY,
    visorScale,
    visorShiftX,
    visorShiftY,
    visorTilt,
});

export const insetProjectionBounds = (rect: DOMRect, inset: number): ProjectionBounds => {
    const insetX = Math.max(0, Math.min(inset, rect.width / 2 - 1));
    const insetY = Math.max(0, Math.min(inset, rect.height / 2 - 1));

    return {
        left: rect.left + insetX,
        right: rect.right - insetX,
        top: rect.top + insetY,
        bottom: rect.bottom - insetY,
    };
};

export const resolveProjectedBeamLength = ({
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
