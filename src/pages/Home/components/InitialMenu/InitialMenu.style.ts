import styled from "styled-components";

export const InitialMenuContainer = styled.div`
    --panel-glow-opacity: 0.14;
    --panel-opacity: 0.84;

    @keyframes hologramMenuShowing {
        from {
            opacity: 0;
            transform: translate3d(0, 1.2rem, 0) scale(0.985);
        }

        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    position: relative;
    z-index: 8;

    width: min(38rem, 84vw);
    animation: hologramMenuShowing 420ms cubic-bezier(0.2, 1, 0.2, 1);

    .initial-menu-main {
        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1.2rem;

        width: 100%;
        padding: 2.4rem 2rem 2rem;

        overflow: hidden;
        border-radius: 2.4rem;
        border: 1px solid rgba(var(--scene-accent-rgb), var(--scene-panel-border-opacity));
        background:
            linear-gradient(
                180deg,
                rgba(var(--scene-panel-rgb), calc(var(--panel-opacity) + 0.03)) 0%,
                rgba(6, 12, 18, calc(var(--panel-opacity) - 0.08)) 100%
            );
        box-shadow:
            0 1.4rem 3rem rgba(0, 0, 0, 0.22),
            inset 0 0 0 1px rgba(255, 255, 255, 0.025),
            inset 0 0 2rem rgba(var(--scene-accent-rgb), var(--panel-glow-opacity));
        backdrop-filter: blur(10px);
    }

    .initial-menu-auth,
    .initial-menu-session {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        padding: 0.2rem 0 1rem;
    }

    .auth-title,
    .session-user {
        font-family: "IBM Plex Mono", monospace;
        text-transform: uppercase;
    }

    .auth-title {
        color: rgba(var(--scene-accent-soft-rgb), 0.62);
        font-size: 0.98rem;
        letter-spacing: 0.16em;
    }

    .session-user {
        color: rgba(var(--scene-title-rgb), 0.94);
        font-size: 1.22rem;
        letter-spacing: 0.08em;
    }

    .auth-actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }

    .initial-menu-main::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.3;
        background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, transparent 20%),
            linear-gradient(
                90deg,
                rgba(var(--scene-accent-rgb), 0.04) 0%,
                transparent 20%,
                transparent 80%,
                rgba(var(--scene-accent-rgb), 0.04) 100%
            );
    }

    button {
        width: 100%;
        height: 4.9rem;
        margin-bottom: 0;
        font-size: 1.2rem;
    }

    .auth-button {
        height: 4.2rem;
        font-size: 1.02rem;
    }

    .auth-button.secondary {
        background: rgba(var(--scene-accent-rgb), 0.06);
    }

    @media (max-width: 900px) {
        width: min(38rem, 90vw);

        .initial-menu-main {
            padding: 2rem 1.6rem 1.8rem;
            gap: 1rem;
        }

        button {
            height: 4.6rem;
            font-size: 1.08rem;
        }

        .auth-actions {
            grid-template-columns: 1fr;
            gap: 0.8rem;
        }

        .auth-button {
            height: 4.4rem;
        }
    }
`;
