import styled from "styled-components";

export const OrbitalMoonsContainer = styled.div`
    --planetary-moons-scale: 1;
    --planetary-moons-tablet-scale: 0.82;
    --planetary-moons-mobile-scale: 0.68;

    @keyframes orbitalMoonRotation {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            transform: translate3d(-50%, 0, 0);
        }
    }

    position: absolute;
    inset: 0;
    overflow: visible;
    pointer-events: none;

    .orbital-moon-system {
        position: absolute;
        left: 50%;
        top: var(--moon-center-y);
        width: 0;
        height: 0;
        --moon-orbit-radius-x: calc(var(--moon-orbit-width) * var(--planetary-moons-scale) / 2);
        --moon-orbit-radius-y: calc(var(--moon-orbit-height) * var(--planetary-moons-scale) / 2);
        overflow: visible;
    }

    .orbital-moon-position {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(var(--moon-size) * var(--planetary-moons-scale));
        height: calc(var(--moon-size) * var(--planetary-moons-scale));
        transform:
            translate(-50%, -50%)
            translate3d(
                calc(var(--moon-orbit-radius-x) * var(--moon-orbit-x, 0)),
                calc(var(--moon-orbit-radius-y) * var(--moon-orbit-y, -1)),
                0
            );
        will-change: transform;
    }

    .orbital-moon-depth {
        position: absolute;
        inset: 0;
        transform: scale(var(--moon-depth-scale, 1));
        filter:
            brightness(var(--moon-depth-brightness, 1))
            saturate(var(--moon-depth-saturation, 1));
        will-change: transform;
    }

    .orbital-moon-body {
        position: absolute;
        inset: 0;
        transform:
            rotate(var(--moon-body-rotate, 0deg))
            scale(var(--moon-body-scale-x, 1), var(--moon-body-scale-y, 1));
        border-radius: var(--moon-body-radius, 50%);
        clip-path: var(--moon-body-clip-path, none);
        overflow: hidden;
        isolation: isolate;
        background:
            radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.16), transparent 22%),
            radial-gradient(circle at 68% 72%, var(--moon-shadow), transparent 34%),
            linear-gradient(160deg, var(--moon-shell-start) 0%, var(--moon-shell-mid) 52%, var(--moon-shell-end) 100%);
        box-shadow:
            0 0 1.4rem var(--moon-glow),
            0 0 2.4rem rgba(0, 0, 0, 0.08);
        filter: saturate(1.01) brightness(1);
    }

    .orbital-moon-surface {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        overflow: hidden;
    }

    .orbital-moon-track {
        position: absolute;
        top: 0;
        left: 0;
        width: 400%;
        height: 100%;
        display: flex;
        opacity: var(--moon-track-opacity, 0.94);
        animation: orbitalMoonRotation var(--moon-spin-duration) linear infinite;
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .orbital-moon-panel {
        flex: 0 0 50%;
        height: 100%;
        background-image: var(--moon-map);
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        filter: var(--moon-map-filter, saturate(0.92) contrast(1.06) brightness(0.98));
    }

    .orbital-moon-surface::before,
    .orbital-moon-surface::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
    }

    .orbital-moon-surface::before {
        background:
            radial-gradient(circle at 34% 30%, rgba(255, 255, 255, 0.14), transparent 22%),
            linear-gradient(120deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02) 36%, rgba(0, 0, 0, 0.18) 82%);
        mix-blend-mode: screen;
        opacity: 0.72;
    }

    .orbital-moon-surface::after {
        background:
            radial-gradient(circle at 72% 72%, rgba(0, 0, 0, 0.2), transparent 34%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.18));
        mix-blend-mode: multiply;
        opacity: 0.68;
    }

    @media (max-width: 900px) {
        --planetary-moons-scale: var(--planetary-moons-tablet-scale);
    }

    @media (prefers-reduced-motion: reduce) {
        .orbital-moon-track {
            animation: none;
        }
    }

    @media (max-width: 640px) {
        --planetary-moons-scale: var(--planetary-moons-mobile-scale);
    }
`;
