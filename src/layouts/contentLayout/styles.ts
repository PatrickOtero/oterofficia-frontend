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

    .planet-system {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
    }

    .content-topbar {
        position: absolute;
        top: 4rem;
        right: clamp(2rem, 6vw, 7rem);
        z-index: 10;

        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .content-nav-link,
    .content-nav-button-link,
    .content-session-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 4.2rem;
        padding: 0 1.6rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background: rgba(9, 18, 27, 0.56);
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.1rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        backdrop-filter: blur(4px);
    }

    .content-nav-button-link {
        cursor: pointer;
    }

    .content-nav-link.active {
        border-color: rgba(var(--scene-accent-rgb), 0.32);
        color: rgba(var(--scene-title-rgb), 0.96);
        box-shadow: inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.08);
    }

    .content-nav-button-link.active {
        border-color: rgba(var(--scene-accent-rgb), 0.32);
        color: rgba(var(--scene-title-rgb), 0.96);
        box-shadow: inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.08);
    }

    .content-nav-button {
        width: auto;
        min-width: 0;
        height: 4.2rem;
        padding: 0 1.6rem;
        font-size: 1.08rem;
    }

    .content-main {
        position: relative;
        z-index: 5;
        width: min(132rem, 100%);
        height: calc(100vh - 15.2rem);
        pointer-events: auto;
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
        padding: 10rem 1.6rem 1.6rem;

        .content-topbar {
            top: 2rem;
            right: 1.6rem;
            left: 1.6rem;
            justify-content: flex-end;
        }

        .content-nav-link,
        .content-nav-button-link,
        .content-session-chip,
        .content-nav-button {
            min-height: 3.8rem;
            padding: 0 1.2rem;
            font-size: 0.98rem;
        }

        .content-main {
            height: calc(100vh - 12rem);
        }
    }
`;
