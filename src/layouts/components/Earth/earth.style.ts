import styled from "styled-components";
import earthMap from "../../../assets/world-map.png"

export const EarthContainer = styled("div")`
    @keyframes celestialBodyRotation {
        from {
            background-position: 0;
        }
         to {
            background-position: 200%;
        }
    }

    position: absolute;

    width: 50rem;
    height: 150rem;

    transform-style: preserve-3d;

    .earth-main {       
        width: 100%;
        height: 100%;
        
        border-radius: 45%;

        transition: 1000ms;
        transform: translateZ(-10rem) translateY(45rem) translateX(0rem) rotateZ(-90deg) rotateY(-100deg) scale(2.4);

        overflow: hidden;
        background-image: url(${earthMap});
        background-size: cover;

        box-shadow: 0 0 100px 45px #5ea6e0;

        animation: celestialBodyRotation 800s linear infinite;
    }

    .earth-hidden {
        transform: translateZ(-10rem) translateY(65rem) translateX(0rem) rotateZ(-90deg) rotateY(-100deg) scale(2.4);
    }
`

// background: radial-gradient(100% 125% at 40% 50%, rgba(0, 0, 0, 0) 40%, black 50%), radial-gradient(100% 100% at center, rgba(40, 120, 240, 0) 47%, rgba(40, 120, 240, 0.5) 48.5%, #c2e4fa 50%);