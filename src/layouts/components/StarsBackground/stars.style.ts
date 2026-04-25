import styled, { css, keyframes } from "styled-components";
import type { SpaceTheme } from "../greetbot/spaceThemes";

const starsGlow = keyframes`
    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 0.86;
    }
`;

const warpBackdrop = keyframes`
    from {
        transform: translate3d(-10rem, 0, 0);
    }

    to {
        transform: translate3d(10rem, 0, 0);
    }
`;

const warpSweep = keyframes`
    0% {
        transform: translate3d(-42vw, 0, 0) scaleX(0.6);
        opacity: 0;
    }

    12% {
        opacity: var(--warp-opacity);
    }

    84% {
        opacity: var(--warp-opacity);
    }

    100% {
        transform: translate3d(78vw, 0, 0) scaleX(1.08);
        opacity: 0;
    }
`;

const warpPulse = keyframes`
    0%,
    100% {
        transform: scale(0.92);
        opacity: calc(var(--warp-star-opacity) * 0.62);
    }

    50% {
        transform: scale(1.12);
        opacity: var(--warp-star-opacity);
    }
`;

const nebulaDrift = keyframes`
    0%,
    100% {
        transform: translate3d(-2rem, 1rem, 0) scale(1);
        opacity: 0.46;
    }

    50% {
        transform: translate3d(2.4rem, -1.4rem, 0) scale(1.08);
        opacity: 0.72;
    }
`;

const asteroidDrift = keyframes`
    0%,
    100% {
        transform: translate3d(0, 0, 0) rotate(var(--asteroid-rotate));
    }

    50% {
        transform: translate3d(var(--asteroid-drift-x), var(--asteroid-drift-y), 0) rotate(calc(var(--asteroid-rotate) + 8deg));
    }
`;

const asteroidTumble = keyframes`
    0%,
    100% {
        transform: rotate(0deg) scale(1, 1);
        filter: brightness(0.92) contrast(1.04);
    }

    35% {
        transform: rotate(var(--asteroid-spin-range)) scale(1.04, 0.94);
        filter: brightness(1.08) contrast(1.1);
    }

    70% {
        transform: rotate(calc(var(--asteroid-spin-range) * -0.72)) scale(0.96, 1.03);
        filter: brightness(0.82) contrast(1.12);
    }
`;

const dustDrift = keyframes`
    from {
        transform: translate3d(0, 0, 0);
    }

    to {
        transform: translate3d(8rem, -3rem, 0);
    }
`;

const asteroidDustSweep = keyframes`
    from {
        transform: translate3d(-6rem, 4rem, 0) rotate(-8deg);
    }

    to {
        transform: translate3d(8rem, -5rem, 0) rotate(-8deg);
    }
`;

const baseStars = css`
    background:
        radial-gradient(circle at 18% 14%, rgba(var(--scene-accent-soft-rgb), 0.08), transparent 22%),
        radial-gradient(circle at 78% 20%, rgba(var(--scene-accent-rgb), 0.06), transparent 18%),
        linear-gradient(180deg, rgba(4, 8, 16, 0.06) 0%, rgba(2, 5, 10, 0.28) 100%);

    &::before,
    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-repeat: no-repeat;
        z-index: 0;
    }

    &::before {
        opacity: 0.78;
        animation: ${starsGlow} 14s ease-in-out infinite;
        background-image:
            radial-gradient(circle at 8% 12%, rgba(255, 255, 255, 0.92) 0 1px, transparent 1.8px),
            radial-gradient(circle at 16% 30%, rgba(255, 255, 255, 0.7) 0 1px, transparent 1.6px),
            radial-gradient(circle at 28% 8%, rgba(255, 255, 255, 0.78) 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 38% 24%, rgba(255, 255, 255, 0.62) 0 1px, transparent 1.6px),
            radial-gradient(circle at 52% 14%, rgba(255, 255, 255, 0.88) 0 1.3px, transparent 1.9px),
            radial-gradient(circle at 62% 8%, rgba(255, 255, 255, 0.58) 0 1px, transparent 1.6px),
            radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.82) 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 91% 11%, rgba(255, 255, 255, 0.68) 0 1px, transparent 1.6px),
            radial-gradient(circle at 12% 58%, rgba(255, 255, 255, 0.66) 0 1px, transparent 1.6px),
            radial-gradient(circle at 22% 74%, rgba(255, 255, 255, 0.54) 0 1px, transparent 1.6px),
            radial-gradient(circle at 34% 66%, rgba(255, 255, 255, 0.84) 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 46% 82%, rgba(255, 255, 255, 0.58) 0 1px, transparent 1.6px),
            radial-gradient(circle at 56% 54%, rgba(255, 255, 255, 0.62) 0 1px, transparent 1.6px),
            radial-gradient(circle at 68% 78%, rgba(255, 255, 255, 0.56) 0 1px, transparent 1.6px),
            radial-gradient(circle at 74% 62%, rgba(255, 255, 255, 0.86) 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 88% 46%, rgba(255, 255, 255, 0.64) 0 1px, transparent 1.6px),
            radial-gradient(circle at 94% 72%, rgba(255, 255, 255, 0.52) 0 1px, transparent 1.6px);
    }

    &::after {
        opacity: 0.34;
        background-image:
            radial-gradient(circle at 6% 44%, rgba(var(--scene-accent-soft-rgb), 0.7) 0 1px, transparent 2px),
            radial-gradient(circle at 20% 72%, rgba(var(--scene-accent-soft-rgb), 0.58) 0 1px, transparent 2px),
            radial-gradient(circle at 31% 52%, rgba(var(--scene-accent-soft-rgb), 0.42) 0 1px, transparent 2px),
            radial-gradient(circle at 42% 52%, rgba(var(--scene-accent-soft-rgb), 0.52) 0 1px, transparent 2px),
            radial-gradient(circle at 58% 74%, rgba(var(--scene-accent-soft-rgb), 0.72) 0 1px, transparent 2px),
            radial-gradient(circle at 69% 42%, rgba(var(--scene-accent-soft-rgb), 0.38) 0 1px, transparent 2px),
            radial-gradient(circle at 76% 68%, rgba(var(--scene-accent-soft-rgb), 0.48) 0 1px, transparent 2px),
            radial-gradient(circle at 93% 58%, rgba(var(--scene-accent-soft-rgb), 0.58) 0 1px, transparent 2px);
    }
`;

const warpTheme = css`
    background:
        radial-gradient(circle at 18% 18%, rgba(138, 227, 255, 0.1), transparent 24%),
        radial-gradient(circle at 74% 22%, rgba(112, 176, 255, 0.08), transparent 22%),
        radial-gradient(circle at 50% 52%, rgba(52, 86, 165, 0.06), transparent 40%),
        linear-gradient(180deg, rgba(3, 7, 16, 0.12) 0%, rgba(2, 5, 12, 0.4) 100%);

    &::before {
        opacity: 0.42;
        animation: ${warpBackdrop} 7.6s linear infinite;
        background-image:
            linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(195, 235, 255, 0.34) 48%, rgba(255, 255, 255, 0) 100%),
            linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.22) 48%, rgba(255, 255, 255, 0) 100%),
            linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(167, 219, 255, 0.32) 48%, rgba(255, 255, 255, 0) 100%),
            linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(244, 250, 255, 0.28) 48%, rgba(255, 255, 255, 0) 100%),
            linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(157, 212, 255, 0.3) 48%, rgba(255, 255, 255, 0) 100%);
        background-position:
            6% 16%,
            22% 40%,
            48% 22%,
            72% 54%,
            88% 30%;
        background-size:
            16rem 1px,
            22rem 1px,
            18rem 2px,
            24rem 1px,
            20rem 2px;
    }

    &::after {
        opacity: 0.26;
        animation: ${warpBackdrop} 12s linear infinite reverse;
        background-image:
            radial-gradient(circle at 10% 16%, rgba(255, 255, 255, 0.72) 0 1px, transparent 2px),
            radial-gradient(circle at 18% 34%, rgba(255, 255, 255, 0.66) 0 1px, transparent 2px),
            radial-gradient(circle at 30% 22%, rgba(255, 255, 255, 0.58) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 48%, rgba(255, 255, 255, 0.64) 0 1px, transparent 2px),
            radial-gradient(circle at 56% 18%, rgba(255, 255, 255, 0.68) 0 1px, transparent 2px),
            radial-gradient(circle at 68% 38%, rgba(255, 255, 255, 0.54) 0 1px, transparent 2px),
            radial-gradient(circle at 82% 24%, rgba(255, 255, 255, 0.7) 0 1px, transparent 2px),
            radial-gradient(circle at 94% 46%, rgba(255, 255, 255, 0.52) 0 1px, transparent 2px);
    }
`;

const asteroidTheme = css`
    background:
        radial-gradient(circle at 14% 18%, rgba(255, 214, 163, 0.1), transparent 24%),
        radial-gradient(circle at 74% 16%, rgba(157, 198, 255, 0.07), transparent 20%),
        radial-gradient(circle at 50% 58%, rgba(61, 47, 34, 0.08), transparent 36%),
        linear-gradient(180deg, rgba(9, 12, 18, 0.14) 0%, rgba(4, 7, 12, 0.38) 100%);

    &::after {
        animation: ${dustDrift} 18s linear infinite alternate;
        opacity: 0.26;
        background-image:
            radial-gradient(circle at 8% 18%, rgba(255, 226, 184, 0.36) 0 1px, transparent 2px),
            radial-gradient(circle at 18% 44%, rgba(255, 241, 222, 0.28) 0 1px, transparent 2px),
            radial-gradient(circle at 28% 26%, rgba(201, 228, 255, 0.24) 0 1px, transparent 2px),
            radial-gradient(circle at 40% 62%, rgba(255, 229, 198, 0.22) 0 1px, transparent 2px),
            radial-gradient(circle at 54% 18%, rgba(214, 233, 255, 0.18) 0 1px, transparent 2px),
            radial-gradient(circle at 66% 48%, rgba(255, 235, 211, 0.24) 0 1px, transparent 2px),
            radial-gradient(circle at 78% 28%, rgba(193, 220, 255, 0.18) 0 1px, transparent 2px),
            radial-gradient(circle at 92% 42%, rgba(255, 219, 170, 0.2) 0 1px, transparent 2px);
    }
`;

export const SpaceContainer = styled.div<{ $theme: SpaceTheme }>`
    position: absolute;
    inset: -14vmax;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    isolation: isolate;

    ${baseStars}

    ${({ $theme }) => ($theme === "space" ? warpTheme : "")}
    ${({ $theme }) => ($theme === "asteroids" ? asteroidTheme : "")}

    .warp-streak,
    .warp-star,
    .asteroid-field-rock,
    .space-nebula,
    .space-depth-grid,
    .asteroid-dust {
        position: absolute;
        z-index: 1;
    }

    .space-nebula {
        width: 58vmax;
        height: 58vmax;
        border-radius: 50%;
        filter: blur(44px);
        mix-blend-mode: screen;
        animation: ${nebulaDrift} 18s ease-in-out infinite;
    }

    .space-nebula-left {
        left: -14vmax;
        top: 22%;
        background:
            radial-gradient(circle at 48% 48%, rgba(71, 183, 255, 0.2), transparent 38%),
            radial-gradient(circle at 62% 34%, rgba(156, 101, 255, 0.16), transparent 34%);
    }

    .space-nebula-right {
        right: -12vmax;
        bottom: 6%;
        background:
            radial-gradient(circle at 42% 50%, rgba(70, 126, 255, 0.2), transparent 36%),
            radial-gradient(circle at 58% 64%, rgba(139, 222, 255, 0.12), transparent 34%);
        animation-delay: -8s;
    }

    .space-depth-grid {
        inset: 0;
        z-index: 0;
        opacity: 0.24;
        background-image:
            linear-gradient(90deg, rgba(180, 226, 255, 0.08) 1px, transparent 1px),
            linear-gradient(180deg, rgba(180, 226, 255, 0.06) 1px, transparent 1px);
        background-size: 11rem 11rem;
        mask-image: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.78), transparent 72%);
    }

    .warp-streak {
        left: var(--warp-left);
        top: var(--warp-top);
        width: var(--warp-width);
        height: var(--warp-height);
        border-radius: 999px;
        opacity: var(--warp-opacity);
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.94) 30%,
            rgba(212, 241, 255, 0.88) 50%,
            rgba(122, 214, 255, 0.34) 74%,
            rgba(255, 255, 255, 0) 100%
        );
        box-shadow: 0 0 1rem rgba(164, 225, 255, 0.18);
        transform: translate3d(-42vw, 0, 0);
        animation: ${warpSweep} var(--warp-duration) linear infinite;
        animation-delay: var(--warp-delay);
    }

    .warp-star {
        left: var(--warp-star-left);
        top: var(--warp-star-top);
        width: var(--warp-star-size);
        height: var(--warp-star-size);
        border-radius: 50%;
        opacity: var(--warp-star-opacity);
        background: radial-gradient(circle, rgba(255, 255, 255, 0.94) 0%, rgba(187, 231, 255, 0.48) 52%, rgba(255, 255, 255, 0) 100%);
        box-shadow:
            0 0 0.65rem rgba(196, 237, 255, 0.2),
            0 0 1rem rgba(118, 204, 255, 0.08);
        animation: ${warpPulse} var(--warp-star-duration) ease-in-out infinite;
        animation-delay: var(--warp-star-delay);
    }

    .asteroid-field-rock {
        left: var(--asteroid-left);
        top: var(--asteroid-top);
        width: var(--asteroid-size);
        height: calc(var(--asteroid-size) * var(--asteroid-height-ratio));
        border-radius: var(--asteroid-radius);
        clip-path: var(--asteroid-clip-path);
        opacity: var(--asteroid-opacity);
        z-index: var(--asteroid-z-index);
        background:
            radial-gradient(circle at 28% 24%, var(--asteroid-highlight), transparent 24%),
            radial-gradient(circle at 68% 66%, var(--asteroid-shadow), transparent 42%),
            linear-gradient(145deg, var(--asteroid-shell-start) 0%, var(--asteroid-shell-mid) 58%, var(--asteroid-shell-end) 100%);
        box-shadow:
            inset -0.4rem -0.45rem 0.8rem rgba(24, 16, 12, 0.36),
            0 0 1.4rem rgba(255, 204, 145, 0.1);
        transform: rotate(var(--asteroid-rotate));
        animation:
            ${asteroidDrift} var(--asteroid-duration) ease-in-out infinite,
            ${asteroidTumble} var(--asteroid-tumble-duration) ease-in-out infinite;
        animation-delay: var(--asteroid-delay), calc(var(--asteroid-delay) * 0.45);
    }

    .asteroid-field-rock::before,
    .asteroid-field-rock::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
    }

    .asteroid-field-rock::before {
        background:
            radial-gradient(circle at 22% 28%, var(--asteroid-highlight) 0 10%, transparent 12%),
            radial-gradient(circle at 58% 62%, var(--asteroid-crater) 0 11%, transparent 13%),
            radial-gradient(circle at 42% 76%, var(--asteroid-highlight) 0 8%, transparent 10%),
            radial-gradient(circle at 74% 31%, var(--asteroid-crater) 0 7%, transparent 9%);
        opacity: 0.62;
    }

    .asteroid-field-rock::after {
        inset: 8%;
        background:
            radial-gradient(circle at 32% 36%, rgba(255, 255, 255, 0.08), transparent 16%),
            radial-gradient(circle at 74% 40%, var(--asteroid-crater), transparent 20%),
            radial-gradient(circle at 54% 74%, rgba(255, 241, 224, 0.08), transparent 14%);
        opacity: 0.48;
    }

    .asteroid-field-rock.large {
        box-shadow:
            inset -0.55rem -0.6rem 1rem rgba(24, 16, 12, 0.42),
            0 0 1.6rem rgba(255, 205, 144, 0.12);
    }

    .asteroid-field-rock.medium {
        box-shadow:
            inset -0.38rem -0.42rem 0.82rem rgba(24, 16, 12, 0.34),
            0 0 1.2rem rgba(255, 205, 144, 0.08);
    }

    .asteroid-field-rock.small,
    .asteroid-field-rock.shard {
        box-shadow:
            inset -0.24rem -0.26rem 0.48rem rgba(24, 16, 12, 0.28),
            0 0 0.7rem rgba(255, 205, 144, 0.05);
    }

    .asteroid-field-rock.distant {
        filter: saturate(0.78) brightness(0.78) blur(0.2px);
    }

    .asteroid-dust {
        inset: -10%;
        z-index: 0;
        opacity: 0.32;
        transform: rotate(-8deg);
        background-image:
            radial-gradient(circle at 6% 18%, rgba(255, 224, 181, 0.24) 0 1px, transparent 2px),
            radial-gradient(circle at 14% 72%, rgba(255, 232, 202, 0.2) 0 1px, transparent 2px),
            radial-gradient(circle at 28% 38%, rgba(198, 221, 255, 0.16) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 82%, rgba(255, 219, 170, 0.18) 0 1px, transparent 2px),
            radial-gradient(circle at 58% 18%, rgba(255, 241, 224, 0.2) 0 1px, transparent 2px),
            radial-gradient(circle at 74% 62%, rgba(196, 218, 255, 0.14) 0 1px, transparent 2px),
            radial-gradient(circle at 88% 34%, rgba(255, 224, 181, 0.18) 0 1px, transparent 2px);
        animation: ${asteroidDustSweep} 28s linear infinite alternate;
    }

    .asteroid-dust-near {
        background-size: 34rem 34rem;
    }

    .asteroid-dust-far {
        opacity: 0.18;
        background-size: 18rem 18rem;
        animation-duration: 40s;
        animation-direction: alternate-reverse;
    }

    @media (max-width: 640px) {
        .warp-streak {
            width: calc(var(--warp-width) * 0.78);
        }

        .asteroid-field-rock {
            width: calc(var(--asteroid-size) * 0.78);
            height: calc(var(--asteroid-size) * var(--asteroid-height-ratio) * 0.78);
        }
    }
`;
