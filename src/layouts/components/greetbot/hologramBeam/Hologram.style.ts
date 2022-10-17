import styled from "styled-components";

export const HoloBeamContainer = styled("div")`
    @keyframes menuHologramBeam {
        0% {
            box-shadow: 10px 0px 100px 0px #276881;
        }

        50% {
            box-shadow: -10px -100px 60px 50px #276881;
        }

        100% {
            box-shadow: 10px 0px 20px 0px #276881;
        }
    }

        position: absolute;
        top: 0;

        transform-style: preserve-3d;

      .greetBot-menu-hologram-light-beam {
        position: absolute;

        animation: menuHologramBeam 10ms linear infinite;

        transition: 1000ms;

        width: 0.1rem;

        background-color: #1e7da388;
        box-shadow: 0 0 0px -10px #276881;
      }

      .eye-beam-1 {
        transform: translateZ(1rem) rotateZ(-80deg);

        top: -23.4rem;
        right: 38rem;
        
        height: 50rem;
      }

      .eye-beam-2 {
        transform: translateZ(5rem) rotateZ(-80deg);

        top: -26.3rem;
        right: 35rem;

        height: 55rem;
    }
`