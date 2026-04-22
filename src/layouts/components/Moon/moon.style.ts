import styled from "styled-components";
import moonMap from "../../../assets/moon-map.jpg";

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
            transform: translate3d(0, 0, 0);
        }

        to {
            transform: translate3d(-50%, 0, 0);
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
        isolation: isolate;

        background:
            radial-gradient(circle at 34% 26%, rgba(255, 255, 255, 0.18), transparent 22%),
            radial-gradient(circle at 68% 72%, rgba(68, 77, 93, 0.24), transparent 38%),
            linear-gradient(160deg, #eef2f6 0%, #dce1e8 48%, #b9c1cb 100%);
        box-shadow:
            0 0 2.2rem rgba(255, 255, 255, 0.08),
            0 0 4rem rgba(255, 255, 255, 0.03);
    }

    .moon-surface {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        overflow: hidden;
    }

    .moon-map-track {
        position: absolute;
        top: 0;
        left: 0;
        width: 400%;
        height: 100%;
        display: flex;
        opacity: 0.92;
        animation: moonSpin var(--moon-spin-duration) linear infinite;
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .moon-map-panel {
        flex: 0 0 50%;
        height: 100%;
        background-image: url(${moonMap});
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        filter: saturate(0.88) contrast(1.06) brightness(0.98);
    }

    .moon-surface::before,
    .moon-surface::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        pointer-events: none;
    }

    .moon-surface::before {
        background:
            radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.12), transparent 22%),
            radial-gradient(circle at 58% 46%, rgba(255, 255, 255, 0.08), transparent 34%),
            linear-gradient(110deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02) 34%, rgba(0, 0, 0, 0.18) 78%);
        mix-blend-mode: screen;
        opacity: 0.74;
    }

    .moon-surface::after {
        background:
            radial-gradient(circle at 72% 72%, rgba(0, 0, 0, 0.2), transparent 36%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.14));
        mix-blend-mode: multiply;
        opacity: 0.66;
    }

    @media (max-width: 900px) {
        --orbit-size: 88rem;
        --moon-size: 6.8rem;

        .moon-orbit {
            bottom: -33rem;
        }
    }
`;
