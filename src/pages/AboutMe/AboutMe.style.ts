import styled from "styled-components";
import Box from "@mui/material/Box";

export const AboutMeContainer = styled(Box)`
    @keyframes hologramExpandToAboutMe {
        0% {
            height: 60rem;
            width: 40rem;         
        }

        100% {
            height: 90rem;
            width: 80rem;
        }
    }

    @keyframes hologramCollapseToInitialMenu {
        0% {
            height: 90rem;
            width: 80rem;
        }
        100% {
            height: 60rem;
            width: 40rem;         
        }
    }

    @keyframes hologramBeamSection {
        0% {
            box-shadow: 0 0 30px 30px #288a91 inset;
        }

        50% {
            box-shadow: 0 0 80px -10px #288a91 inset;
        }

        100% {
            box-shadow: 0 0 30px 30px #288a91 inset;
        }
    }

    position: absolute;

    height: 90rem;
    width: 80rem;

    transform-style: preserve-3d;

    transform: translateZ(-140);

    animation: hologramExpandToAboutMe 500ms;
    
    transition: 1000ms;
    
    .aboutme-page-main {
        display: flex;
        flex-direction: column;

        overflow: auto;

        padding: 5rem;

        gap: 5rem;
        
        width: 100%;
        height: 100%;

        border-radius: 5rem;
        animation: hologramBeamMenu 10ms linear infinite;
        background-color: #288a9128;
        box-shadow: -20px 1px 50px 10px #288a91 inset;
        
        &::-webkit-scrollbar {          
            background-color: #ffffff00; 
            width: 1rem;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3rem; 
            background-color: #26a0a8;
        }

    }

    .aboutme-return-button {
        position: fixed;

        background-color: #288a9100;
        bottom: 1rem;
        right: 5rem;
    }
`