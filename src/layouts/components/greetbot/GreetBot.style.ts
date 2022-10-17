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

    @keyframes eyeEmittingHolo {
        0% {
            box-shadow: 0 -1px 20px 20px #288a91;
        }

        50% {
            box-shadow: 0 -1px 10px 5px #288a91;
        }

        100% {
            box-shadow: 0 -1px 20px 20px #288a91;
        }
    }

     position: absolute;

     transform: translateY(0) translateX(0);

     animation: greetBotArriving 1000ms linear;

    transform-style: preserve-3d;

     border-radius: 50%;

     .greetbot-body {
        transform-style: preserve-3d;
        perspective: 1000px;

        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        animation: greetBotFloating 4000ms infinite;

        background: linear-gradient(#222121ff 0%, #202020ff 10%, #0f0f0fff 50%, #000000ff 100%);

        height: 30rem;
        width: 30rem;

        border-radius: 50%;

        transition: 1000ms;
      }

        .turbines-container {
            position: absolute;

            top: 18rem;
            left: 15rem;

            transform-style: preserve-3d;
      }

      .greetbot01-inner-form {
            position: absolute;

            height: 27rem;
            width: 27rem;

            background: linear-gradient(#4d4c4cff 0%, #2e2d2dff 10%, #0f0f0fff 50%, #000000ff 100%);

            border-radius: 50%;

            filter: blur(1rem);
        }

      .bot-showing-menu {
        transform: translateZ(-260rem) translateX(90rem);

        animation: none;

        transform-style: preserve-3d;
      }

      .bot-showing-aboutme {
        transform: translateZ(-360rem) translateX(130rem);

        animation: none;

        transform-style: preserve-3d;
      }

      .bot-showing-portfolio {
        transform: translateZ(-260rem) translateX(90rem);

        animation: none;

        transform-style: preserve-3d;
      }

      .bot-showing-studies {
        transform: translateZ(-260rem) translateX(90rem);

        animation: none;

        transform-style: preserve-3d;
      }

        .greetBot01-visor {
            display: flex;

            transform-style: preserve-3d;

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
            transform-style: preserve-3d;

            transform: translateX(-10rem) translateZ(2rem) rotateY(-31deg);
        }

        .visor-to-right {
            transform-style: preserve-3d;
            
            transform: translateX(10rem) translateZ(2rem) rotateY(31deg);
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

            .emitting-holo {
                animation: eyeEmittingHolo 10ms infinite;

                background-color: #288a91;
                box-shadow: 0.5px -1px 15px 12px #288a91;                
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
`