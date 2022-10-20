import styled from "styled-components";
import Box from "@mui/material/Box";

export const InitialMenuContainer = styled(Box)`
    @keyframes hologramMenuShowing {
        0% {
            opacity: 0;
            transform: rotateY(-90deg);
        }

        100% {
            opacity: 1;
            transform: rotateY(0);
        }
    }

    animation: hologramMenuShowing 500ms;        
    position: absolute;

    height: 60rem;
    width: 40rem;

    transform-style: preserve-3d;
    
    .initial-menu-main {
        transform-style: preserve-3d;

        display: flex;
        align-items: center;
        flex-direction: column;

        padding: 4rem;
        
        width: 100%;
        height: 100%;

        border-radius: 5rem 0 0 5rem;

        background-color: #288a9128;
        box-shadow: 0px 0px 50px 10px #288a91 inset;
    }

    .site-title-on-initial-menu {
        margin-bottom: 5rem;

        font-size: 3rem;

        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;
        font-weight: 800;
    }
`