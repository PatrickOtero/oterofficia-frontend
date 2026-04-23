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
    gap: 0.72rem;

    pointer-events: none;
    user-select: none;
    transform:
        translate3d(
            calc(var(--scene-camera-x, 0px) * -0.05),
            calc(var(--scene-camera-y, 0px) * -0.05),
            0
        )
        scale(calc(1 + ((var(--scene-camera-zoom, 1) - 1) * 0.02)));
    transform-origin: left top;
    will-change: transform;

    .site-sign-emblem {
        position: relative;
        width: 3.2rem;
        height: 3.2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background:
            radial-gradient(circle, rgba(var(--scene-accent-rgb), 0.16) 0%, rgba(var(--scene-accent-rgb), 0.02) 62%, transparent 100%);
        box-shadow:
            0 0 1.6rem rgba(var(--scene-accent-rgb), 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.02);
    }

    .site-sign-emblem-core,
    .site-sign-emblem-ring {
        position: absolute;
        border-radius: 50%;
    }

    .site-sign-emblem-core {
        width: 0.72rem;
        height: 0.72rem;
        background: radial-gradient(circle, rgba(var(--scene-title-rgb), 0.98) 0%, rgba(var(--scene-accent-soft-rgb), 0.82) 100%);
        box-shadow:
            0 0 0.8rem rgba(var(--scene-accent-soft-rgb), 0.28),
            0 0 1.4rem rgba(var(--scene-accent-rgb), 0.16);
    }

    .site-sign-emblem-ring {
        width: 2.1rem;
        height: 2.1rem;
        border: 1px solid rgba(var(--scene-accent-soft-rgb), 0.28);
        box-shadow:
            0 0 1rem rgba(var(--scene-accent-rgb), 0.08),
            inset 0 0 0.8rem rgba(var(--scene-accent-rgb), 0.06);
    }

    .site-sign-title {
        margin: 0;

        color: rgba(var(--scene-title-rgb), 0.97);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(2.7rem, 3.9vw, 4.9rem);
        font-weight: 700;
        line-height: 0.95;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        background: linear-gradient(
            180deg,
            rgba(246, 252, 255, 0.98) 0%,
            rgba(218, 239, 255, 0.92) 54%,
            rgba(171, 224, 255, 0.8) 100%
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;

        text-shadow:
            0 0 1rem rgba(var(--scene-accent-soft-rgb), 0.1),
            0 0 2.4rem rgba(var(--scene-accent-rgb), 0.08);
    }

    .site-sign-rule {
        width: 7.8rem;
        height: 0.18rem;
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
        left: 1.6rem;
        top: 1.4rem;
        max-width: calc(100vw - 3.2rem);
        gap: 0.45rem;

        .site-sign-emblem {
            width: 2.35rem;
            height: 2.35rem;
        }

        .site-sign-emblem-ring {
            width: 1.6rem;
            height: 1.6rem;
        }

        .site-sign-emblem-core {
            width: 0.58rem;
            height: 0.58rem;
        }

        .site-sign-title {
            font-size: clamp(1.6rem, 8vw, 2.45rem);
            letter-spacing: 0.1em;
        }

        .site-sign-rule {
            width: 4.1rem;
        }
    }
`;
