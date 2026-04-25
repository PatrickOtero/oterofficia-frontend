import styled from "styled-components";
import saturnTexture from "../../../assets/saturn-map.jpg";
import { SATURN_SCENE_CENTER_Y } from "../PlanetSystem/sceneAnchors";

export const SaturnContainer = styled("div")`
    @keyframes saturnRotation {
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

    .saturn-main {
        position: absolute;
        inset: 0;
        transition: transform 520ms ease;
        transform: scale(1.01);
        transform-origin: 50% 60%;
    }

    .saturn-ring-glow,
    .saturn-ring-art {
        position: absolute;
        left: 50%;
        top: ${SATURN_SCENE_CENTER_Y};
        transform: translate(-50%, -50%) rotate(calc(var(--planet-inclination) - 39.7deg));
        pointer-events: none;
    }

    .saturn-ring-glow {
        width: 180rem;
        height: 58rem;
        z-index: 0;
        background: radial-gradient(
            ellipse at center,
            rgba(255, 228, 187, 0.2) 0%,
            rgba(255, 228, 187, 0.1) 38%,
            rgba(255, 228, 187, 0.04) 62%,
            transparent 76%
        );
        opacity: 0.72;
    }

    .saturn-ring-art {
        width: 174rem;
        height: 56rem;
    }

    .saturn-ring-art svg {
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .saturn-ring-back {
        z-index: 1;
        opacity: 0.42;
    }

    .saturn-ring-front {
        z-index: 3;
        opacity: 0.9;
        clip-path: inset(58% 0 0 0);
        filter: drop-shadow(0 0 1rem rgba(255, 232, 193, 0.18));
    }

    .saturn-body {
        position: absolute;
        left: 50%;
        top: ${SATURN_SCENE_CENTER_Y};
        width: 76rem;
        height: 76rem;
        transform: translate(-50%, -50%) rotate(var(--planet-inclination));
        overflow: hidden;
        border-radius: 50%;
        z-index: 2;
        background:
            radial-gradient(circle at 30% 22%, rgba(255, 250, 235, 0.28), transparent 18%),
            radial-gradient(circle at 76% 76%, rgba(64, 34, 20, 0.46), transparent 34%),
            linear-gradient(150deg, #f1d3ab 0%, #dbaf72 34%, #b88257 62%, #694833 100%);
        box-shadow:
            inset -4.6rem -1.2rem 5rem rgba(56, 32, 20, 0.24),
            0 0 3.2rem rgba(255, 214, 162, 0.12);
    }

    .saturn-body::before,
    .saturn-body::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        pointer-events: none;
    }

    .saturn-body::before {
        background:
            radial-gradient(ellipse at 50% 4%, rgba(255, 232, 190, 0.54) 0%, rgba(255, 232, 190, 0.18) 18%, transparent 34%),
            radial-gradient(ellipse at 50% 96%, rgba(235, 196, 148, 0.2) 0%, rgba(235, 196, 148, 0.06) 14%, transparent 28%),
            linear-gradient(108deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 34%, rgba(0, 0, 0, 0.16) 78%),
            linear-gradient(180deg, rgba(255, 255, 255, 0) 35%, rgba(71, 48, 32, 0.18) 47%, rgba(20, 12, 9, 0.24) 53%, rgba(255, 255, 255, 0) 63%);
        opacity: 0.88;
    }

    .saturn-body::after {
        inset: -1.5rem;
        box-shadow:
            0 0 0 1px rgba(255, 233, 196, 0.12),
            0 0 3rem rgba(248, 205, 150, 0.12);
    }

    .saturn-map-track {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 100%;
        display: flex;
        opacity: 0.96;
        animation: saturnRotation 268s linear infinite;
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .saturn-map-panel {
        flex: 0 0 50%;
        height: 100%;
        background-image: url(${saturnTexture});
        background-size: calc(100% + 2.2rem) 100%;
        background-position: center 47%;
        background-repeat: no-repeat;
        filter: saturate(1.08) contrast(1.05) brightness(1.04);
    }

    .earth-hidden {
        transform: translateY(10rem) rotate(var(--planet-inclination)) scale(0.99);
    }

    @media (max-width: 900px) {
        .saturn-ring-glow,
        .saturn-ring-art {
            width: 132rem;
            height: 42rem;
        }

        .saturn-body {
            width: 54rem;
            height: 54rem;
        }
    }

    @media (max-width: 640px) {
        .saturn-ring-glow,
        .saturn-ring-art {
            width: min(100rem, 256vw);
            height: min(32rem, 82vw);
        }

        .saturn-body {
            width: min(39rem, 106vw);
            height: min(39rem, 106vw);
        }
    }

    @media (max-width: 420px) {
        .saturn-ring-glow,
        .saturn-ring-art {
            width: min(78rem, 238vw);
            height: min(25rem, 76vw);
        }

        .saturn-body {
            width: min(31rem, 100vw);
            height: min(31rem, 100vw);
        }
    }
`;
