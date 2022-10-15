import styled from "styled-components";
import earthMap from "../../../../assets/world-map.png"
import moonMap from "../../../../assets/moon-map.jpg"

export const EarthContainer = styled("div")`
    @keyframes celestialBodyRotation {
        to {
            background-position: 200%;
        }
    }

    position: absolute;

    bottom: 10rem;

    width: 20rem;
    height: 52rem;
    border-radius: 50%;

    transform: translateZ(80rem) translateY(-3rem) rotateZ(-90deg) rotateY(100deg);

    overflow: hidden;
    background-image: url(${earthMap});
    background-size: cover;

    box-shadow: 0 0 50px 15px #5ea6e0;

    animation: celestialBodyRotation 1000s linear infinite;
`

export const MoonContainer = styled("div")`

    @keyframes moonOribitXAndRotation {
            from {
                transform: rotateZ(-45deg) translateX(0) translateZ(-280rem)
            }
            50% {
                transform: rotateZ(-45deg) translateX(-600rem) translateZ(0)
            }

            50.01% {
                transform: rotateZ(-45deg) translateZ(280rem) translateX(600rem); 
            }
            to {
                transform: rotateZ(-45deg) translateZ(-280rem) translateX(0);   
            }
        }

        @keyframes moonOrbitZ {
            from {
                transform: translateZ(0)
            } 
            25% {
                transform: translateZ(8rem)
            }
            75% {
                transform: translateZ(-5rem)
            }
            100% {
                transform: translateZ(0);
            }
        }

    position: absolute;

    width: 40rem;
    height: 40rem;
    border-radius: 50%;

    box-shadow: 0 -50px 50px -40px #ffffff;

    transform: translateX(0) translateZ(-280rem) rotateZ(-45deg);

    animation: moonOribitXAndRotation 10000s linear infinite;

    .moon-rotation-container {
        position: absolute;

        width: 100%;
        height: 100%;
        border-radius: 50%;

        overflow: hidden;
        background-image: url(${moonMap});
        background-size: cover;
        animation: celestialBodyRotation 1000s linear infinite;

        box-shadow: 0 -40px 55px 30px #000000 inset;
    }
`

// background: radial-gradient(100% 125% at 40% 50%, rgba(0, 0, 0, 0) 40%, black 50%), radial-gradient(100% 100% at center, rgba(40, 120, 240, 0) 47%, rgba(40, 120, 240, 0.5) 48.5%, #c2e4fa 50%);