import styled from "styled-components";
import meteorMap from "../../../../assets/meteorMap.jpg"

export const MeteorContainer = styled("div")`
    @keyframes meteorBodyRotation {
        0% {
            transform: translateY(-60rem) translateX(-50rem) rotateZ(0);
        }
        50% {
            transform: translateY(-60rem) translateX(-50rem) rotateZ(180deg);
        }
        100% {
            transform: translateY(-60rem) translateX(-50rem) rotateZ(360deg);
            background-position: 400%;
        }
    }

    animation: meteorBodyRotation linear 20s infinite;

    position: absolute;
    bottom: 10rem;

    background-image: url(${meteorMap});
    background-size: cover;
    box-shadow: 0 0px 20px 10px #000000 inset;

    transform: translateX(-50rem) translateZ(-20rem) translateY(-60rem);

    width: 15rem;
    height: 10rem;
    border-radius: 65% 65% 65% 65%;
`

export const MeteorTail = styled("div")`
    position: absolute;

    top: 50rem;

    background-color: #76a9c0;
    box-shadow: 0px 0px 100px 20px #76a9c0;

    transform: translateY(-60rem) translateX(-50rem) rotateZ(90deg);

    width: 0.1rem;
    height: 30rem;
`
