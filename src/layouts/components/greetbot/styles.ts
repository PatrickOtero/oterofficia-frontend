import styled, { css, keyframes } from "styled-components";
import type { RobotSceneSlot } from "./types";

const enterContent = keyframes`
    from {
        left: calc(50vw - (var(--robot-scene-width) / 2));
        top: calc(50vh - (var(--robot-scene-height) / 2) - 0.8rem);
        transform: translate3d(0, 0, 0) scale(1.02);
    }

    to {
        left: calc(100vw - var(--robot-scene-width) - clamp(1.6rem, 4vw, 3.2rem));
        top: calc(100vh - var(--robot-scene-height) - clamp(1rem, 3vh, 2rem));
        transform: translate3d(0, 0, 0) scale(0.96);
    }
`;

const returnHome = keyframes`
    from {
        left: calc(100vw - var(--robot-scene-width) - clamp(1.6rem, 4vw, 3.2rem));
        top: calc(100vh - var(--robot-scene-height) - clamp(1rem, 3vh, 2rem));
        transform: translate3d(0, 0, 0) scale(0.96);
    }

    to {
        left: calc(100vw - var(--robot-scene-width) - clamp(2.4rem, 4.8vw, 4.2rem));
        top: calc(100vh - var(--robot-scene-height) - clamp(2rem, 4.8vh, 3rem));
        transform: translate3d(0, 0, 0) scale(1);
    }
`;

const robotFloat = keyframes`
    0%, 100% {
        transform: translate3d(-50%, -50%, 0);
    }

    50% {
        transform: translate3d(-50%, calc(-50% - 0.55rem), 0);
    }
`;

const robotPulse = keyframes`
    0% {
        transform: translate3d(var(--body-shift), 0, 0) rotate(var(--body-tilt)) scale(var(--body-scale));
    }

    40% {
        transform: translate3d(var(--body-shift), -0.16rem, 0) rotate(var(--body-tilt))
            scale(calc(var(--body-scale) * 1.045));
    }

    100% {
        transform: translate3d(var(--body-shift), 0, 0) rotate(var(--body-tilt)) scale(var(--body-scale));
    }
`;

const orbitDepthSweep = keyframes`
    0% {
        transform: translate3d(
                calc(-50% - var(--orbit-lateral-range)),
                -50%,
                0
            )
            scale(0.74);
    }

    12.5% {
        transform: translate3d(
                calc(-50% - calc(var(--orbit-lateral-range) * 0.72)),
                calc(-50% - calc(var(--orbit-vertical-range) * 0.72)),
                0
            )
            scale(0.82);
    }

    25% {
        transform: translate3d(
                -50%,
                calc(-50% - var(--orbit-vertical-range)),
                0
            )
            scale(0.92);
    }

    37.5% {
        transform: translate3d(
                calc(-50% + calc(var(--orbit-lateral-range) * 0.72)),
                calc(-50% - calc(var(--orbit-vertical-range) * 0.72)),
                0
            )
            scale(0.82);
    }

    50% {
        transform: translate3d(
                calc(-50% + var(--orbit-lateral-range)),
                -50%,
                0
            )
            scale(0.74);
    }

    62.5% {
        transform: translate3d(
                calc(-50% + calc(var(--orbit-lateral-range) * 0.72)),
                calc(-50% + calc(var(--orbit-vertical-range) * 0.84)),
                0
            )
            scale(1.01);
    }

    75% {
        transform: translate3d(
                -50%,
                calc(-50% + var(--orbit-vertical-range)),
                0
            )
            scale(1.12);
    }

    87.5% {
        transform: translate3d(
                calc(-50% - calc(var(--orbit-lateral-range) * 0.72)),
                calc(-50% + calc(var(--orbit-vertical-range) * 0.84)),
                0
            )
            scale(1.01);
    }

    100% {
        transform: translate3d(
                calc(-50% - var(--orbit-lateral-range)),
                -50%,
                0
            )
            scale(0.74);
    }
`;

const orbitFrontVisibility = keyframes`
    0%,
    49.99%,
    100% {
        opacity: 0;
    }

    50%,
    99.99% {
        opacity: 1;
    }
`;

const orbitBackVisibility = keyframes`
    0%,
    49.99%,
    100% {
        opacity: 1;
    }

    50%,
    99.99% {
        opacity: 0;
    }
`;

const hologramPulse = keyframes`
    0%,
    100% {
        opacity: 0.82;
        transform: translate(-50%, -50%) scale(0.92);
    }

    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.16);
    }
`;

const hologramBeamPulse = keyframes`
    0%,
    100% {
        opacity: 0.72;
        filter: blur(0.55px);
    }

    50% {
        opacity: 1;
        filter: blur(0.95px);
    }
`;

const turbineExhaustPulse = keyframes`
    0%,
    100% {
        opacity: 0.72;
        transform: translateX(-50%) scaleX(0.94) scaleY(0.82);
        filter: blur(1.7px);
    }

    50% {
        opacity: 1;
        transform: translateX(-50%) translateY(0.18rem) scaleX(1.06) scaleY(1.14);
        filter: blur(1.2px);
    }
`;

const turbineExhaustMist = keyframes`
    0%,
    100% {
        opacity: 0.54;
        transform: translateX(-50%) scale(0.92);
    }

    50% {
        opacity: 0.9;
        transform: translateX(-50%) scale(1.16);
    }
`;

const visorScan = keyframes`
    0%,
    100% {
        transform: translateX(-130%);
        opacity: 0;
    }

    18% {
        opacity: 0.42;
    }

    50% {
        transform: translateX(130%);
        opacity: 0.68;
    }

    82% {
        opacity: 0;
    }
`;

const slotStyles: Record<RobotSceneSlot, ReturnType<typeof css>> = {
    "home-center": css`
        left: calc(50vw - (var(--robot-scene-width) / 2));
        top: calc(50vh - (var(--robot-scene-height) / 2) - 0.8rem);
        transform: translate3d(0, 0, 0) scale(1.02);
    `,
    "home-docked": css`
        left: calc(100vw - var(--robot-scene-width) - clamp(2.4rem, 4.8vw, 4.2rem));
        top: calc(100vh - var(--robot-scene-height) - clamp(2rem, 4.8vh, 3rem));
        transform: translate3d(0, 0, 0) scale(1);
    `,
    "home-returning": css`
        left: calc(100vw - var(--robot-scene-width) - clamp(2.4rem, 4.8vw, 4.2rem));
        top: calc(100vh - var(--robot-scene-height) - clamp(2rem, 4.8vh, 3rem));
        transform: translate3d(0, 0, 0) scale(1);
        animation: ${returnHome} 980ms cubic-bezier(0.16, 1, 0.22, 1);
    `,
    "content-conversation": css`
        left: calc(50vw - (var(--robot-scene-width) / 2));
        top: calc(50vh - (var(--robot-scene-height) / 2) - 0.8rem);
        transform: translate3d(0, 0, 0) scale(1.02);
    `,
    "content-entering": css`
        left: calc(100vw - var(--robot-scene-width) - clamp(1.6rem, 4vw, 3.2rem));
        top: calc(100vh - var(--robot-scene-height) - clamp(1rem, 3vh, 2rem));
        transform: translate3d(0, 0, 0) scale(0.96);
        animation: ${enterContent} 980ms cubic-bezier(0.16, 1, 0.22, 1);
    `,
    "content-docked": css`
        left: calc(100vw - var(--robot-scene-width) - clamp(1.6rem, 4vw, 3.2rem));
        top: calc(100vh - var(--robot-scene-height) - clamp(1rem, 3vh, 2rem));
        transform: translate3d(0, 0, 0) scale(0.96);
    `,
};

const visorGlow = "0 0 1.8rem rgba(185, 105, 255, 0.2)";

export const RobotSceneContainer = styled.div<{
    $elevated: boolean;
    $hoverable: boolean;
    $interactive: boolean;
    $slot: RobotSceneSlot;
}>`
    --robot-scene-width: 24rem;
    --robot-scene-height: 24rem;

    position: fixed;
    inset: 0;
    z-index: ${({ $elevated }) => ($elevated ? 12 : 3)};
    pointer-events: none;

    .robot-scene-camera-layer {
        position: absolute;
        inset: 0;
        transform:
            translate3d(
                calc(var(--scene-camera-x, 0px) * -0.12),
                calc(var(--scene-camera-y, 0px) * -0.12),
                0
            )
            scale(calc(1 + ((var(--scene-camera-zoom, 1) - 1) * 0.08)));
        transform-origin: 50% 58%;
        will-change: transform;
    }

    .robot-scene-roamer {
        position: absolute;
        width: var(--robot-scene-width);
        height: var(--robot-scene-height);
        pointer-events: none;
        transition:
            left 840ms cubic-bezier(0.16, 1, 0.22, 1),
            top 840ms cubic-bezier(0.16, 1, 0.22, 1),
            transform 840ms cubic-bezier(0.16, 1, 0.22, 1);
        will-change: left, top, transform;
        ${({ $slot }) => slotStyles[$slot]}
    }

    .robot-scene-shell {
        position: relative;
        width: 100%;
        height: 100%;
        outline: none;
        pointer-events: ${({ $hoverable, $interactive }) => ($interactive || $hoverable ? "auto" : "none")};
        cursor: ${({ $hoverable, $interactive }) => ($interactive || $hoverable ? "pointer" : "default")};
        touch-action: manipulation;
    }

    .robot-scene-shell::before {
        content: "";
        position: absolute;
        inset: 16% 12% 12%;
        border-radius: 50%;
        background:
            radial-gradient(circle, rgba(116, 191, 255, 0.14) 0%, rgba(116, 191, 255, 0.05) 42%, transparent 72%);
        filter: blur(24px);
        pointer-events: none;
    }

    .robot-scene-robot,
    .robot-scene-overlay {
        position: absolute;
        inset: 0;
    }

    .robot-scene-overlay {
        pointer-events: none;
    }

    .robot-scene-overlay > * {
        pointer-events: auto;
    }

    @media (max-width: 900px) {
        --robot-scene-width: 18.5rem;
        --robot-scene-height: 18.5rem;

        .robot-scene-roamer {
            ${({ $slot }) =>
                $slot === "home-center" || $slot === "content-conversation"
                    ? css`
                          top: calc(50vh - (var(--robot-scene-height) / 2) - 2rem);
                      `
                    : css`
                          left: calc(100vw - var(--robot-scene-width) + 0.8rem);
                          top: calc(100vh - var(--robot-scene-height) + 0.4rem);
                      `}
        }
    }

    @media (max-width: 640px) {
        --robot-scene-width: 15rem;
        --robot-scene-height: 15rem;

        .robot-scene-roamer {
            ${({ $slot }) =>
                $slot === "home-center" || $slot === "content-conversation"
                    ? css`
                          top: calc(50vh - (var(--robot-scene-height) / 2) - 2.3rem);
                      `
                    : css`
                          left: calc(100vw - var(--robot-scene-width) + 1.2rem);
                          top: calc(100vh - var(--robot-scene-height) + 0.7rem);
                      `}
        }
    }
`;

export const RobotFigure = styled.div<{
    $activated: boolean;
    $hovered: boolean;
    $interactive: boolean;
    $projecting: boolean;
}>`
    --robot-size: 12.8rem;
    --body-scale: 1.25;
    --orbit-scale: 2;
    --orbit-duration: 7.2s;
    --orbit-radius: 5.8rem;
    --orbit-lateral-range: 4.45rem;
    --orbit-vertical-range: 1.88rem;
    --face-offset: 0%;
    --body-tilt: 0deg;
    --body-shift: 0rem;
    --beam-angle: 0deg;
    --beam-length: 0rem;
    --eye-scale: 1;
    --eye-shift-x: 0rem;
    --eye-shift-y: 0rem;
    --visor-scale: 1;
    --visor-shift-x: 0rem;
    --visor-shift-y: 0rem;
    --visor-tilt: 0deg;
    --visor-hover-lift: 0rem;
    --visor-hover-scale: 1;
    --robot-bottom-glow-opacity: 0.58;

    position: absolute;
    inset: 0;

    .robot-float-shell {
        position: absolute;
        left: 50%;
        top: 50%;
        width: var(--robot-size);
        height: var(--robot-size);
        transform: translate3d(-50%, -50%, 0);
        animation: ${robotFloat} 5.6s ease-in-out infinite;
        will-change: transform;
    }

    .robot-shadow {
        display: none;
    }

    .robot-hologram-overlay {
        position: fixed;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        opacity: ${({ $projecting, $hovered }) => ($projecting ? ($hovered ? 1 : 0.9) : 0)};
        transition: opacity 220ms ease;
    }

    .orbit-layer {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 184%;
        height: 132%;
        transform: translate3d(-50%, -50%, 0) scale(var(--orbit-scale));
        transform-origin: center;
        pointer-events: none;
    }

    .orbit-layer-back {
        z-index: 1;
    }

    .orbit-layer-front {
        z-index: 5;
    }

    .orbit-item {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        animation: ${orbitDepthSweep} var(--orbit-duration) linear infinite;
        animation-delay: var(--orbit-delay);
        will-change: transform;
    }

    .orbit-node {
        position: relative;
        will-change: opacity;
        opacity: 1;
    }

    .orbit-counter-spin {
        transform: translateZ(0);
    }

    .turbine-shell {
        position: relative;
        width: var(--turbine-size);
        height: calc(var(--turbine-size) + 0.42rem);
        border-radius: 50% 50% 42% 42%;
        background:
            radial-gradient(circle at 50% 24%, rgba(241, 246, 255, 0.34), transparent 34%),
            linear-gradient(180deg, rgba(37, 48, 67, 0.94) 0%, rgba(12, 16, 27, 0.98) 100%);
        border: 1px solid rgba(132, 154, 199, 0.2);
        box-shadow:
            inset 0 0.14rem 0.24rem rgba(255, 255, 255, 0.12),
            0 0.2rem 0.6rem rgba(0, 0, 0, 0.26);
        transform: scale(calc(1 + (var(--scene-pilot-thrust, 0) * 0.06)));
        transform-origin: center;
        backface-visibility: hidden;
        will-change: transform, opacity;
    }

    .orbit-layer-front .turbine-shell,
    .orbit-layer-back .turbine-shell {
        animation: none;
    }

    .orbit-layer-front .orbit-node {
        animation: ${orbitFrontVisibility} var(--orbit-duration) linear infinite;
        animation-delay: var(--orbit-delay);
    }

    .orbit-layer-back .orbit-node {
        animation: ${orbitBackVisibility} var(--orbit-duration) linear infinite;
        animation-delay: var(--orbit-delay);
    }

    .turbine-core {
        position: absolute;
        left: 50%;
        top: 44%;
        width: 42%;
        height: 34%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(248, 226, 255, 0.98) 0%, rgba(210, 94, 255, 0.92) 58%, rgba(132, 40, 198, 0.3) 100%);
        box-shadow: 0 0 0.75rem rgba(190, 85, 255, 0.5);
    }

    .turbine-bloom {
        position: absolute;
        inset: 18% 24% 22%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(209, 114, 255, 0.24) 0%, transparent 72%);
        transform: scale(calc(var(--turbine-glow-scale, 1) + (var(--scene-pilot-thrust, 0) * 0.24)));
    }

    .turbine-trail {
        position: absolute;
        left: 50%;
        top: calc(100% - 0.08rem);
        width: 56%;
        height: calc(2.45rem + (var(--scene-pilot-thrust, 0) * 0.72rem));
        transform: translateX(-50%);
        transform-origin: top center;
        border-radius: 0 0 1.2rem 1.2rem;
        background:
            linear-gradient(
                180deg,
                rgba(255, 248, 255, 0.98) 0%,
                rgba(245, 190, 255, 0.94) 16%,
                rgba(211, 124, 255, 0.86) 42%,
                rgba(132, 40, 198, 0.24) 78%,
                rgba(115, 41, 205, 0) 100%
            );
        box-shadow:
            0 0 0.8rem rgba(214, 95, 255, 0.28),
            0 0 1.4rem rgba(214, 95, 255, 0.18);
        filter: blur(0.9px);
        opacity: calc(0.82 + (var(--scene-pilot-thrust, 0) * 0.18));
        animation: ${turbineExhaustPulse} 1.46s ease-in-out infinite;
        animation-delay: var(--orbit-delay);
    }

    .turbine-trail::before {
        content: "";
        position: absolute;
        left: 50%;
        top: -0.16rem;
        width: 142%;
        height: 1.08rem;
        transform: translateX(-50%);
        border-radius: 50%;
        background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.94) 0%,
            rgba(245, 190, 255, 0.72) 34%,
            rgba(214, 95, 255, 0.18) 68%,
            rgba(214, 95, 255, 0) 100%
        );
        filter: blur(0.7px);
        animation: ${turbineExhaustMist} 1.46s ease-in-out infinite;
        animation-delay: var(--orbit-delay);
    }

    .turbine-trail::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0.14rem;
        width: 176%;
        height: 1.42rem;
        transform: translateX(-50%);
        border-radius: 999px;
        background: radial-gradient(
            ellipse at center,
            rgba(214, 95, 255, 0.24) 0%,
            rgba(214, 95, 255, 0.12) 44%,
            rgba(214, 95, 255, 0) 100%
        );
        filter: blur(3px);
        opacity: 0.88;
        animation: ${turbineExhaustMist} 1.46s ease-in-out infinite reverse;
        animation-delay: var(--orbit-delay);
    }

    .robot-body {
        position: absolute;
        inset: 0;
        z-index: 4;
        transform:
            translate3d(
                calc(var(--body-shift) + (var(--scene-pilot-x, 0) * 0.52rem)),
                calc(var(--scene-pilot-y, 0) * 0.28rem),
                0
            )
            rotate(calc(var(--body-tilt) + (var(--scene-pilot-x, 0) * 7deg) + (var(--scene-pilot-z, 0) * 3deg)))
            scale(calc(var(--body-scale) + (var(--scene-pilot-thrust, 0) * 0.02)));
        transition:
            transform 260ms ease,
            filter 260ms ease;
        will-change: transform;
        ${({ $activated }) =>
            $activated
                ? css`
                      animation: ${robotPulse} 520ms cubic-bezier(0.18, 0.88, 0.32, 1);
                  `
                : ""}
    }

    .robot-body-aura {
        position: absolute;
        inset: 10%;
        z-index: 0;
        border-radius: 50%;
        background:
            radial-gradient(circle, rgba(130, 200, 255, 0.12) 0%, rgba(130, 200, 255, 0.03) 42%, transparent 72%),
            radial-gradient(circle, rgba(184, 90, 255, 0.08) 0%, transparent 62%);
        filter: blur(10px);
        opacity: ${({ $hovered }) => ($hovered ? 0.82 : 0.54)};
        transition: opacity 220ms ease;
    }

    .robot-hologram-beam {
        position: absolute;
        left: var(--beam-origin-x);
        top: var(--beam-origin-y);
        border-radius: 999px;
        transform-origin: 0% 50%;
        transform: translateY(-50%) rotate(var(--beam-angle));
        pointer-events: none;
        will-change: opacity, filter, transform;
        animation: ${hologramBeamPulse} 1.8s ease-in-out infinite;
    }

    .robot-hologram-beam-outer {
        width: var(--beam-length);
        height: 1.04rem;
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(var(--scene-accent-rgb), 0.34) 28%,
            rgba(var(--scene-accent-rgb), 0.18) 58%,
            rgba(var(--scene-accent-rgb), 0.06) 84%,
            rgba(var(--scene-accent-rgb), 0) 100%
        );
        clip-path: polygon(0 50%, 100% 0, 100% 100%);
        filter: blur(0.65px);
        opacity: 0.46;
    }

    .robot-hologram-beam-inner {
        width: var(--beam-length);
        height: 0.3rem;
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.52) 0%,
            rgba(180, 245, 255, 0.28) 34%,
            rgba(180, 245, 255, 0.08) 76%,
            rgba(255, 255, 255, 0) 100%
        );
        clip-path: polygon(0 50%, 100% 0, 100% 100%);
        box-shadow:
            0 0 0.4rem rgba(var(--scene-accent-rgb), 0.2),
            0 0 0.9rem rgba(var(--scene-accent-rgb), 0.12);
        opacity: 0.92;
        animation-duration: 1.6s;
    }

    .robot-hologram-origin {
        position: absolute;
        left: var(--beam-origin-x);
        top: var(--beam-origin-y);
        width: 1.32rem;
        height: 1.32rem;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.94) 0%,
            rgba(198, 232, 255, 0.54) 26%,
            rgba(var(--scene-accent-rgb), 0.34) 58%,
            rgba(var(--scene-accent-rgb), 0) 100%
        );
        filter: blur(1px);
        animation: ${hologramPulse} 1.45s ease-in-out infinite;
        pointer-events: none;
    }

    .robot-body-shell {
        position: absolute;
        inset: 13%;
        z-index: 3;
        border-radius: 50%;
        overflow: visible;
        background:
            radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.28), transparent 16%),
            radial-gradient(circle at 65% 68%, rgba(32, 14, 58, 0.96), transparent 40%),
            linear-gradient(180deg, #344257 0%, #1a2436 48%, #0c1523 100%);
        border: 1px solid rgba(158, 186, 228, 0.28);
        box-shadow:
            inset 0 0.5rem 1.2rem rgba(255, 255, 255, 0.14),
            inset 0 -1.1rem 1.7rem rgba(2, 4, 8, 0.56),
            0 1.4rem 2.8rem rgba(0, 0, 0, 0.4),
            ${({ $hovered }) => ($hovered ? "0 0 2.4rem rgba(118, 197, 255, 0.18)" : "0 0 1.6rem rgba(118, 197, 255, 0.12)")};
    }

    .robot-body-rim {
        position: absolute;
        inset: 0.55rem;
        border-radius: 50%;
        border: 1px solid rgba(145, 171, 215, 0.24);
        box-shadow: inset 0 0 1rem rgba(0, 0, 0, 0.24);
    }

    .robot-body-core {
        position: absolute;
        inset: 18%;
        border-radius: 50%;
        background:
            radial-gradient(circle at 50% 45%, rgba(10, 18, 30, 0.22) 0%, rgba(10, 18, 30, 0.28) 52%, rgba(3, 7, 14, 0.68) 100%),
            radial-gradient(circle at 50% 50%, rgba(155, 94, 255, 0.18), rgba(6, 12, 22, 0.12) 64%);
    }

    .robot-body-highlight {
        position: absolute;
        inset: 9% 18% 52%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, transparent 72%);
        filter: blur(6px);
        opacity: ${({ $hovered }) => ($hovered ? 0.94 : 0.72)};
        transition: opacity 220ms ease;
    }

    .robot-body-bottom-glow {
        position: absolute;
        left: 50%;
        bottom: 16%;
        width: 38%;
        height: 16%;
        transform:
            translateX(calc(-50% + (var(--scene-pilot-x, 0) * 0.08rem)))
            scale(calc(1 + (var(--scene-pilot-thrust, 0) * 0.08)));
        border-radius: 50%;
        background: radial-gradient(circle, rgba(196, 105, 255, 0.46) 0%, rgba(94, 34, 145, 0.08) 72%, transparent 100%);
        filter: blur(8px);
        opacity: calc(var(--robot-bottom-glow-opacity) + (var(--scene-pilot-thrust, 0) * 0.2));
        transition: opacity 220ms ease;
    }

    .robot-visor {
        position: absolute;
        inset: 28% 21% 31%;
        border-radius: 999px;
        padding: 0.22rem;
        z-index: 4;
        overflow: visible;
        background: linear-gradient(180deg, rgba(166, 189, 228, 0.16), rgba(33, 43, 63, 0.4));
        box-shadow:
            0 0 0 1px rgba(111, 145, 201, 0.12),
            ${visorGlow};
        transform: translate3d(
                var(--visor-shift-x),
                calc(var(--visor-shift-y) + var(--visor-hover-lift)),
                0
            )
            rotate(var(--visor-tilt))
            scale(var(--visor-scale))
            scale(var(--visor-hover-scale));
        transform-origin: 50% 50%;
        transition: box-shadow 220ms ease, transform 340ms cubic-bezier(0.16, 1, 0.22, 1);
    }

    .robot-visor-glass {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 999px;
        background:
            linear-gradient(180deg, rgba(15, 23, 37, 0.98) 0%, rgba(5, 10, 18, 0.92) 100%),
            rgba(11, 16, 27, 0.96);
        box-shadow:
            inset 0 0.16rem 0.4rem rgba(255, 255, 255, 0.06),
            inset 0 -0.4rem 0.9rem rgba(0, 0, 0, 0.24);
    }

    .robot-visor-projector {
        position: absolute;
        inset: 0;
        z-index: 5;
        overflow: visible;
        pointer-events: none;
    }

    .robot-visor-projector-anchor {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 1rem;
        height: 1rem;
        transform: translate(
            calc(-50% + var(--face-offset) + var(--eye-shift-x)),
            calc(-50% + var(--eye-shift-y))
        );
        transition: transform 340ms cubic-bezier(0.16, 1, 0.22, 1);
        will-change: transform;
    }

    .robot-visor-eye {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.95rem;
        height: 0.95rem;
        z-index: 6;
        transform: translate(
                calc(-50% + var(--face-offset) + var(--eye-shift-x)),
                calc(-50% + var(--eye-shift-y))
            )
            scale(var(--eye-scale));
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 247, 255, 0.95) 0%, rgba(236, 143, 255, 0.9) 38%, rgba(129, 47, 215, 0.5) 100%);
        box-shadow:
            0 0 1.05rem rgba(207, 110, 255, 0.58),
            0 0 0.2rem rgba(255, 255, 255, 0.7);
        transition:
            transform 340ms cubic-bezier(0.16, 1, 0.22, 1),
            box-shadow 220ms ease;
    }

    .robot-visor-eye.projecting {
        box-shadow:
            0 0 1.4rem rgba(207, 110, 255, 0.72),
            0 0 0.5rem rgba(180, 245, 255, 0.3),
            0 0 0.2rem rgba(255, 255, 255, 0.76);
    }

    .robot-visor-scan {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 14%;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(200, 235, 255, 0.26), rgba(255, 255, 255, 0));
        mix-blend-mode: screen;
        opacity: 0.52;
        animation: ${visorScan} 4.6s ease-in-out infinite;
    }

    .robot-sensor {
        position: absolute;
        top: 52%;
        width: 0.44rem;
        height: 0.44rem;
        transform: translateY(-50%);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(237, 205, 255, 0.94) 0%, rgba(180, 92, 255, 0.92) 52%, rgba(96, 28, 181, 0.24) 100%);
        box-shadow: 0 0 0.8rem rgba(193, 103, 255, 0.42);
        opacity: ${({ $hovered }) => ($hovered ? 0.92 : 0.66)};
        transition: opacity 220ms ease;
    }

    .robot-sensor-left {
        left: 22%;
    }

    .robot-sensor-right {
        right: 22%;
    }

    .robot-top-halo {
        position: absolute;
        left: 50%;
        top: 11%;
        width: 42%;
        height: 18%;
        transform: translateX(-50%);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(120, 193, 255, 0.22) 0%, rgba(120, 193, 255, 0.02) 74%, transparent 100%);
        filter: blur(8px);
        opacity: ${({ $hovered }) => ($hovered ? 0.94 : 0.64)};
        transition: opacity 220ms ease;
    }

    ${({ $hovered }) =>
        $hovered
            ? css`
                  --robot-bottom-glow-opacity: 0.78;
                  --visor-hover-lift: -0.1rem;
                  --visor-hover-scale: 1.02;

                  .robot-body {
                      filter: saturate(1.08);
                  }

                  .turbine-shell {
                      filter: blur(0) brightness(1.04);
                  }
              `
            : ""}

    ${({ $activated }) =>
        $activated
            ? css`
                  --robot-bottom-glow-opacity: 1;
              `
            : ""}

    ${({ $interactive }) =>
        !$interactive
            ? css`
                  .robot-visor-scan {
                      animation-duration: 5.2s;
                  }
              `
            : ""}

    @media (prefers-reduced-motion: reduce) {
        .robot-float-shell,
        .orbit-item,
        .orbit-node,
        .turbine-trail,
        .turbine-trail::before,
        .turbine-trail::after,
        .robot-hologram-beam,
        .robot-hologram-origin,
        .robot-visor-scan {
            animation: none;
        }
    }

    @media (max-width: 900px) {
        --robot-size: 10.4rem;
        --body-scale: 1.25;
        --orbit-scale: 2;
        --orbit-radius: 4.8rem;
        --orbit-lateral-range: 3.7rem;
        --orbit-vertical-range: 1.54rem;

    }

    @media (max-width: 640px) {
        --robot-size: 8.8rem;
        --body-scale: 1.06;
        --orbit-scale: 1.7;
        --orbit-radius: 4.05rem;
        --orbit-lateral-range: 3rem;
        --orbit-vertical-range: 1.2rem;
        --orbit-duration: 6.6s;

    }

    @media (max-width: 420px) {
        --robot-size: 7.6rem;
        --body-scale: 0.98;
        --orbit-scale: 1.58;
        --orbit-radius: 3.56rem;
        --orbit-lateral-range: 2.58rem;
        --orbit-vertical-range: 1.02rem;
    }
`;
