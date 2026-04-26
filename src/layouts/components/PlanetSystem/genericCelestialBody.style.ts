import styled from "styled-components";
import { EARTH_SCENE_CENTER_Y } from "./sceneAnchors";

export const GenericCelestialContainer = styled.div`
    position: absolute;
    inset: 0;
    z-index: 2;
    overflow: visible;
    pointer-events: none;
    --generic-body-glow: rgba(255, 255, 255, 0.1);
    --generic-body-scale: 1;
    --generic-body-shell: linear-gradient(145deg, #d7d7d7, #707070);
    --generic-body-size: 62rem;
    --generic-body-texture: transparent;
    --generic-body-texture-size: 100% 100%;
    --generic-body-rotation-duration: 180s;
    --generic-map-filter: saturate(1.05) contrast(1.04) brightness(1);
    --generic-map-opacity: 0.96;
    --generic-ring-color: rgba(255, 255, 255, 0.2);
    --generic-ring-height: 18rem;
    --generic-ring-opacity: 0.4;
    --generic-ring-rotate-offset: 0deg;
    --generic-ring-width: 100rem;
    --planet-inclination: 0deg;

    @keyframes genericBodyRotation {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            transform: translate3d(-50%, 0, 0);
        }
    }

    .generic-body {
        position: absolute;
        left: 50%;
        top: ${EARTH_SCENE_CENTER_Y};
        width: min(var(--generic-body-size), 132vw);
        height: min(var(--generic-body-size), 132vw);
        transform: translate(-50%, -50%) rotate(var(--planet-inclination)) scale(var(--generic-body-scale));
        border-radius: 50%;
        overflow: hidden;
        background:
            radial-gradient(circle at 30% 22%, rgba(255, 255, 255, 0.22), transparent 18%),
            radial-gradient(circle at 74% 76%, rgba(0, 0, 0, 0.34), transparent 34%),
            var(--generic-body-shell);
        background-position: center;
        background-repeat: no-repeat;
        background-size:
            100% 100%,
            100% 100%,
            100% 100%;
        box-shadow:
            inset -4rem -1.2rem 4.6rem rgba(0, 0, 0, 0.25),
            0 0 3rem var(--generic-body-glow);
        transition: transform 520ms ease;
        z-index: 2;
    }

    .generic-map-track {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 100%;
        display: flex;
        animation: genericBodyRotation var(--generic-body-rotation-duration) linear infinite;
        opacity: var(--generic-map-opacity);
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .generic-map-panel {
        flex: 0 0 50%;
        height: 100%;
        background-image: var(--generic-body-texture);
        background-position: center;
        background-repeat: repeat-x;
        background-size: var(--generic-body-texture-size);
        filter: var(--generic-map-filter);
    }

    .generic-body::after {
        content: "";
        position: absolute;
        inset: -1.2rem;
        border-radius: inherit;
        pointer-events: none;
        box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset -4.4rem -1.4rem 4.6rem rgba(0, 0, 0, 0.22),
            0 0 2.4rem var(--generic-body-glow);
    }

    .generic-body-haumea {
        border-radius: 48% / 38%;
        transform: translate(-50%, -50%) rotate(var(--planet-inclination)) scale(1.55, 0.78);
    }

    .generic-ring {
        position: absolute;
        left: 50%;
        top: ${EARTH_SCENE_CENTER_Y};
        width: var(--generic-ring-width);
        height: var(--generic-ring-height);
        transform: translate(-50%, -50%) rotate(calc(var(--planet-inclination) + var(--generic-ring-rotate-offset)));
        opacity: var(--generic-ring-opacity);
        filter: drop-shadow(0 0 0.45rem var(--generic-body-glow));
    }

    .generic-ring svg {
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .generic-ring-band {
        stroke: var(--generic-ring-color);
        vector-effect: non-scaling-stroke;
    }

    .generic-ring-band-main {
        stroke-width: 1.25rem;
    }

    .generic-ring-band-inner {
        stroke-width: 0.42rem;
        stroke-opacity: 0.46;
    }

    .generic-ring-band-dust {
        stroke-width: 0.22rem;
        stroke-dasharray: 10 18;
        stroke-opacity: 0.32;
    }

    .generic-ring-back {
        z-index: 1;
        clip-path: inset(0 0 50% 0);
        opacity: calc(var(--generic-ring-opacity) * 0.5);
    }

    .generic-ring-front {
        z-index: 3;
        clip-path: inset(58% 0 0 0);
        opacity: calc(var(--generic-ring-opacity) * 0.84);
    }

    .generic-ring-uranus .generic-ring-band-main {
        stroke-width: 0.72rem;
    }

    .generic-ring-uranus .generic-ring-band-inner,
    .generic-ring-uranus .generic-ring-band-dust {
        stroke-opacity: 0.3;
    }

    .generic-ring-neptune .generic-ring-band-main {
        stroke-width: 0.52rem;
    }

    .generic-ring-neptune .generic-ring-band-inner,
    .generic-ring-neptune .generic-ring-band-dust {
        stroke-opacity: 0.24;
    }

    .generic-ring-haumea .generic-ring-band-main {
        stroke-width: 0.42rem;
    }

    @media (max-width: 900px) {
        .generic-body {
            width: min(calc(var(--generic-body-size) * 0.78), 138vw);
            height: min(calc(var(--generic-body-size) * 0.78), 138vw);
        }

        .generic-ring {
            width: calc(var(--generic-ring-width) * 0.78);
            height: calc(var(--generic-ring-height) * 0.78);
        }
    }

    @media (max-width: 640px) {
        .generic-body {
            width: min(calc(var(--generic-body-size) * 0.62), 148vw);
            height: min(calc(var(--generic-body-size) * 0.62), 148vw);
        }

        .generic-ring {
            width: min(calc(var(--generic-ring-width) * 0.64), 214vw);
            height: min(calc(var(--generic-ring-height) * 0.64), 62vw);
        }
    }
`;
