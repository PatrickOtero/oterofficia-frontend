import type { CSSProperties, ReactNode } from "react";
import { SceneParallaxLayerContainer } from "./styles";

type SceneParallaxLayerProps = {
    children: ReactNode;
    className?: string;
    depth: number;
    zoomFactor?: number;
};

type SceneParallaxLayerStyle = CSSProperties & {
    "--scene-layer-depth": number;
    "--scene-layer-zoom-factor": number;
};

const createParallaxStyle = (depth: number, zoomFactor: number): SceneParallaxLayerStyle => ({
    "--scene-layer-depth": depth,
    "--scene-layer-zoom-factor": zoomFactor,
});

export const SceneParallaxLayer = ({
    children,
    className,
    depth,
    zoomFactor = depth * 0.42,
}: SceneParallaxLayerProps) => (
    <SceneParallaxLayerContainer className={className} style={createParallaxStyle(depth, zoomFactor)}>
        {children}
    </SceneParallaxLayerContainer>
);
