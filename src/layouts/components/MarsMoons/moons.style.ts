import styled from "styled-components";

export const MarsMoonsContainer = styled.div`
    --mars-moons-scale: 1;

    @keyframes marsMoonOrbit {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    @keyframes marsMoonRotation {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            transform: translate3d(-50%, 0, 0);
        }
    }

    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 2;

    .mars-moon-orbit {
        position: absolute;
        left: 50%;
        bottom: calc(var(--moon-orbit-bottom) * var(--mars-moons-scale));
        width: calc(var(--moon-orbit-size) * var(--mars-moons-scale));
        height: calc(var(--moon-orbit-size) * var(--mars-moons-scale));
        margin-left: calc((var(--moon-orbit-size) * var(--mars-moons-scale)) / -2);
        border-radius: 50%;
        animation: marsMoonOrbit var(--moon-orbit-duration) linear infinite;
        animation-delay: var(--moon-orbit-delay);
        will-change: transform;
    }

    .mars-moon-body {
        position: absolute;
        top: calc(var(--moon-top) * var(--mars-moons-scale));
        left: 50%;
        width: calc(var(--moon-size) * var(--mars-moons-scale));
        height: calc(var(--moon-size) * var(--mars-moons-scale));
        transform: translateX(-50%);
        border-radius: 50%;
        overflow: hidden;
        isolation: isolate;
        background:
            radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.16), transparent 22%),
            radial-gradient(circle at 68% 72%, rgba(10, 10, 16, 0.22), transparent 34%),
            linear-gradient(160deg, #d9d2c6 0%, #aa9f90 48%, #6a6257 100%);
        box-shadow:
            0 0 1.3rem rgba(255, 215, 192, 0.08),
            0 0 2rem rgba(0, 0, 0, 0.08);
    }

    .mars-moon-track {
        position: absolute;
        top: 0;
        left: 0;
        width: 400%;
        height: 100%;
        display: flex;
        opacity: 0.96;
        animation: marsMoonRotation var(--moon-spin-duration) linear infinite;
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .mars-moon-panel {
        flex: 0 0 50%;
        height: 100%;
        background-image: var(--moon-map);
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        filter: saturate(0.92) contrast(1.06) brightness(0.98);
    }

    .mars-moon-surface {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        overflow: hidden;
    }

    .mars-moon-surface::before,
    .mars-moon-surface::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        pointer-events: none;
    }

    .mars-moon-surface::before {
        background:
            radial-gradient(circle at 34% 30%, rgba(255, 255, 255, 0.12), transparent 22%),
            linear-gradient(120deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02) 36%, rgba(0, 0, 0, 0.18) 82%);
        mix-blend-mode: screen;
        opacity: 0.7;
    }

    .mars-moon-surface::after {
        background:
            radial-gradient(circle at 72% 72%, rgba(0, 0, 0, 0.22), transparent 34%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.18));
        mix-blend-mode: multiply;
        opacity: 0.68;
    }

    @media (max-width: 900px) {
        --mars-moons-scale: 0.82;
    }

    @media (max-width: 640px) {
        --mars-moons-scale: 0.68;
    }
`;
