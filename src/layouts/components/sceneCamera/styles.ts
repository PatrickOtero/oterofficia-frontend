import styled from "styled-components";

export const SceneParallaxLayerContainer = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    transform:
        translate3d(
            calc(var(--scene-camera-x, 0px) * var(--scene-layer-depth) * -1.18),
            calc(var(--scene-camera-y, 0px) * var(--scene-layer-depth) * -1.18),
            0
        )
        scale(calc(1 + ((var(--scene-camera-zoom, 1) - 1) * var(--scene-layer-zoom-factor) * 1.12)));
    transform-origin: 50% 62%;
    will-change: transform;

`;

export const SceneCameraHudContainer = styled.div`
    position: fixed;
    left: clamp(1rem, 3vw, 2rem);
    bottom: clamp(1rem, 3vh, 2rem);
    z-index: 12;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    max-width: min(52rem, calc(100vw - 2rem));
    pointer-events: none;

    .scene-camera-panel,
    .scene-camera-manual-hint {
        pointer-events: auto;
        border-radius: 1.6rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(5, 12, 21, 0.84) 100%),
            rgba(4, 10, 18, 0.84);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.03),
            0 1.2rem 2.8rem rgba(0, 0, 0, 0.24);
        backdrop-filter: blur(8px);
    }

    .scene-camera-panel {
        padding: 1rem 1rem 0.95rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .scene-camera-panel-header,
    .scene-camera-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.8rem;
        flex-wrap: wrap;
    }

    .scene-camera-panel-label,
    .scene-camera-hint-title {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.9rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .scene-camera-presets {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }

    .scene-camera-chip,
    .scene-camera-toggle,
    .scene-camera-reset {
        min-height: 3.2rem;
        padding: 0 1rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(10, 19, 32, 0.64);
        color: rgba(var(--scene-accent-soft-rgb), 0.86);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.86rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        transition:
            border-color 180ms ease,
            transform 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
    }

    .scene-camera-chip:hover,
    .scene-camera-toggle:hover,
    .scene-camera-reset:hover {
        transform: translateY(-0.08rem);
        border-color: rgba(var(--scene-accent-rgb), 0.28);
        box-shadow: inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.06);
    }

    .scene-camera-chip.active,
    .scene-camera-toggle.active {
        border-color: rgba(var(--scene-accent-rgb), 0.32);
        background: rgba(var(--scene-accent-rgb), 0.1);
        color: rgba(var(--scene-title-rgb), 0.98);
        box-shadow:
            inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.08),
            0 0 1rem rgba(var(--scene-accent-rgb), 0.08);
    }

    .scene-camera-toggle {
        flex: 0 0 auto;
    }

    .scene-camera-readout {
        min-height: 3.2rem;
        padding: 0 1rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
        background: rgba(8, 17, 28, 0.72);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.78rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .scene-camera-manual-hint {
        padding: 0.85rem 1rem 0.95rem;
        display: grid;
        gap: 0.32rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.74);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.76rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    @media (max-width: 900px) {
        left: 0.8rem;
        right: 0.8rem;
        bottom: 0.8rem;
        max-width: none;

        .scene-camera-panel {
            padding: 0.8rem;
        }

        .scene-camera-chip,
        .scene-camera-toggle,
        .scene-camera-reset,
        .scene-camera-readout {
            min-height: 2.9rem;
            font-size: 0.76rem;
        }
    }
`;
