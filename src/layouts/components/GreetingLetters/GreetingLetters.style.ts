import styled from "styled-components";

export const LettersContainer = styled("div")`
    @keyframes lettersTravelling {
        from {
                transform: translateX(150rem) translateZ(0) scale(1) translateY(-20rem)
            }
            50% {
                transform: translateX(-150rem) translateZ(400rem)
            }

            to {
                display: none;
                transform: translateZ(-1000rem) translateX(50rem) translateY(20rem) scale(0);
            }
    }

    @keyframes lettersTravellingSmallWidth {
        from {
                transform: translateX(150rem) translateZ(0) scale(0.4) translateY(40rem);
            }
            50% {
                transform: translateX(-150rem) translateZ(400rem);
            }

            to {
                display: none;
                transform: translateZ(-1000rem) translateX(50rem) translateY(-40rem) scale(0);
            }
    }

    @keyframes lettersRotation {
        0% {
            transform: rotateZ(-360deg);
        }
        100% {
            transform: rotateZ(0);
        }
    }

    position: absolute;
    display: flex;

    bottom: 55rem;

    gap: 4rem;

    transform-style: preserve-3d;

    
    .floating-letter-container {
        transform: translateX(200rem);

        animation: lettersTravelling 70s forwards;
    }

    .rotating-letter-container {        
        animation: lettersRotation 20s linear infinite;
    }

    .floating-letter{
        font-size: 3rem;
        color: #a5c2c4;
        text-shadow: 1px 1px 20px #c4d7d8;
    }

    @media (max-width: 500px)
        {
            .floating-letter-container {
                transform: translateX(200rem);

                animation: lettersTravellingSmallWidth 200s forwards
            }
        }

    /* @media (min-width: 400px)
        {
            .floating-letter-container {
                transform: translateX(200rem);

                animation: lettersTravellingSmallWidth 70s forwards
            }
        }


        @media (min-width: 800px)
        {
            .floating-letter-container {
                transform: translateX(200rem);

                animation: lettersTravellingSmallWidth 70s forwards
            }
        } */
`