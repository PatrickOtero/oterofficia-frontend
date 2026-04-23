import styled, { css, keyframes } from "styled-components";

const bubbleIn = keyframes`
    from {
        opacity: 0;
        transform: translate3d(-50%, 0.8rem, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(-50%, 0, 0);
    }
`;

const controlsIn = keyframes`
    from {
        opacity: 0;
        transform: translate3d(-50%, 0.7rem, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(-50%, 0, 0);
    }
`;

const modalIn = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, 0.9rem, 0) scale(0.98);
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

const promptListStyles = css`
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
        min-width: 0;
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
        max-height: min(22rem, 55vh);
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

    .conversation-option strong {
        display: block;
        min-width: 0;
        color: rgba(var(--scene-title-rgb), 0.95);
        font-size: 0.92rem;
        line-height: 1.35;
        overflow-wrap: anywhere;
    }

    .conversation-option-empty {
        padding: 1rem;
        border-radius: 1.1rem;
        border: 1px dashed rgba(var(--scene-accent-rgb), 0.16);
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 0.84rem;
        line-height: 1.55;
    }

    @media (max-width: 640px) {
        .conversation-panel-title strong {
            font-size: 0.78rem;
        }

        .conversation-panel-title span,
        .conversation-status span {
            font-size: 0.74rem;
        }

        .conversation-option-list {
            max-height: min(24rem, 52vh);
        }

        .conversation-option {
            padding: 0.82rem 0.88rem;
        }

        .conversation-option strong {
            font-size: 0.84rem;
        }
    }
`;

export const RobotConversationScene = styled.div<{
    $placement: "left" | "right";
}>`
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 12;

    ${promptListStyles}

    .conversation-thought {
        position: absolute;
        left: 50%;
        top: -12.4rem;
        width: min(21rem, calc(100vw - 2rem));
        transform: translateX(-50%);
        animation: ${bubbleIn} 260ms ease;
        pointer-events: auto;
    }

    .conversation-thought-shell {
        position: relative;
        padding: 1.15rem 1.25rem 1.2rem;
        overflow: visible;
        border-radius: 1.85rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.2);
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.96) 0%, rgba(8, 18, 29, 0.92) 100%);
        box-shadow:
            0 1.2rem 3.2rem rgba(0, 0, 0, 0.28),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
    }

    .conversation-thought-scroll {
        max-height: 10.8rem;
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
        width: 1.24rem;
        height: 1.24rem;
    }

    .conversation-thought-shell::after {
        bottom: -1.88rem;
        width: 0.68rem;
        height: 0.68rem;
    }

    .conversation-thought-label {
        display: inline-flex;
        align-items: center;
        margin-bottom: 0.5rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.74rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .conversation-thought-copy {
        margin: 0;
        color: rgba(233, 246, 255, 0.96);
        font-size: 0.98rem;
        line-height: 1.62;
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

    .conversation-controls {
        position: absolute;
        left: 50%;
        top: -2rem;
        width: min(18rem, calc(100vw - 2rem));
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 0.55rem;
        align-items: center;
        transform: translateX(-50%);
        animation: ${controlsIn} 260ms ease;
        pointer-events: auto;
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
        animation: ${modalIn} 260ms ease;
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

    .conversation-launcher {
        min-width: 0;
        min-height: 3.15rem;
        padding: 0.72rem 0.95rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.92) 0%, rgba(8, 18, 29, 0.88) 100%);
        box-shadow:
            0 0.9rem 2rem rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0.12rem;
        text-align: left;
        touch-action: manipulation;
    }

    .conversation-launcher strong,
    .conversation-launcher span {
        display: block;
        min-width: 0;
    }

    .conversation-launcher strong {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.7rem;
        letter-spacing: 0.12em;
        line-height: 1.2;
        text-transform: uppercase;
    }

    .conversation-launcher span {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 0.72rem;
        line-height: 1.35;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .conversation-end-button {
        width: 3.05rem;
        height: 3.05rem;
        min-width: 0;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.92) 0%, rgba(8, 18, 29, 0.88) 100%);
        color: rgba(var(--scene-title-rgb), 0.9);
        box-shadow:
            0 0.9rem 2rem rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        touch-action: manipulation;
    }

    @media (max-width: 900px) {
        .conversation-panel {
            display: none;
        }

        .conversation-thought {
            top: -11.2rem;
            width: min(18rem, calc(100vw - 1rem));
        }

        .conversation-thought-scroll {
            max-height: 8.8rem;
        }

        .conversation-controls {
            top: calc(50% + 6rem);
            width: auto;
            max-width: calc(100vw - 1rem);
            display: inline-flex;
            justify-content: center;
        }

        .conversation-launcher {
            width: min(11.8rem, calc(100vw - 5rem));
            align-items: center;
            text-align: center;
        }

        .conversation-launcher strong,
        .conversation-launcher span {
            width: 100%;
        }
    }

    @media (max-width: 640px) {
        .conversation-thought {
            top: -10.2rem;
            width: min(16.5rem, calc(100vw - 0.8rem));
        }

        .conversation-thought-shell {
            padding: 0.95rem 1rem 1.02rem;
            border-radius: 1.55rem;
        }

        .conversation-thought-scroll {
            max-height: 7.4rem;
        }

        .conversation-thought-copy {
            font-size: 0.9rem;
        }

        .conversation-controls {
            top: calc(50% + 5.25rem);
            width: auto;
            max-width: calc(100vw - 0.8rem);
            display: inline-flex;
            justify-content: center;
            gap: 0.45rem;
        }

        .conversation-launcher {
            min-height: 2.92rem;
            padding: 0.68rem 0.86rem;
            width: min(10.9rem, calc(100vw - 4.5rem));
        }

        .conversation-launcher strong {
            font-size: 0.66rem;
        }

        .conversation-launcher span {
            font-size: 0.66rem;
        }

        .conversation-end-button {
            width: 2.9rem;
            height: 2.9rem;
        }
    }
`;

export const RobotConversationModalPortal = styled.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(1rem, 3vw, 2rem);
    background: rgba(3, 10, 16, 0.74);
    backdrop-filter: blur(10px);

    .conversation-modal-shell {
        width: min(34rem, 100%);
        max-height: min(42rem, calc(100vh - 2rem));
        padding: 1.1rem;
        border-radius: 2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.96) 0%, rgba(6, 15, 25, 0.94) 100%);
        box-shadow:
            0 1.6rem 3.8rem rgba(0, 0, 0, 0.34),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        overflow: hidden;
        animation: ${modalIn} 260ms ease;
    }

    ${promptListStyles}

    @media (max-width: 900px) {
        align-items: flex-end;
        padding: 0.9rem;

        .conversation-modal-shell {
            width: min(32rem, 100%);
            max-height: calc(100vh - 1rem);
            border-radius: 1.8rem;
        }
    }

    @media (max-width: 640px) {
        padding: 0.7rem;

        .conversation-modal-shell {
            width: 100%;
            max-height: calc(100vh - 0.7rem);
            padding: 0.9rem;
            border-radius: 1.7rem 1.7rem 1.2rem 1.2rem;
        }
    }
`;
