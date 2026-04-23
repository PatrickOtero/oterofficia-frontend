import styled from "styled-components";
import earthMap from "../../../assets/world-map.png";
import { EARTH_SCENE_CENTER_Y } from "../PlanetSystem/sceneAnchors";

export const EarthContainer = styled("div")`
    @keyframes celestialBodyRotation {
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

    .earth-main {
        position: absolute;
        left: 50%;
        top: ${EARTH_SCENE_CENTER_Y};
        width: min(96rem, 118vw);
        height: min(96rem, 118vw);

        overflow: hidden;
        border-radius: 50%;
        transition: transform 520ms ease;
        transform: translate(-50%, -50%) scale(1.08);
        background:
            radial-gradient(circle at 32% 24%, rgba(255, 255, 255, 0.26), transparent 20%),
            radial-gradient(circle at 68% 74%, rgba(2, 10, 20, 0.82), transparent 38%),
            linear-gradient(145deg, #4bb7df 0%, #1b5f93 44%, #0b213d 100%);
        box-shadow:
            inset -5rem -1.4rem 5rem rgba(0, 8, 20, 0.3),
            0 0 3.2rem rgba(77, 155, 217, 0.12);
    }

    .earth-main::before {
        content: none;
    }

    .earth-main::after {
        content: "";
        position: absolute;
        inset: -1.6rem;

        border-radius: 50%;
        box-shadow:
            0 0 0 1px rgba(170, 223, 250, 0.16),
            0 0 3.4rem rgba(83, 160, 228, 0.16);
    }

    .earth-map-track {
        position: absolute;
        top: 0;
        left: 0;
        width: 400%;
        height: 100%;
        display: flex;
        opacity: 0.26;
        animation: celestialBodyRotation 220s linear infinite;
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .earth-map-panel {
        flex: 0 0 50%;
        height: 100%;
        background-image: url(${earthMap});
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }

    .earth-hidden {
        transform: translate(-50%, calc(-50% + 10rem)) scale(1.05);
    }

    @media (max-width: 900px) {
        .earth-main {
            width: 72rem;
            height: 72rem;
        }
    }

    @media (max-width: 640px) {
        .earth-main {
            width: 58rem;
            height: 58rem;
        }
    }
`;
