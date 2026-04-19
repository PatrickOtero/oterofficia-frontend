import styled from "styled-components";
import earthMap from "../../../assets/world-map.png";

export const EarthContainer = styled("div")`
    @keyframes celestialBodyRotation {
        from {
            background-position: 14% 42%;
        }

        to {
            background-position: 118% 42%;
        }
    }

    position: absolute;
    left: 50%;
    bottom: -58rem;

    width: min(96rem, 118vw);
    height: min(96rem, 118vw);

    transform: translateX(-50%);
    z-index: 4;
    pointer-events: none;

    .earth-main {
        position: absolute;
        inset: 0;

        overflow: hidden;
        border-radius: 50%;
        transition: transform 520ms ease;
        transform: translateY(0) scale(1.08);
        background:
            radial-gradient(circle at 32% 24%, rgba(255, 255, 255, 0.26), transparent 20%),
            radial-gradient(circle at 68% 74%, rgba(2, 10, 20, 0.82), transparent 38%),
            linear-gradient(145deg, #4bb7df 0%, #1b5f93 44%, #0b213d 100%);
        box-shadow:
            inset -5rem -1.4rem 5rem rgba(0, 8, 20, 0.3),
            0 0 3.2rem rgba(77, 155, 217, 0.12);
    }

    .earth-main::before {
        content: "";
        position: absolute;
        inset: 0;

        border-radius: 50%;
        opacity: 0.26;
        background-image: url(${earthMap});
        background-size: 130% 130%;
        background-position: 14% 42%;
        background-repeat: repeat-x;
        animation: celestialBodyRotation 220s linear infinite;
        will-change: background-position;
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

    .earth-hidden {
        transform: translateY(10rem) scale(1.05);
    }

    @media (max-width: 900px) {
        bottom: -44rem;
        width: 72rem;
        height: 72rem;
    }
`;
