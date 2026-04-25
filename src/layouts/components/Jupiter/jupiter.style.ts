import styled from "styled-components";
import jupiterMap from "../../../assets/jupiterMap.jpg";
import { JUPITER_SCENE_CENTER_Y } from "../PlanetSystem/sceneAnchors";

export const JupiterContainer = styled("div")`
    @keyframes jupiterRotation {
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

    .jupiter-ring-art {
        position: absolute;
        left: 50%;
        top: ${JUPITER_SCENE_CENTER_Y};
        width: 164rem;
        height: 34rem;
        transform: translate(-50%, -50%) rotate(calc(var(--planet-inclination) - 9deg));
        pointer-events: none;
    }

    .jupiter-ring-art svg {
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .jupiter-ring-back {
        z-index: 1;
        opacity: 0.62;
    }

    .jupiter-ring-front {
        z-index: 3;
        filter: drop-shadow(0 0 0.7rem rgba(255, 225, 180, 0.16));
        opacity: 0.82;
    }

    .jupiter-main {
        position: absolute;
        left: 50%;
        top: ${JUPITER_SCENE_CENTER_Y};
        width: min(104rem, 128vw);
        height: min(104rem, 128vw);
        overflow: hidden;
        border-radius: 50%;
        transition: transform 520ms ease;
        transform: translate(-50%, -50%) rotate(var(--planet-inclination)) scale(1.03);
        background:
            radial-gradient(circle at 26% 22%, rgba(255, 244, 225, 0.2), transparent 18%),
            radial-gradient(circle at 76% 78%, rgba(48, 24, 15, 0.4), transparent 34%),
            linear-gradient(145deg, #f4d0a7 0%, #d79767 30%, #9f6243 58%, #502b1f 100%);
        box-shadow:
            inset -5rem -1.4rem 5.2rem rgba(39, 20, 12, 0.24),
            0 0 3.6rem rgba(236, 165, 96, 0.14);
        z-index: 2;
    }

    .jupiter-main::before,
    .jupiter-main::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        pointer-events: none;
    }

    .jupiter-main::before {
        background:
            radial-gradient(ellipse at 50% 4%, rgba(243, 208, 160, 0.76) 0%, rgba(243, 208, 160, 0.24) 18%, transparent 34%),
            radial-gradient(ellipse at 50% 96%, rgba(249, 219, 172, 0.4) 0%, rgba(249, 219, 172, 0.12) 16%, transparent 28%),
            radial-gradient(circle at 24% 20%, rgba(255, 252, 244, 0.18), transparent 14%),
            linear-gradient(108deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 36%, rgba(0, 0, 0, 0.18) 80%);
        opacity: 0.92;
    }

    .jupiter-main::after {
        inset: -1.6rem;
        box-shadow:
            0 0 0 1px rgba(255, 215, 182, 0.12),
            0 0 3.2rem rgba(215, 122, 68, 0.14);
    }

    .jupiter-map-track {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 100%;
        display: flex;
        opacity: 0.97;
        animation: jupiterRotation 228s linear infinite;
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .jupiter-map-panel {
        flex: 0 0 50%;
        height: 100%;
        background-image: url(${jupiterMap});
        background-size: calc(100% + 2.8rem) 100%;
        background-position: center 46%;
        background-repeat: no-repeat;
        filter: saturate(1.06) contrast(1.08) brightness(0.98);
    }

    .earth-hidden {
        transform: translate(-50%, calc(-50% + 10rem)) rotate(var(--planet-inclination)) scale(1.01);
    }

    @media (max-width: 900px) {
        .jupiter-ring-art {
            width: 124rem;
            height: 26rem;
        }

        .jupiter-main {
            width: 79rem;
            height: 79rem;
        }
    }

    @media (max-width: 640px) {
        .jupiter-ring-art {
            width: min(96rem, 246vw);
            height: min(20rem, 52vw);
        }

        .jupiter-main {
            width: min(62rem, 160vw);
            height: min(62rem, 160vw);
        }
    }

    @media (max-width: 420px) {
        .jupiter-ring-art {
            width: min(78rem, 238vw);
            height: min(16rem, 49vw);
        }

        .jupiter-main {
            width: min(50rem, 152vw);
            height: min(50rem, 152vw);
        }
    }
`;
