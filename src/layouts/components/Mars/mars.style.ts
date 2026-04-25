import styled from "styled-components";
import marsMap from "../../../assets/mars-map.jpg";
import { MARS_SCENE_CENTER_Y } from "../PlanetSystem/sceneAnchors";

export const MarsContainer = styled("div")`
    @keyframes marsRotation {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            transform: translate3d(-50%, 0, 0);
        }
    }

    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    overflow: visible;
    --planet-inclination: 0deg;

    .mars-main {
        position: absolute;
        left: 50%;
        top: ${MARS_SCENE_CENTER_Y};
        width: min(90rem, 112vw);
        height: min(90rem, 112vw);
        overflow: hidden;
        border-radius: 50%;
        transition: transform 520ms ease;
        transform: translate(-50%, -50%) rotate(var(--planet-inclination)) scale(1.06);
        background:
            radial-gradient(circle at 30% 24%, rgba(255, 236, 214, 0.18), transparent 20%),
            radial-gradient(circle at 74% 74%, rgba(44, 16, 8, 0.72), transparent 38%),
            linear-gradient(145deg, #d98652 0%, #9f4426 42%, #4b180f 100%);
        box-shadow:
            inset -4.4rem -1.2rem 4.8rem rgba(28, 10, 6, 0.28),
            0 0 3rem rgba(214, 120, 58, 0.16);
    }

    .mars-main::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at 58% 24%, rgba(255, 214, 164, 0.08), transparent 28%),
            radial-gradient(circle at 24% 68%, rgba(126, 46, 24, 0.18), transparent 30%);
        mix-blend-mode: screen;
        opacity: 0.82;
    }

    .mars-main::after {
        content: "";
        position: absolute;
        inset: -1.4rem;
        border-radius: 50%;
        box-shadow:
            0 0 0 1px rgba(255, 197, 150, 0.12),
            0 0 3rem rgba(204, 104, 50, 0.14);
    }

    .mars-map-track {
        position: absolute;
        top: 0;
        left: 0;
        width: 400%;
        height: 100%;
        display: flex;
        opacity: 0.54;
        animation: marsRotation 240s linear infinite;
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .mars-map-panel {
        flex: 0 0 50%;
        height: 100%;
        background-image: url(${marsMap});
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        filter: saturate(1.05) contrast(1.08) brightness(0.98);
    }

    .earth-hidden {
        transform: translate(-50%, calc(-50% + 10rem)) rotate(var(--planet-inclination)) scale(1.03);
    }

    @media (max-width: 900px) {
        .mars-main {
            width: 70rem;
            height: 70rem;
        }
    }

    @media (max-width: 640px) {
        .mars-main {
            width: min(56rem, 148vw);
            height: min(56rem, 148vw);
        }
    }

    @media (max-width: 420px) {
        .mars-main {
            width: min(46rem, 142vw);
            height: min(46rem, 142vw);
        }
    }
`;
