import styled from "styled-components";

export const MoonContainer = styled.div`
    --orbit-size: 110rem;
    --orbit-duration: 150s;
    --moon-size: 9rem;
    --moon-spin-duration: 180s;

    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 2;

    @keyframes moonOrbit {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    @keyframes moonSpin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .moon-orbit {
        position: absolute;
        left: 50%;
        bottom: -42rem;

        width: var(--orbit-size);
        height: var(--orbit-size);
        margin-left: calc(var(--orbit-size) / -2);

        border-radius: 50%;
        transform-origin: center center;
        animation: moonOrbit var(--orbit-duration) linear infinite;
        will-change: transform;
    }

    .moon-body {
        position: absolute;
        top: 4.6rem;
        left: 50%;

        width: var(--moon-size);
        height: var(--moon-size);
        transform: translateX(-50%);
        border-radius: 50%;
        overflow: hidden;

        background:
            radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.16), transparent 24%),
            radial-gradient(circle at 50% 50%, #eef2f6 0%, #d8dde4 58%, #bcc4ce 100%);
        box-shadow:
            0 0 2.2rem rgba(255, 255, 255, 0.08),
            0 0 4rem rgba(255, 255, 255, 0.03);
    }

    .moon-surface {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        animation: moonSpin var(--moon-spin-duration) linear infinite;
        will-change: transform;
    }

    .moon-surface::before,
    .moon-surface::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
    }

    .moon-surface::before {
        background:
            radial-gradient(circle at 24% 30%, rgba(145, 156, 170, 0.24) 0 8%, transparent 9%),
            radial-gradient(circle at 62% 27%, rgba(145, 156, 170, 0.2) 0 6%, transparent 7%),
            radial-gradient(circle at 56% 56%, rgba(145, 156, 170, 0.24) 0 11%, transparent 12%),
            radial-gradient(circle at 34% 68%, rgba(145, 156, 170, 0.18) 0 7%, transparent 8%),
            radial-gradient(circle at 74% 70%, rgba(145, 156, 170, 0.16) 0 5%, transparent 6%);
        opacity: 0.86;
    }

    .moon-surface::after {
        background:
            radial-gradient(circle at 38% 40%, rgba(255, 255, 255, 0.08), transparent 42%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.08));
        mix-blend-mode: screen;
        opacity: 0.72;
    }

    @media (max-width: 900px) {
        --orbit-size: 88rem;
        --moon-size: 6.8rem;

        .moon-orbit {
            bottom: -33rem;
        }
    }
`;