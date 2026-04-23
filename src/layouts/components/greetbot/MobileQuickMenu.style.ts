import styled from "styled-components";
import type { RobotQuickMenuLauncherMode } from "./RobotQuickMenu.types";

export const MobileQuickMenuContainer = styled.div<{ $mode: RobotQuickMenuLauncherMode }>`
    position: fixed;
    left: ${({ $mode }) => ($mode === "content" ? "auto" : "50%")};
    right: ${({ $mode }) => ($mode === "content" ? "clamp(1rem, 3vw, 2rem)" : "auto")};
    bottom: ${({ $mode }) =>
        $mode === "content"
            ? "max(2.4rem, calc(env(safe-area-inset-bottom) + 2.4rem))"
            : "max(7rem, calc(env(safe-area-inset-bottom) + 7rem))"};
    z-index: 13;
    display: flex;
    flex-direction: column;
    align-items: ${({ $mode }) => ($mode === "content" ? "flex-end" : "center")};
    gap: 0.8rem;
    transform: ${({ $mode }) => ($mode === "content" ? "none" : "translateX(-50%)")};
    pointer-events: none;

    .mobile-quick-menu-trigger,
    .mobile-quick-menu-panel,
    .mobile-quick-menu-item,
    .mobile-quick-menu-nav {
        pointer-events: auto;
    }

    .mobile-quick-menu-trigger {
        width: auto;
        min-width: 0;
        height: 4.3rem;
        padding: 0 1.3rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.7rem;
        border-radius: 999px;
        font-size: 0.78rem;
        letter-spacing: 0.08em;
    }

    .mobile-quick-menu-panel {
        width: min(34rem, calc(100vw - 1.8rem));
        display: grid;
        gap: 0.7rem;
        padding: 0.9rem;
        border-radius: 2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background:
            linear-gradient(180deg, rgba(11, 20, 31, 0.96) 0%, rgba(5, 10, 18, 0.92) 100%);
        box-shadow:
            0 1.1rem 2.4rem rgba(0, 0, 0, 0.24),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(10px);
    }

    ${({ $mode }) =>
        $mode === "content"
            ? `
                .mobile-quick-menu-trigger {
                    height: 3.5rem;
                    padding: 0 1.05rem;
                    font-size: 0.7rem;
                }

                .mobile-quick-menu-panel {
                    width: min(18rem, calc(100vw - 1.4rem));
                }
            `
            : ""}

    .mobile-quick-menu-item {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 0.8rem;
        width: 100%;
        min-width: 0;
        min-height: 4.4rem;
        padding: 0.9rem 1rem;
        border-radius: 1.5rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(11, 20, 31, 0.74);
    }

    .mobile-quick-menu-item-main {
        min-width: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 0.8rem;
        box-shadow: none;
    }

    .mobile-quick-menu-item-main:hover {
        transform: none;
        background: transparent;
        box-shadow: none;
    }

    .mobile-quick-menu-icon,
    .mobile-quick-menu-nav {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .mobile-quick-menu-icon {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(var(--scene-accent-rgb), 0.18) 0%, rgba(var(--scene-accent-rgb), 0.02) 72%);
        color: rgba(var(--scene-title-rgb), 0.96);
    }

    .mobile-quick-menu-copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.14rem;
        align-items: flex-start;
    }

    .mobile-quick-menu-label,
    .mobile-quick-menu-caption,
    .mobile-quick-menu-nav {
        font-family: "IBM Plex Mono", monospace;
        text-transform: uppercase;
    }

    .mobile-quick-menu-label {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-size: 0.78rem;
        letter-spacing: 0.08em;
    }

    .mobile-quick-menu-caption {
        color: rgba(var(--scene-accent-soft-rgb), 0.68);
        font-size: 0.62rem;
        letter-spacing: 0.06em;
    }

    .mobile-quick-menu-controls {
        display: flex;
        align-items: center;
        gap: 0.45rem;
    }

    .mobile-quick-menu-nav {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-title-rgb), 0.96);
        font-size: 0.84rem;
        letter-spacing: 0.02em;
    }

    .mobile-quick-menu-badge {
        min-width: 1.8rem;
        height: 1.8rem;
        padding: 0 0.45rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: linear-gradient(180deg, rgba(82, 182, 255, 0.96) 0%, rgba(45, 119, 255, 0.9) 100%);
        color: rgba(244, 251, 255, 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.72rem;
        letter-spacing: 0.08em;
    }

    @media (max-width: 900px) {
        left: ${({ $mode }) => ($mode === "content" ? "auto" : "50%")};
        right: ${({ $mode }) => ($mode === "content" ? "1rem" : "auto")};
    }

    @media (max-width: 640px) {
        bottom: ${({ $mode }) =>
            $mode === "content"
                ? "max(1.2rem, calc(env(safe-area-inset-bottom) + 1.2rem))"
                : "max(7rem, calc(env(safe-area-inset-bottom) + 7rem))"};

        .mobile-quick-menu-trigger {
            height: ${({ $mode }) => ($mode === "content" ? "3.15rem" : "4.1rem")};
            padding: ${({ $mode }) => ($mode === "content" ? "0 0.9rem" : "0 1.15rem")};
            font-size: ${({ $mode }) => ($mode === "content" ? "0.64rem" : "0.74rem")};
        }

        ${({ $mode }) =>
            $mode === "content"
                ? `
                    .mobile-quick-menu-panel {
                        width: min(15.5rem, calc(100vw - 1rem));
                    }
                `
                : ""}
    }
`;
