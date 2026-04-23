import styled from "styled-components";

export const ContentLayoutContainer = styled.div`
    @keyframes contentStageReveal {
        from {
            opacity: 0;
            transform: translate3d(2.2rem, 0.4rem, 0) scale(0.985);
        }

        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    position: relative;

    display: flex;
    justify-content: center;
    align-items: stretch;

    width: 100vw;
    min-height: 100vh;
    padding: 12rem 3.2rem 3.2rem;
    overflow: hidden;
    isolation: isolate;

    .layout-clickable-container {
        position: absolute;
        inset: 0;
        z-index: 1;
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

    .content-main {
        position: relative;
        z-index: 5;
        width: min(132rem, 100%);
        height: calc(100vh - 15.2rem);
        pointer-events: auto;
        transition:
            filter 260ms ease,
            opacity 260ms ease,
            transform 260ms ease;
    }

    .content-main.conversation-active {
        filter: brightness(0.42) saturate(0.72) blur(1.2px);
        opacity: 0.74;
        transform: scale(0.985);
    }

    .content-conversation-fade {
        position: absolute;
        inset: 0;
        z-index: 9;
        background: rgba(3, 10, 16, 0.34);
        backdrop-filter: blur(4px);
        pointer-events: auto;
        animation: contentStageReveal 220ms ease;
    }

    .content-exit-button {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 6;
        width: 3.2rem;
        height: 3.2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        background:
            linear-gradient(180deg, rgba(12, 21, 32, 0.9) 0%, rgba(6, 12, 20, 0.84) 100%);
        color: rgba(var(--scene-title-rgb), 0.94);
        box-shadow:
            0 1rem 2.2rem rgba(0, 0, 0, 0.22),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
        transform: translate3d(0, calc(-100% - 0.9rem), 0);
        transition:
            transform 160ms ease,
            border-color 160ms ease,
            box-shadow 160ms ease;
    }

    .content-exit-button:hover {
        transform: translate3d(0, calc(-100% - 0.98rem), 0);
        border-color: rgba(var(--scene-accent-rgb), 0.3);
        box-shadow:
            0 1.1rem 2.4rem rgba(0, 0, 0, 0.24),
            0 0 1.1rem rgba(var(--scene-accent-rgb), 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
    }

    .content-stage {
        width: 100%;
        height: 100%;
        transform-origin: right center;
        animation: contentStageReveal 460ms cubic-bezier(0.16, 1, 0.22, 1);
        will-change: transform, opacity;
    }

    .content-stage.panel-stage {
        animation-duration: 520ms;
    }

    @media (max-width: 900px) {
        padding: 10rem 1.2rem 2rem;

        .content-main {
            height: calc(100vh - 12rem);
        }

        .content-exit-button {
            width: 3rem;
            height: 3rem;
            transform: translate3d(0, calc(-100% - 0.72rem), 0);
        }

        .content-exit-button:hover {
            transform: translate3d(0, calc(-100% - 0.78rem), 0);
        }
    }

    @media (max-width: 640px) {
        padding: 8.8rem 0.8rem 1.6rem;

        .content-main {
            height: calc(100vh - 10.4rem);
        }

        .content-exit-button {
            width: 2.8rem;
            height: 2.8rem;
            transform: translate3d(0, calc(-100% - 0.58rem), 0);
        }

        .content-exit-button:hover {
            transform: translate3d(0, calc(-100% - 0.62rem), 0);
        }
    }
`;
