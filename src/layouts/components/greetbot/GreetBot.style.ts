import styled from "styled-components";
import { botAnimationsCss } from "./styles/botAnimations";
import { botStatesCss } from "./styles/botStates";
import { botHelmetCss } from "./styles/botHelmet";
import { botPoseBaseCss } from "./styles/botPoseBase";
import { botPoseFrontCss } from "./styles/botPoseFront";

export const GreetBotContainer = styled.div`
    --bot-height: 26.5rem;
    --bot-width: 14rem;
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
            left 760ms cubic-bezier(0.18, 1, 0.22, 1),
            top 760ms cubic-bezier(0.18, 1, 0.22, 1),
            transform 760ms cubic-bezier(0.18, 1, 0.22, 1),
            opacity 240ms ease;
    }

    .bot-roamer.position-home-center {
        left: calc(50vw - (var(--bot-width) / 2));
        top: calc(50vh - (var(--bot-height) / 2) - 2rem);
        transform: translate3d(0, 0, 0) scale(1.03);
    }

    .bot-roamer.position-home-docked {
        left: calc(100vw - var(--bot-width) - clamp(3.75rem, 5vw, 5.5rem));
        top: calc(100vh - var(--bot-height) - clamp(4rem, 7vh, 5.5rem));
        transform: translate3d(0, 0, 0) scale(1);
    }

    .bot-roamer.position-content-docked {
        left: calc(100vw - var(--bot-width) - clamp(2.25rem, 4vw, 4rem));
        top: calc(100vh - var(--bot-height) - clamp(0.9rem, 3vh, 2rem));
        transform: translate3d(0, 0, 0) scale(1);
    }

    .greetbot-body {
        position: relative;
        width: var(--bot-width);
        height: var(--bot-height);
        pointer-events: none;
        cursor: default;
        will-change: transform;
        animation: greetBotFloating 5.6s ease-in-out infinite;
        overflow: visible;
        transition:
            transform 360ms ease,
            opacity 240ms ease,
            filter 240ms ease;
    }

    .greetbot-body.is-interactive {
        pointer-events: auto;
        cursor: pointer;
    }

    .greetbot-body:hover {
        filter: brightness(1.05);
    }

    .bot-frame {
        position: absolute;
        inset: 0;
        overflow: visible;
    }

    ${botAnimationsCss}
    ${botStatesCss}
    ${botHelmetCss}
    ${botPoseBaseCss}
    ${botPoseFrontCss}

    @media (max-width: 900px) {
        --bot-height: 21.4rem;
        --bot-width: 11.3rem;

        .bot-roamer.position-home-center {
            left: calc(50vw - (var(--bot-width) / 2));
            top: calc(50vh - (var(--bot-height) / 2) - 1rem);
        }

        .bot-roamer.position-home-docked {
            left: calc(100vw - var(--bot-width) - 1.4rem);
            top: calc(100vh - var(--bot-height) - 2.2rem);
        }

        .bot-roamer.position-content-docked {
            left: calc(100vw - var(--bot-width) - 1rem);
            top: calc(100vh - var(--bot-height) - 0.55rem);
        }
    }
`;
