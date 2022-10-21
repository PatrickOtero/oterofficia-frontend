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

    @keyframes imgHologramEffect {
        0% {
            box-shadow: 0 0 10px 20px #288a91 inset;
        }

        50% {
            box-shadow: 0 0 60px -20px #288a91 inset;
        }

        100% {
            box-shadow: 0 0 10px 20px #288a91 inset;
        }
    }

    position: absolute;

    height: 90rem;
    width: 80rem;

    transform-style: preserve-3d;

    transform: translateZ(-140);

    animation: hologramExpandToAboutMe 500ms;
    
    transition: 1000ms;

    color: #88c4c9;
    text-shadow: 0 0 10px #88c4c9;

    line-height: 4rem;
    
    .aboutme-page-main {
        display: flex;
        flex-direction: column;

        overflow: auto;

        padding: 5rem 5rem 0 5rem;

        gap: 5rem;
        
        width: 100%;
        height: 100%;

        border-radius: 1rem;
        background-color: #288a9128;
        box-shadow: 0px 0px 50px 10px #288a91 inset;

        &::-webkit-scrollbar {          
            background-color: #ffffff00; 
            width: 1rem;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3rem; 
            background-color: #26a0a8;
        }
    }

    .aboutme-section-info {
        display: flex;
        align-items: center;

        gap: 5rem;
    }

    .aboutme-page-main ul {
        display: flex;
        flex-direction: column;

        gap: 2rem;
    }

    .aboutme-titles {
        font-size: 3rem;
    }

    .aboutme-page-main h2 {
        font-size: 2rem;
    }

    .aboutme-name {
        font-size: 5rem;
    }

    li {
        margin-left: 2rem;
        font-size: 2rem;       
    }

    .profile-description {
        font-size: 2rem;      
    }

    .profile-photo {
        border-radius: 50%;
        height: 30rem;
        width: 30rem;
    }

    .aboutme-return-button {
        background-color: #288a9100;

        margin-bottom: 4rem;
        padding: 2rem 0;

        margin-left: 48rem;
    }
`