import moonMap from "../../../assets/moon-map.jpg"
import styled from "styled-components";

export const MoonContainer = styled("div")`

    @keyframes moonOrbit {
            from {
                transform: rotateZ(-45deg) translateX(300rem) translateZ(-900rem)
            }
            50% {
                transform: rotateZ(-45deg) translateX(-900rem) translateZ(-500rem)
            }
            to {
                transform: rotateZ(-45deg) translateX(-300rem) translateZ(-900rem)
            }
        }

    position: absolute;

    transform-style: preserve-3d;

    width: 20rem;
    height: 20rem;
    border-radius: 50%;

    transform: translateX(300rem) translateZ(-900rem) rotateZ(-45deg);

    box-shadow: -8px -25px 50px -20px #ffffff;

    animation: moonOrbit 3000s linear infinite;

    .moon-rotation-container {
        position: absolute;

        transform-style: preserve-3d;

        width: 100%;
        height: 100%;
        border-radius: 50%;

        overflow: hidden;
        background-image: url(${moonMap});
        background-size: cover;
        animation: celestialBodyRotation 500s linear infinite;

        box-shadow: 0 -30px 55px 10px #000000 inset;
    }
`
