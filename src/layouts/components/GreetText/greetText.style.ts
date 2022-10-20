import styled from "styled-components";
import Box from "@mui/material/Box";

export const GreetTextContainer = styled(Box)`
    @keyframes hologramTextShowing {
        0% {
            opacity: 0;
            transform: translateZ(10rem) rotateX(-90deg);
        }

        100% {
            opacity: 1;
            transform: translateZ(10rem) rotateX(0);
        }
    }

    position: absolute;

    width: 40rem;
    height: 7rem;

    top: 4rem;

    animation: hologramTextShowing 400ms;
    transform: translateZ(10rem);

    .apparition-container {
        padding: 2rem;

        transition: 1000ms;

        border-radius: 3rem;
        background-color: #288a9128;
        box-shadow: 0 0 10px 5px #288a91 inset;
    }

    b {
        font-size: 2rem;
        color: #288a91;
        text-shadow: 0 0 10px #288a91;

        margin-left: 4rem;
    }
`