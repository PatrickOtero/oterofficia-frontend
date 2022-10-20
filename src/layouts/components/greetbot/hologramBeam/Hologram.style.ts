import styled from "styled-components";

export const HoloBeamContainer = styled("div")`
    @keyframes menuHologramBeam {
        0% {
            box-shadow: 10px 0px 100px 0px #276881c0;
        }

        50% {
            box-shadow: -10px 0px 60px 20px #27688185;
        }

        100% {
            box-shadow: 10px 0px 20px 0px #276881c5;
        }
    }

        position: absolute;
        top: 0;

        transform-style: preserve-3d;

      .greetBot-menu-hologram-light-beam {
        position: absolute;

        animation: menuHologramBeam 10ms linear infinite;

        transition: 1000ms;

        background-color: #1e7da388;
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