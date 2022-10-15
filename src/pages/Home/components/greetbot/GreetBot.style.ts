import styled from "styled-components";

export const GreetBotContainer = styled("div")`
    @keyframes rotateBotPart {
        to{
            background-position: 100%;
        }
    }

    @keyframes greetBotArriving{
        0% {
            margin-right: 200rem;
        }

        100% {
            margin-right: 0;
        }
    }

    @keyframes greetBotFloating {
        0% {
            margin-bottom: 10rem;
        }

        50% {
            margin-top: 10rem;
        }

        100% {
            margin-top: -10rem;
        }
    }

    @keyframes hologramBeam {
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
     animation: greetBotArriving 1000ms linear;

    transform-style: preserve-3d;

     border-radius: 50%;

     .greetbot-body {
        perspective: 1000px;
        transform-style: preserve-3d;

        position: relative;

        animation: greetBotFloating 4000ms infinite;

        height: 30rem;
        width: 30rem;

        border-radius: 50%;

        transition: 1000ms;
      }

      .bot-showing-menu {
        transform: translateZ(-60rem) translateX(90rem);

        animation: none;
      }

      .greetbot01-static-part {        
        position: absolute;

        display: flex;
        justify-content: center;
        align-items: center;

        height: 15rem;
        width: 30rem;

        background: linear-gradient(#413f3f 0%, #333232 10%, #1d1c1c 50%, #030303 100%);

        border-radius: 15rem 15rem 0 0;

        perspective: 45rem;
        transform-style: preserve-3d;

        .greetBot01-visor {
            display: flex;

            justify-content: center;
            align-items: center;

            position: absolute;

            left: 7.5rem;
            top: 4rem;

            width: 15rem;
            height: 10rem;

            transition: 1000ms;

            transform: translateZ(2rem) 
        }

        .visor-to-left {
            transform: translateX(-10rem) translateZ(2rem) rotateY(-31deg);
        }

        .visor-to-right {
            transform: translateX(10rem) translateZ(2rem) rotateY(31deg);
        }

        .greetbot01-static-part-inner-form {
            height: 13rem;
            width: 27rem;

            background: linear-gradient(#686565 0%, #272626 10%, #1d1c1c 50%, #030303 100%);

            border-radius: 15rem 15rem 0 0;

            filter: blur(0.4rem);
        }

        .gb-visor-horizontal {
            position: absolute;

            background-color: #000000;
            border-radius: 2rem;

            width: 15rem;
            height: 4rem;

            top: 0;

            z-index: 1;

            .gb-eyes {
            position: absolute;

            border-radius: 50%;
            background-color: #f0c44aff;
            box-shadow: 0.5px -1px 15px 12px #dbb240;

            width: 0.3rem;
            height: 0.3rem;
            }

            .eyeLeft {
            top: 2rem;
            left: 4rem;
            }

            .eyeRight {
            top: 2rem;
            right: 4rem;
            }
        }

        .gb-visor-vertical {
            position: absolute;

            background-color: #000000;
            border-radius: 1rem;

            width: 4rem;
            height: 6rem;

            bottom: 1rem;

            .gb-mouth {
                border-radius: 1rem;

                background-color: #f0c44aff;
                box-shadow: 0.5px -1px 10px 5px #dbb240;

                width: 0.1rem;
                height: 2rem;

                margin-left: 2rem;
                margin-top: 2rem;
            }
        }
      }

      .greetbot01-moving-part {
        position: absolute;

        display: flex;
        justify-content: center;
        align-items: center;
        
        animation: rotateBotPart 5s linear infinite;

        background-image: linear-gradient(#292828 0%, #222121 10%, #181717 50%, #030303 100%);
        background-repeat: repeat;
        background-size: 15rem;

        height: 15rem;
        width: 30rem;

        top: 15rem;

        border-radius: 0 0 15rem 15rem;

        transform-style: preserve-3d;
        perspective: 45rem;

        .bot-text {
            position: absolute;
            top: 1rem;

            font-family: 'IBM Plex Mono', monospace;

            color: #f0c44aff;
            text-shadow: 1px 1px 10px #f0c44aff;
            font-size: 1.2rem;
        }

        .property-text {
            z-index: 1;
        }

        .robot-name-text {
            z-index: -1;
        }

        .greetbot01-moving-part-inner-form {
            position: absolute;

            height: 13rem;
            width: 27rem;

            background-image: linear-gradient(#444343 0%, #2c2b2b 10%, #1d1c1c 50%, #030303 100%);

            border-radius: 0 0 15rem 15rem;

            filter: blur(1rem);
        }
      }

      .greetBot-menu-hologram-light-beam {
        position: absolute;

        animation: hologramBeam 10ms linear infinite;

        transition: 1000ms;

        width: 0.1rem;

        background-color: #1e7da388;
        box-shadow: 0 0 0px -10px #276881;
      }

      .eye-beam-1 {
        transform: translateZ(5rem) rotateZ(-80deg);

        right: 44rem;
        bottom: 6rem;

        height: 44rem;
      }

      .eye-beam-2 {
        transform: translateZ(2rem) rotateZ(-80deg);

        right: 47.5rem;
        bottom: 7.3rem;

        height: 40rem;
    }

`