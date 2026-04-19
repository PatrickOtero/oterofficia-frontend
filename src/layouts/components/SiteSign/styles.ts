import styled from "styled-components";

export const SiteSignContainer = styled.div`
    position: absolute;
    left: clamp(3rem, 6vw, 7rem);
    top: clamp(4rem, 9vh, 7rem);
    z-index: 8;
    max-width: min(44rem, calc(100vw - 16rem));

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;

    pointer-events: none;
    user-select: none;

    .site-sign-kicker {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
    }

    .site-sign-title {
        margin: 0;

        color: rgba(var(--scene-title-rgb), 0.97);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(2.6rem, 3.6vw, 4.6rem);
        font-weight: 700;
        line-height: 0.95;
        letter-spacing: 0.12em;
        text-transform: uppercase;

        text-shadow:
            0 0 1.2rem rgba(var(--scene-accent-soft-rgb), 0.12),
            0 0 2.4rem rgba(var(--scene-accent-rgb), 0.08);
    }

    .site-sign-rule {
        width: 8.5rem;
        height: 0.14rem;
        border-radius: 999px;

        background: linear-gradient(
            90deg,
            rgba(var(--scene-accent-rgb), 0) 0%,
            rgba(var(--scene-accent-rgb), 0.92) 50%,
            rgba(var(--scene-accent-rgb), 0) 100%
        );

        opacity: 0.9;
    }

    @media (max-width: 900px) {
        left: 2rem;
        top: 2.4rem;
        max-width: calc(100vw - 4rem);

        .site-sign-kicker {
            font-size: 0.82rem;
            letter-spacing: 0.16em;
        }

        .site-sign-title {
            font-size: clamp(2rem, 8vw, 3.1rem);
            letter-spacing: 0.1em;
        }

        .site-sign-rule {
            width: 6rem;
        }
    }
`;