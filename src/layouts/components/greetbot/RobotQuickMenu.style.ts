import styled, { css, keyframes } from "styled-components";

const orbitSweep = keyframes`
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`;

const actionPulse = keyframes`
    0%,
    100% {
        transform: scale(0.96);
        opacity: 0.64;
    }

    50% {
        transform: scale(1.08);
        opacity: 0;
    }
`;

export const QuickMenuContainer = styled.div<{ $actionCount: number }>`
    position: absolute;
    inset: 0;
    pointer-events: none;

    .quick-menu-orbit {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 28rem;
        height: 28rem;
        transform: translate(-50%, -60%);
        pointer-events: none;
    }

    .quick-menu-orbit::before,
    .quick-menu-orbit::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    .quick-menu-orbit::before {
        width: 21.6rem;
        height: 21.6rem;
        border: 1px solid rgba(112, 204, 255, 0.16);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.02),
            0 0 1.8rem rgba(92, 172, 255, 0.08);
        opacity: 0.92;
    }

    .quick-menu-orbit::after {
        width: 18.2rem;
        height: 18.2rem;
        border-top: 1px solid rgba(176, 235, 255, 0.3);
        border-left: 1px solid rgba(176, 235, 255, 0.16);
        border-right: 1px solid rgba(176, 235, 255, 0.06);
        border-bottom: 1px solid rgba(176, 235, 255, 0.04);
        opacity: 0.7;
        animation: ${orbitSweep} 14s linear infinite;
    }

    .quick-menu-core {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 4.3rem;
        height: 4.3rem;
        transform: translate(-50%, calc(-50% - 0.8rem));
        border-radius: 50%;
        background:
            radial-gradient(circle, rgba(119, 213, 255, 0.2) 0%, rgba(119, 213, 255, 0.04) 42%, transparent 72%),
            radial-gradient(circle, rgba(200, 112, 255, 0.12) 0%, rgba(200, 112, 255, 0) 68%);
        filter: blur(2px);
        opacity: 0.74;
    }

    .quick-menu-core::after {
        content: "";
        position: absolute;
        inset: 22%;
        border-radius: 50%;
        border: 1px solid rgba(139, 217, 255, 0.22);
    }

    .quick-menu-action {
        --quick-accent-rgb: 106, 209, 255;
        --quick-button-border: rgba(130, 216, 255, 0.28);
        --quick-button-highlight: rgba(220, 245, 255, 0.24);
        --quick-button-start: rgba(56, 110, 196, 0.24);
        --quick-button-end: rgba(5, 18, 35, 0.94);
        --quick-label-bg: rgba(9, 22, 38, 0.78);

        position: absolute;
        left: 50%;
        top: 50%;
        width: 7.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.55rem;
        pointer-events: auto;
        transform: translate(-50%, -50%);
        transition:
            transform 260ms cubic-bezier(0.16, 1, 0.22, 1),
            opacity 180ms ease;
    }

    .quick-menu-action.position-left {
        transform: translate(calc(-50% - 9.1rem), calc(-50% - 3.6rem));
    }

    .quick-menu-action.position-top {
        transform: translate(-50%, calc(-50% - 11.4rem));
    }

    .quick-menu-action.position-right {
        transform: translate(calc(-50% + 9.1rem), calc(-50% - 3.6rem));
    }

    .quick-menu-action.tone-notification {
        --quick-accent-rgb: 102, 210, 255;
        --quick-button-border: rgba(138, 225, 255, 0.34);
        --quick-button-highlight: rgba(226, 249, 255, 0.28);
        --quick-button-start: rgba(62, 143, 255, 0.26);
        --quick-button-end: rgba(6, 21, 41, 0.94);
    }

    .quick-menu-action.tone-conversation {
        --quick-accent-rgb: 121, 205, 255;
        --quick-button-border: rgba(126, 210, 255, 0.32);
        --quick-button-highlight: rgba(220, 245, 255, 0.22);
        --quick-button-start: rgba(75, 139, 255, 0.24);
        --quick-button-end: rgba(7, 21, 38, 0.92);
    }

    .quick-menu-action.tone-travel-earth {
        --quick-accent-rgb: 104, 200, 255;
        --quick-button-border: rgba(124, 214, 255, 0.32);
        --quick-button-highlight: rgba(214, 248, 255, 0.24);
        --quick-button-start: rgba(72, 140, 255, 0.22);
        --quick-button-end: rgba(7, 20, 39, 0.9);
    }

    .quick-menu-action.tone-travel-mars {
        --quick-accent-rgb: 255, 160, 96;
        --quick-button-border: rgba(255, 194, 142, 0.38);
        --quick-button-highlight: rgba(255, 240, 224, 0.26);
        --quick-button-start: rgba(255, 132, 72, 0.24);
        --quick-button-end: rgba(31, 15, 13, 0.9);
        --quick-label-bg: rgba(39, 20, 14, 0.82);
    }

    .quick-menu-action-beam {
        position: absolute;
        left: 50%;
        top: 3.95rem;
        width: 0.72rem;
        height: 8.2rem;
        transform-origin: top center;
        transform: translateX(-50%);
        border-radius: 999px;
        background: linear-gradient(
            180deg,
            rgba(var(--quick-accent-rgb), 0.86) 0%,
            rgba(var(--quick-accent-rgb), 0.38) 42%,
            rgba(var(--quick-accent-rgb), 0.08) 76%,
            rgba(var(--quick-accent-rgb), 0) 100%
        );
        box-shadow:
            0 0 0.7rem rgba(var(--quick-accent-rgb), 0.22),
            0 0 1.5rem rgba(var(--quick-accent-rgb), 0.12);
        opacity: 0.88;
        pointer-events: none;
    }

    .quick-menu-action.position-left .quick-menu-action-beam {
        top: 3.95rem;
        height: 8.2rem;
        transform-origin: top center;
        transform: translateX(-50%) rotate(-65deg);
    }

    .quick-menu-action.position-right .quick-menu-action-beam {
        top: 3.95rem;
        height: 8.2rem;
        transform-origin: top center;
        transform: translateX(-50%) rotate(65deg);
    }

    .quick-menu-button {
        position: relative;
        width: 4.9rem;
        height: 4.9rem;
        min-width: 0;
        padding: 0;
        border-radius: 50%;
        border: 1px solid var(--quick-button-border);
        background:
            radial-gradient(circle at 30% 28%, var(--quick-button-highlight), transparent 24%),
            radial-gradient(circle at 50% 50%, var(--quick-button-start), var(--quick-button-end) 72%);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.06),
            0 0 1.3rem rgba(var(--quick-accent-rgb), 0.18),
            0 0 2.2rem rgba(var(--quick-accent-rgb), 0.1);
        color: rgba(235, 248, 255, 0.96);
        cursor: pointer;
        pointer-events: auto;
        touch-action: manipulation;
        transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            border-color 180ms ease;
    }

    .quick-menu-button:hover {
        transform: translateY(-0.16rem) scale(1.04);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            0 0 1.8rem rgba(var(--quick-accent-rgb), 0.24),
            0 0 2.8rem rgba(var(--quick-accent-rgb), 0.14);
    }

    .quick-menu-button-core {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.9rem;
        height: 2.9rem;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(var(--quick-accent-rgb), 0.18) 0%, rgba(var(--quick-accent-rgb), 0) 72%);
    }

    .quick-menu-button-core svg {
        filter: drop-shadow(0 0 0.45rem rgba(var(--quick-accent-rgb), 0.22));
    }

    .quick-menu-action[data-alerting="true"] .quick-menu-button::after {
        content: "";
        position: absolute;
        inset: -0.35rem;
        border-radius: 50%;
        border: 1px solid rgba(var(--quick-accent-rgb), 0.28);
        animation: ${actionPulse} 1.2s ease-out infinite;
        pointer-events: none;
    }

    .quick-menu-badge {
        position: absolute;
        right: -0.2rem;
        top: -0.1rem;
        min-width: 1.8rem;
        height: 1.8rem;
        padding: 0 0.42rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid rgba(218, 246, 255, 0.36);
        background: linear-gradient(180deg, rgba(82, 182, 255, 0.96) 0%, rgba(45, 119, 255, 0.9) 100%);
        color: rgba(244, 251, 255, 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.82rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        box-shadow: 0 0 0.9rem rgba(88, 168, 255, 0.26);
        pointer-events: none;
    }

    .quick-menu-label {
        padding: 0.34rem 0.72rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--quick-accent-rgb), 0.18);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, var(--quick-label-bg) 100%);
        color: rgba(219, 241, 255, 0.88);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.74rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
        box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.16);
        pointer-events: none;
    }

    ${({ $actionCount }) =>
        $actionCount === 1
            ? css`
                  .quick-menu-orbit::before {
                      width: 18.6rem;
                      height: 18.6rem;
                  }

                  .quick-menu-orbit::after {
                      width: 15.4rem;
                      height: 15.4rem;
                  }
              `
            : ""}

    @media (max-width: 900px) {
        .quick-menu-orbit {
            width: 22rem;
            height: 22rem;
            transform: translate(-50%, -62%);
        }

        .quick-menu-orbit::before {
            width: 16.8rem;
            height: 16.8rem;
        }

        .quick-menu-orbit::after {
            width: 14rem;
            height: 14rem;
        }

        .quick-menu-core {
            width: 3.8rem;
            height: 3.8rem;
        }

        .quick-menu-action {
            width: 6rem;
        }

        .quick-menu-action.position-left {
            transform: translate(calc(-50% - 6.9rem), calc(-50% - 2.7rem));
        }

        .quick-menu-action.position-top {
            transform: translate(-50%, calc(-50% - 8.9rem));
        }

        .quick-menu-action.position-right {
            transform: translate(calc(-50% + 6.9rem), calc(-50% - 2.7rem));
        }

        .quick-menu-action-beam {
            top: 3.55rem;
            height: 6rem;
        }

        .quick-menu-action.position-left .quick-menu-action-beam,
        .quick-menu-action.position-right .quick-menu-action-beam {
            top: 3.55rem;
            height: 6rem;
        }

        .quick-menu-button {
            width: 4.35rem;
            height: 4.35rem;
        }

        .quick-menu-button-core {
            width: 2.5rem;
            height: 2.5rem;
        }

        .quick-menu-label {
            font-size: 0.68rem;
        }
    }

    @media (max-width: 640px) {
        .quick-menu-orbit {
            width: 17.6rem;
            height: 17.6rem;
            transform: translate(-50%, -63%);
        }

        .quick-menu-orbit::before {
            width: 13.4rem;
            height: 13.4rem;
        }

        .quick-menu-orbit::after {
            width: 11rem;
            height: 11rem;
        }

        .quick-menu-core {
            width: 3.55rem;
            height: 3.55rem;
        }

        .quick-menu-action.position-left {
            transform: translate(calc(-50% - 5.35rem), calc(-50% - 1.85rem));
        }

        .quick-menu-action.position-top {
            transform: translate(-50%, calc(-50% - 7.1rem));
        }

        .quick-menu-action.position-right {
            transform: translate(calc(-50% + 5.35rem), calc(-50% - 1.85rem));
        }

        .quick-menu-action-beam {
            top: 3.1rem;
            height: 4.8rem;
        }

        .quick-menu-action.position-left .quick-menu-action-beam,
        .quick-menu-action.position-right .quick-menu-action-beam {
            top: 3.1rem;
            height: 4.8rem;
        }

        .quick-menu-button {
            width: 3.95rem;
            height: 3.95rem;
        }

        .quick-menu-button-core svg {
            width: 1.2rem;
            height: 1.2rem;
        }

        .quick-menu-badge {
            min-width: 1.55rem;
            height: 1.55rem;
            font-size: 0.72rem;
        }

        .quick-menu-label {
            padding: 0.28rem 0.58rem;
            font-size: 0.62rem;
        }
    }
`;
