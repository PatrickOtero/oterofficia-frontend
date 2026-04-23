import styled from "styled-components";

export const UserDockContainer = styled.div`
    position: fixed;
    top: clamp(1.1rem, 3vh, 2rem);
    right: clamp(1rem, 3vw, 2.2rem);
    z-index: 14;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.65rem;
    pointer-events: none;

    .user-dock-access-row {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.55rem;
    }

    .user-dock-trigger,
    .user-dock-shortcut,
    .user-dock-panel,
    .user-dock-action {
        pointer-events: auto;
    }

    .user-dock-shortcut,
    .user-dock-trigger {
        min-width: 0;
        height: 3.2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.62rem;
        padding: 0 0.88rem 0 0.76rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background:
            linear-gradient(180deg, rgba(11, 21, 32, 0.88) 0%, rgba(7, 13, 21, 0.82) 100%);
        color: rgba(var(--scene-title-rgb), 0.94);
        box-shadow:
            0 0.8rem 1.8rem rgba(0, 0, 0, 0.18),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
        transition:
            border-color 160ms ease,
            background 160ms ease,
            transform 160ms ease,
            box-shadow 160ms ease;
    }

    .user-dock-shortcut {
        padding: 0 1rem;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.66rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(var(--scene-accent-soft-rgb), 0.9);
    }

    .user-dock-shortcut.admin {
        background:
            linear-gradient(180deg, rgba(var(--scene-accent-rgb), 0.16) 0%, rgba(12, 20, 29, 0.82) 100%);
    }

    .user-dock-shortcut.active,
    .user-dock-shortcut:hover,
    .user-dock-trigger:hover,
    .user-dock-trigger[aria-expanded="true"] {
        transform: translate3d(0, -1px, 0);
        border-color: rgba(var(--scene-accent-rgb), 0.26);
        box-shadow:
            0 0.95rem 2rem rgba(0, 0, 0, 0.2),
            0 0 1.1rem rgba(var(--scene-accent-rgb), 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
    }

    .user-dock-trigger-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.04rem;
    }

    .user-dock-trigger-caption,
    .user-dock-trigger-label {
        font-family: "IBM Plex Mono", monospace;
        text-transform: uppercase;
    }

    .user-dock-trigger-caption {
        color: rgba(var(--scene-accent-soft-rgb), 0.6);
        font-size: 0.48rem;
        letter-spacing: 0.16em;
        line-height: 1.1;
    }

    .user-dock-trigger-label {
        color: rgba(var(--scene-title-rgb), 0.96);
        max-width: 7rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.74rem;
        letter-spacing: 0.08em;
        line-height: 1.1;
        white-space: nowrap;
    }

    .user-dock-panel {
        width: min(20.5rem, calc(100vw - 2rem));
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.72rem;
        padding: 0.82rem;
        border-radius: 1.28rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background:
            linear-gradient(180deg, rgba(12, 21, 32, 0.92) 0%, rgba(6, 12, 20, 0.84) 100%);
        box-shadow:
            0 1rem 2.4rem rgba(0, 0, 0, 0.22),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
        opacity: 0;
        visibility: hidden;
        transform: translate3d(0, -0.35rem, 0) scale(0.98);
        transform-origin: top right;
        pointer-events: none;
        transition:
            opacity 160ms ease,
            visibility 160ms ease,
            transform 180ms ease;
    }

    .user-dock-panel.open {
        opacity: 1;
        visibility: visible;
        transform: translate3d(0, 0, 0) scale(1);
        pointer-events: auto;
    }

    .user-dock-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.8rem;
    }

    .user-dock-copy {
        display: flex;
        flex-direction: column;
        gap: 0.16rem;
        min-width: 0;
    }

    .user-dock-caption,
    .user-dock-status,
    .user-dock-role {
        font-family: "IBM Plex Mono", monospace;
        text-transform: uppercase;
    }

    .user-dock-caption {
        color: rgba(var(--scene-accent-soft-rgb), 0.68);
        font-size: 0.54rem;
        letter-spacing: 0.16em;
    }

    .user-dock-status {
        color: rgba(var(--scene-title-rgb), 0.97);
        font-size: 0.8rem;
        line-height: 1.1;
        letter-spacing: 0.08em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .user-dock-role {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 1.7rem;
        padding: 0 0.58rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-title-rgb), 0.92);
        font-size: 0.52rem;
        letter-spacing: 0.12em;
        white-space: nowrap;
    }

    .user-dock-actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.5rem;
    }

    .user-dock-action {
        width: 100%;
        min-width: 0;
        min-height: 2.65rem;
        padding: 0 0.72rem;
        border-radius: 0.95rem;
        font-size: 0.62rem;
        letter-spacing: 0.1em;
    }

    .user-dock-action.secondary {
        background:
            linear-gradient(180deg, rgba(18, 31, 46, 0.72) 0%, rgba(10, 18, 28, 0.7) 100%);
    }

    .user-dock-action.admin {
        border-color: rgba(var(--scene-accent-rgb), 0.24);
        color: rgba(var(--scene-title-rgb), 0.96);
        box-shadow: inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.08);
    }

    .user-dock-action.ghost {
        background: rgba(255, 255, 255, 0.02);
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
    }

    .user-dock-action.active {
        border-color: rgba(var(--scene-accent-rgb), 0.34);
        color: rgba(var(--scene-title-rgb), 0.96);
        box-shadow:
            inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.08),
            0 0 1.1rem rgba(var(--scene-accent-rgb), 0.08);
    }

    @media (max-width: 900px) {
        top: 1rem;
        right: 1rem;
        left: auto;

        .user-dock-access-row {
            gap: 0.45rem;
        }

        .user-dock-trigger {
            height: 3rem;
            padding: 0 0.78rem 0 0.68rem;
        }

        .user-dock-shortcut {
            height: 3rem;
            padding: 0 0.88rem;
            font-size: 0.6rem;
        }

        .user-dock-panel {
            width: min(17rem, calc(100vw - 1rem));
            padding: 0.74rem;
            gap: 0.64rem;
        }

        .user-dock-trigger-caption {
            display: none;
        }

        .user-dock-trigger-label {
            font-size: 0.7rem;
        }

        .user-dock-status {
            font-size: 0.74rem;
        }

        .user-dock-actions {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .user-dock-action {
            min-height: 2.55rem;
            font-size: 0.58rem;
        }
    }

    @media (max-width: 640px) {
        .user-dock-access-row {
            gap: 0.38rem;
        }

        .user-dock-shortcut,
        .user-dock-trigger {
            height: 2.8rem;
        }

        .user-dock-shortcut {
            padding: 0 0.78rem;
            font-size: 0.56rem;
        }

        .user-dock-trigger {
            padding: 0 0.72rem 0 0.62rem;
        }

        .user-dock-panel {
            width: min(14.4rem, calc(100vw - 1rem));
        }
    }
`;
