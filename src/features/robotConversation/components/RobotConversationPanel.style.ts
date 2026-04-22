import styled, { css, keyframes } from "styled-components";

const bubbleIn = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, 0.8rem, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`;

const panelIn = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, 0.8rem, 0) scale(0.98);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
    }
`;

const statusPulse = keyframes`
    0%,
    100% {
        opacity: 0.56;
    }

    50% {
        opacity: 1;
    }
`;

export const RobotConversationScene = styled.div<{
    $placement: "left" | "right";
}>`
    position: absolute;
    inset: 0;
    pointer-events: none;

    .conversation-thought {
        position: absolute;
        left: 50%;
        top: -12.8rem;
        width: min(22rem, calc(100vw - 2rem));
        transform: translateX(-50%);
        animation: ${bubbleIn} 260ms ease;
        pointer-events: auto;
    }

    .conversation-thought-shell {
        position: relative;
        padding: 1.2rem 1.35rem 1.25rem;
        overflow: visible;
        border-radius: 2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.2);
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.96) 0%, rgba(8, 18, 29, 0.92) 100%);
        box-shadow:
            0 1.2rem 3.2rem rgba(0, 0, 0, 0.28),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
    }

    .conversation-thought-scroll {
        max-height: 11.4rem;
        overflow-y: auto;
        touch-action: pan-y;
    }

    .conversation-thought-scroll::-webkit-scrollbar {
        width: 0.45rem;
    }

    .conversation-thought-scroll::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: rgba(var(--scene-accent-rgb), 0.18);
    }

    .conversation-thought-shell::before,
    .conversation-thought-shell::after {
        content: "";
        position: absolute;
        left: 50%;
        border-radius: 50%;
        background: rgba(var(--scene-panel-rgb), 0.92);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        box-shadow: 0 0.6rem 1.3rem rgba(0, 0, 0, 0.18);
        transform: translateX(-50%);
    }

    .conversation-thought-shell::before {
        bottom: -1rem;
        width: 1.3rem;
        height: 1.3rem;
    }

    .conversation-thought-shell::after {
        bottom: -1.95rem;
        width: 0.72rem;
        height: 0.72rem;
    }

    .conversation-thought-label {
        display: inline-flex;
        align-items: center;
        margin-bottom: 0.55rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.74rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .conversation-thought-copy {
        margin: 0;
        color: rgba(233, 246, 255, 0.96);
        font-size: 1rem;
        line-height: 1.68;
        white-space: pre-wrap;
    }

    .conversation-thought-copy.typing::after {
        content: "";
        display: inline-block;
        width: 0.58rem;
        height: 1.05rem;
        margin-left: 0.28rem;
        border-radius: 999px;
        background: rgba(var(--scene-accent-rgb), 0.76);
        vertical-align: middle;
        animation: ${statusPulse} 1s ease-in-out infinite;
    }

    .conversation-panel {
        position: absolute;
        top: 50%;
        width: min(18.5rem, calc(100vw - 2rem));
        padding: 1rem;
        border-radius: 1.7rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.95) 0%, rgba(6, 15, 25, 0.9) 100%);
        box-shadow:
            0 1.4rem 3rem rgba(0, 0, 0, 0.3),
            inset 0 0 0 1px rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(12px);
        animation: ${panelIn} 260ms ease;
        pointer-events: auto;
        transform: translateY(-52%);
    }

    ${({ $placement }) =>
        $placement === "right"
            ? css`
                  .conversation-panel {
                      left: calc(100% + 1.5rem);
                  }
              `
            : css`
                  .conversation-panel {
                      right: calc(100% + 1.5rem);
                  }
              `}

    .conversation-panel-header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 0.85rem;
        align-items: start;
        margin-bottom: 0.95rem;
    }

    .conversation-panel-title {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.28rem;
    }

    .conversation-panel-title strong {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.88rem;
        letter-spacing: 0.12em;
        line-height: 1.3;
        text-transform: uppercase;
    }

    .conversation-panel-title span {
        color: rgba(var(--scene-accent-soft-rgb), 0.68);
        font-size: 0.8rem;
        line-height: 1.45;
    }

    .conversation-close {
        width: 3rem;
        height: 3rem;
        padding: 0;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(10, 23, 33, 0.88);
        color: rgba(var(--scene-title-rgb), 0.9);
        touch-action: manipulation;
    }

    .conversation-status {
        margin-bottom: 0.9rem;
        padding: 0.7rem 0.85rem;
        border-radius: 1rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.1);
        background: rgba(255, 255, 255, 0.03);
    }

    .conversation-status strong,
    .conversation-status span {
        display: block;
    }

    .conversation-status strong {
        color: rgba(var(--scene-accent-soft-rgb), 0.75);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.68rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .conversation-status span {
        margin-top: 0.35rem;
        color: rgba(var(--scene-title-rgb), 0.92);
        font-size: 0.8rem;
        line-height: 1.45;
        overflow-wrap: anywhere;
    }

    .conversation-option-list {
        display: grid;
        gap: 0.72rem;
        max-height: 20rem;
        overflow-y: auto;
        padding-right: 0.25rem;
    }

    .conversation-option-list::-webkit-scrollbar {
        width: 0.55rem;
    }

    .conversation-option-list::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: rgba(var(--scene-accent-rgb), 0.18);
    }

    .conversation-option {
        width: 100%;
        min-width: 0;
        display: block;
        padding: 0.95rem 1rem;
        border-radius: 1.2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background:
            linear-gradient(180deg, rgba(var(--scene-accent-rgb), 0.08) 0%, rgba(9, 21, 35, 0.82) 100%);
        text-align: left;
        touch-action: manipulation;
        transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
    }

    .conversation-option:hover:not(:disabled) {
        transform: translateY(-0.08rem);
        border-color: rgba(var(--scene-accent-rgb), 0.24);
        box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.14);
    }

    .conversation-option:disabled {
        opacity: 0.62;
        cursor: default;
    }

    .conversation-option strong,
    .conversation-option span {
        display: block;
        min-width: 0;
    }

    .conversation-option strong {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-size: 0.92rem;
        line-height: 1.35;
        overflow-wrap: anywhere;
    }

    .conversation-option span {
        color: rgba(var(--scene-accent-soft-rgb), 0.66);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.68rem;
        letter-spacing: 0.08em;
        line-height: 1.4;
        text-transform: uppercase;
    }

    .conversation-option-empty {
        padding: 1rem;
        border-radius: 1.1rem;
        border: 1px dashed rgba(var(--scene-accent-rgb), 0.16);
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 0.84rem;
        line-height: 1.55;
    }

    @media (max-width: 1100px) {
        .conversation-thought {
            width: min(20rem, calc(100vw - 1.6rem));
        }

        .conversation-panel {
            width: min(16rem, calc(100vw - 1.4rem));
        }
    }

    @media (max-width: 900px) {
        .conversation-thought {
            top: -12.2rem;
        }

        .conversation-panel {
            top: -1rem;
            left: 50%;
            right: auto;
            width: min(17rem, calc(100vw - 1rem));
            transform: translate(-50%, -100%);
        }
    }

    @media (max-width: 640px) {
        .conversation-thought {
            top: -10.8rem;
            width: min(17.2rem, calc(100vw - 1rem));
        }

        .conversation-thought-shell {
            padding: 1rem 1.05rem 1.08rem;
        }

        .conversation-thought-scroll {
            max-height: 9.8rem;
        }

        .conversation-thought-copy {
            font-size: 0.9rem;
        }

        .conversation-panel {
            width: min(15.5rem, calc(100vw - 0.8rem));
            padding: 0.85rem;
        }

        .conversation-panel-title strong {
            font-size: 0.78rem;
        }

        .conversation-option {
            padding: 0.82rem 0.88rem;
        }

        .conversation-option strong {
            font-size: 0.84rem;
        }
    }
`;
