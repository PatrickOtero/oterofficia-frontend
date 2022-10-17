import styled from "styled-components";
import Box from "@mui/material/Box"

export const SpaceContainer = styled(Box)`

position: absolute;

transform: translateZ(-1000rem) scale(3);

@keyframes starsGlow {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes shootingStar {
        0% {
            opacity: 0;
        }

        100% {
            margin-top: 100rem;
            margin-right: -40rem;
            opacity: 1;

            font-size: 5rem;
        }
    }

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 5rem;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: -1;

        overflow: hidden;

        .star-left {
            position: absolute;
            animation: starsGlow 1000ms infinite;

            font-size: 3rem;
            color: white;
            text-shadow: 1px 1px 10px #ffffff;

            border-radius: 50%;
        }

        .shooting-star {
            position: absolute;
            animation: shootingStar 2000ms infinite alternate-reverse;

            font-size: 4rem;
            color: white;
            text-shadow: 1px 1px 20px #ffffff;
        }
`