import styled from "styled-components"

export const DefaultContainer = styled.div`
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        min-width: 100vw;
        min-height: 100vh;
        padding: 4rem;

        overflow: hidden;
        isolation: isolate;

    .layout-clickable-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        z-index: 1;
    }

    .scene-stage {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: visible;
        transform: translate3d(
            calc(var(--scene-camera-x, 0px) * -0.08),
            calc(var(--scene-camera-y, 0px) * -0.08),
            0
        );
        transform-origin: 50% 60%;
        will-change: transform;
    }

    .planet-system {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: visible;
        transform:
            translate3d(
                calc(var(--scene-camera-x, 0px) * -1),
                calc(var(--scene-camera-y, 0px) * -1),
                0
            )
            scale(var(--scene-camera-zoom, 1));
        transform-origin: 50% 60%;
        will-change: transform;
    }

    @media (max-width: 900px) {
        padding: 2rem;
    }
`
