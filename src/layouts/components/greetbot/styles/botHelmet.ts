import { css } from "styled-components";

export const botHelmetCss = css`
    .bot-head {
        position: absolute;
        top: 0;
        width: 7rem;
        height: 7.2rem;
        overflow: visible;
        z-index: 6;
    }

    .bot-head-shell {
        position: absolute;
        inset: 0;
        border-radius: 1.9rem 1.9rem 1.35rem 1.35rem;
        background:
            radial-gradient(circle at 35% 18%, rgba(255, 255, 255, 0.14), transparent 18%),
            linear-gradient(180deg, var(--bot-shell-hi) 0%, var(--bot-shell-mid) 54%, var(--bot-shell-low) 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1.3rem 2rem rgba(0, 0, 0, 0.3),
            0 0.9rem 1.6rem rgba(0, 0, 0, 0.16);
        clip-path: polygon(
            18% 0%,
            82% 0%,
            94% 16%,
            96% 42%,
            88% 78%,
            72% 100%,
            28% 100%,
            12% 78%,
            4% 42%,
            6% 16%
        );
    }

    .bot-head-shell::before {
        content: "";
        position: absolute;
        inset: 0.36rem 0.45rem 0.54rem;
        clip-path: polygon(
            16% 0%,
            84% 0%,
            95% 18%,
            95% 42%,
            86% 80%,
            70% 100%,
            30% 100%,
            14% 80%,
            5% 42%,
            5% 18%
        );
        background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 30%),
            linear-gradient(180deg, rgba(30, 40, 54, 0.9) 0%, rgba(8, 12, 18, 0.46) 100%);
        opacity: 0.96;
    }

    .bot-head-shell::after {
        content: "";
        position: absolute;
        inset: 0.16rem;
        clip-path: polygon(
            18% 0%,
            82% 0%,
            94% 16%,
            96% 42%,
            88% 78%,
            72% 100%,
            28% 100%,
            12% 78%,
            4% 42%,
            6% 16%
        );
        box-shadow: inset 0 0 0 1px rgba(var(--bot-accent-rgb), 0.05);
        pointer-events: none;
    }

    .greetBot01-visor {
        position: absolute;
        left: 0.56rem;
        right: 0.56rem;
        top: 0.95rem;
        height: 4.6rem;
        transition: transform 360ms ease;
        overflow: visible;
        z-index: 4;
    }

    .gb-visor-horizontal {
        position: absolute;
        top: 0.16rem;
        left: 0;
        right: 0;
        width: 100%;
        height: 2rem;
        border-radius: 999px;
        background:
            linear-gradient(180deg, rgba(4, 8, 14, 0.98) 0%, rgba(1, 3, 7, 0.97) 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            inset 0 -0.75rem 1.05rem rgba(0, 0, 0, 0.42),
            0 0 0 1px rgba(255, 255, 255, 0.025);
        overflow: visible;
        z-index: 3;
    }

    .gb-visor-horizontal::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 3.9rem;
        height: 0.24rem;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        background: linear-gradient(
            90deg,
            rgba(var(--bot-accent-rgb), 0.18) 0%,
            rgba(var(--bot-accent-rgb), 0.96) 50%,
            rgba(var(--bot-accent-rgb), 0.18) 100%
        );
        box-shadow: 0 0 1rem rgba(var(--bot-accent-rgb), 0.36);
        opacity: 0.95;
    }

    .gb-visor-vertical {
        position: absolute;
        left: 50%;
        top: 0.26rem;
        width: 0.24rem;
        height: 3.2rem;
        transform: translateX(-50%);
        border-radius: 999px;
        background: linear-gradient(
            180deg,
            rgba(var(--bot-accent-rgb), 0.18) 0%,
            rgba(var(--bot-accent-rgb), 0.96) 50%,
            rgba(var(--bot-accent-rgb), 0.18) 100%
        );
        box-shadow: 0 0 1rem rgba(var(--bot-accent-rgb), 0.36);
        opacity: 0.95;
        z-index: 4;
    }

    .gb-mouth {
        position: absolute;
        left: 50%;
        bottom: -0.38rem;
        width: 0.1rem;
        height: 0.9rem;
        transform: translateX(-50%);
        border-radius: 999px;
        background: linear-gradient(
            180deg,
            rgba(242, 208, 113, 0.92) 0%,
            rgba(242, 208, 113, 0.36) 100%
        );
        box-shadow: 0 0 0.44rem rgba(242, 208, 113, 0.2);
    }

    .gb-eyes {
        position: absolute;
        top: 50%;
        width: 0.36rem;
        height: 0.36rem;
        border-radius: 50%;
        background-color: #f2d071;
        box-shadow: 0 0 0.58rem rgba(242, 208, 113, 0.4);
        animation: eyePulse 2.8s ease-in-out infinite;
        will-change: transform, opacity;
        overflow: visible;
        isolation: isolate;
        z-index: 5;
    }

    .eyeLeft {
        left: 1.28rem;
    }

    .eyeRight {
        right: 1.28rem;
    }

    .emitting-holo {
        background-color: rgba(var(--scene-accent-soft-rgb), 0.96);
        box-shadow: 0 0 1rem rgba(var(--scene-accent-rgb), var(--visor-glow-opacity));
        animation: eyeEmittingHolo 420ms ease-in-out infinite;
    }

    .eyeLeft.beam-active {
        --beam-angle: 22deg;
        --beam-length: 42rem;
    }

    .eyeRight.beam-active {
        --beam-angle: 22deg;
        --beam-length: 40rem;
    }

    .greetbot-body.beam-target-home .eyeLeft.beam-active {
        --beam-angle: 20deg;
        --beam-length: 59rem;
    }

    .greetbot-body.beam-target-home .eyeRight.beam-active {
        --beam-angle: 19deg;
        --beam-length: 57rem;
    }

    .greetbot-body.beam-target-content .eyeLeft.beam-active {
        --beam-angle: 67deg;
        --beam-length: 25rem;
    }

    .greetbot-body.beam-target-content .eyeRight.beam-active {
        --beam-angle: 65deg;
        --beam-length: 23rem;
    }

    .greetbot-body.beam-target-auth .eyeLeft.beam-active {
        --beam-angle: 56deg;
        --beam-length: 42rem;
    }

    .greetbot-body.beam-target-auth .eyeRight.beam-active {
        --beam-angle: 54deg;
        --beam-length: 40rem;
    }

    .greetbot-body.beam-target-about .eyeLeft.beam-active {
        --beam-angle: 33deg;
        --beam-length: 47rem;
    }

    .greetbot-body.beam-target-about .eyeRight.beam-active {
        --beam-angle: 31deg;
        --beam-length: 45rem;
    }

    .greetbot-body.beam-target-portfolio .eyeLeft.beam-active {
        --beam-angle: 37deg;
        --beam-length: 45rem;
    }

    .greetbot-body.beam-target-portfolio .eyeRight.beam-active {
        --beam-angle: 35deg;
        --beam-length: 43rem;
    }

    .gb-eyes.beam-active::before {
        content: "";
        position: absolute;
        top: 50%;
        right: 50%;
        width: var(--beam-length);
        height: 1.26rem;
        border-radius: 999px;
        transform-origin: 100% 50%;
        transform: translateY(-50%) rotate(var(--beam-angle));
        background: linear-gradient(
            90deg,
            rgba(var(--scene-accent-rgb), 0) 0%,
            rgba(var(--scene-accent-rgb), 0.05) 18%,
            rgba(var(--scene-accent-rgb), 0.14) 42%,
            rgba(var(--scene-accent-rgb), 0.3) 72%,
            rgba(255, 255, 255, 0.16) 100%
        );
        clip-path: polygon(0 46%, 100% 0, 100% 100%, 0 54%);
        filter: blur(0.5px);
        opacity: 0.44;
        pointer-events: none;
        z-index: 1;
    }

    .gb-eyes.beam-active::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 50%;
        width: calc(var(--beam-length) - 1.6rem);
        height: 0.38rem;
        border-radius: 999px;
        transform-origin: 100% 50%;
        transform: translateY(-50%) rotate(var(--beam-angle));
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(180, 245, 255, 0.08) 22%,
            rgba(180, 245, 255, 0.28) 62%,
            rgba(255, 255, 255, 0.5) 100%
        );
        clip-path: polygon(0 42%, 100% 0, 100% 100%, 0 58%);
        box-shadow:
            0 0 6px rgba(var(--scene-accent-rgb), 0.14),
            0 0 12px rgba(var(--scene-accent-rgb), 0.08);
        opacity: 0.96;
        pointer-events: none;
        z-index: 2;
    }

    .bot-head--front {
        left: 50%;
        transform: translateX(-50%);
    }

    @media (max-width: 900px) {
        .greetbot-body.beam-target-home .eyeLeft.beam-active {
            --beam-angle: 19deg;
            --beam-length: 36rem;
        }

        .greetbot-body.beam-target-home .eyeRight.beam-active {
            --beam-angle: 18deg;
            --beam-length: 34rem;
        }

        .greetbot-body.beam-target-content .eyeLeft.beam-active {
            --beam-angle: 69deg;
            --beam-length: 21rem;
        }

        .greetbot-body.beam-target-content .eyeRight.beam-active {
            --beam-angle: 67deg;
            --beam-length: 19rem;
        }

        .greetbot-body.beam-target-auth .eyeLeft.beam-active {
            --beam-angle: 58deg;
            --beam-length: 28rem;
        }

        .greetbot-body.beam-target-auth .eyeRight.beam-active {
            --beam-angle: 56deg;
            --beam-length: 26rem;
        }

        .greetbot-body.beam-target-about .eyeLeft.beam-active {
            --beam-angle: 36deg;
            --beam-length: 27rem;
        }

        .greetbot-body.beam-target-about .eyeRight.beam-active {
            --beam-angle: 34deg;
            --beam-length: 25rem;
        }

        .greetbot-body.beam-target-portfolio .eyeLeft.beam-active {
            --beam-angle: 39deg;
            --beam-length: 26rem;
        }

        .greetbot-body.beam-target-portfolio .eyeRight.beam-active {
            --beam-angle: 37deg;
            --beam-length: 24rem;
        }
    }
`;
