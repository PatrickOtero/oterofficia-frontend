import styled from "styled-components";
import { botAnimationsCss } from "./styles/botAnimations";
import { botStatesCss } from "./styles/botStates";
import { botHelmetCss } from "./styles/botHelmet";
import { botPoseBaseCss } from "./styles/botPoseBase";
import { botPoseFrontCss } from "./styles/botPoseFront";

export const GreetBotContainer = styled.div`
    @keyframes botEnterContent {
        from {
            left: calc(50vw - (var(--bot-width) / 2));
            top: calc(50vh - (var(--bot-height) / 2) - 2rem);
            transform: translate3d(0, 0, 0) scale(1.03);
        }

        to {
            left: calc(100vw - var(--bot-width) - clamp(2.25rem, 4vw, 4rem));
            top: calc(100vh - var(--bot-height) - clamp(0.9rem, 3vh, 2rem));
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    @keyframes botReturnFromContent {
        from {
            left: calc(100vw - var(--bot-width) - clamp(2.25rem, 4vw, 4rem));
            top: calc(100vh - var(--bot-height) - clamp(0.9rem, 3vh, 2rem));
            transform: translate3d(0, 0, 0) scale(0.98);
        }

        to {
            left: calc(100vw - var(--bot-width) - clamp(3rem, 4.8vw, 4.8rem));
            top: calc(100vh - var(--bot-height) - clamp(2.2rem, 4.8vh, 3.6rem));
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    --bot-base-height: 26.5rem;
    --bot-base-width: 14rem;
    --bot-art-scale: 1;
    --bot-height: calc(var(--bot-base-height) * var(--bot-art-scale));
    --bot-width: calc(var(--bot-base-width) * var(--bot-art-scale));
    --bot-float-distance: 0.82rem;
    --visor-glow-opacity: 0.48;

    --bot-accent-rgb: 214, 95, 255;
    --bot-shell-hi: #4e5b6d;
    --bot-shell-mid: #25303f;
    --bot-shell-low: #0a0f16;

    position: fixed;
    inset: 0;
    z-index: 6;
    pointer-events: none;
    overflow: visible;

    .bot-roamer {
        position: absolute;
        width: var(--bot-width);
        height: var(--bot-height);
        pointer-events: none;
        will-change: left, top, transform;
        transition:
            left 840ms cubic-bezier(0.16, 1, 0.22, 1),
            top 840ms cubic-bezier(0.16, 1, 0.22, 1),
            transform 840ms cubic-bezier(0.16, 1, 0.22, 1),
            opacity 260ms ease;
    }

    .bot-roamer.position-home-center {
        left: calc(50vw - (var(--bot-width) / 2));
        top: calc(50vh - (var(--bot-height) / 2) - 2rem);
        transform: translate3d(0, 0, 0) scale(1.03);
    }

    .bot-roamer.position-home-docked {
        left: calc(100vw - var(--bot-width) - clamp(3rem, 4.8vw, 4.8rem));
        top: calc(100vh - var(--bot-height) - clamp(2.2rem, 4.8vh, 3.6rem));
        transform: translate3d(0, 0, 0) scale(1);
    }

    .bot-roamer.position-home-returning {
        left: calc(100vw - var(--bot-width) - clamp(3rem, 4.8vw, 4.8rem));
        top: calc(100vh - var(--bot-height) - clamp(2.2rem, 4.8vh, 3.6rem));
        transform: translate3d(0, 0, 0) scale(1);
        animation: botReturnFromContent 980ms cubic-bezier(0.16, 1, 0.22, 1);
    }

    .bot-roamer.position-content-docked {
        left: calc(100vw - var(--bot-width) - clamp(2.25rem, 4vw, 4rem));
        top: calc(100vh - var(--bot-height) - clamp(0.9rem, 3vh, 2rem));
        transform: translate3d(0, 0, 0) scale(1);
    }

    .bot-roamer.position-content-entering {
        left: calc(100vw - var(--bot-width) - clamp(2.25rem, 4vw, 4rem));
        top: calc(100vh - var(--bot-height) - clamp(0.9rem, 3vh, 2rem));
        transform: translate3d(0, 0, 0) scale(1);
        animation: botEnterContent 980ms cubic-bezier(0.16, 1, 0.22, 1);
    }

    .greetbot-body {
        position: relative;
        width: var(--bot-width);
        height: var(--bot-height);
        pointer-events: none;
        cursor: default;
        will-change: transform;
        animation: greetBotFloating 6.4s ease-in-out infinite;
        overflow: visible;
        transition:
            transform 520ms ease,
            opacity 260ms ease;
    }

    .greetbot-body.is-interactive {
        pointer-events: auto;
        cursor: pointer;
    }

    .bot-frame {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--bot-base-width);
        height: var(--bot-base-height);
        overflow: visible;
        transform: scale(var(--bot-art-scale));
        transform-origin: top left;
    }

    ${botAnimationsCss}
    ${botStatesCss}
    ${botHelmetCss}
    ${botPoseBaseCss}
    ${botPoseFrontCss}

    @media (max-width: 900px) {
        --bot-art-scale: 0.64;
        --bot-float-distance: 0.42rem;
        z-index: 3;

        .bot-roamer.position-home-center {
            left: calc(50vw - (var(--bot-width) / 2));
            top: calc(50vh - (var(--bot-height) / 2) - 2rem);
        }

        .bot-roamer.position-home-docked {
            left: calc(100vw - var(--bot-width) + 1rem);
            top: calc(100vh - var(--bot-height) + 0.4rem);
        }

        .bot-roamer.position-home-returning {
            left: calc(100vw - var(--bot-width) + 1rem);
            top: calc(100vh - var(--bot-height) + 0.4rem);
        }

        .bot-roamer.position-content-docked {
            left: calc(100vw - var(--bot-width) + 1rem);
            top: calc(100vh - var(--bot-height) + 0.4rem);
        }

        .bot-roamer.position-content-entering {
            left: calc(100vw - var(--bot-width) + 1rem);
            top: calc(100vh - var(--bot-height) + 0.4rem);
        }

        .greetbot-body.is-ambient {
            opacity: 0.92;
        }
    }

    @media (max-width: 640px) {
        --bot-art-scale: 0.58;

        .bot-roamer.position-home-docked,
        .bot-roamer.position-home-returning,
        .bot-roamer.position-content-docked,
        .bot-roamer.position-content-entering {
            left: calc(100vw - var(--bot-width) + 1.4rem);
            top: calc(100vh - var(--bot-height) + 0.7rem);
        }

        .bot-roamer.position-home-center {
            top: calc(50vh - (var(--bot-height) / 2) - 2.6rem);
        }
    }
`;
