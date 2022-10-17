import styled from "styled-components";
import Box from "@mui/material/Box";

export const AboutMeContainer = styled(Box)`
    position: absolute;

    height: 90rem;
    width: 80rem;

    transform-style: preserve-3d;

    transform: translateZ(-140);
    
    .aboutme-page-main {
        display: flex;
        flex-direction: column;

        padding: 5rem;
        
        width: 100%;
        height: 100%;

        border-radius: 5rem;
        animation: hologramBeamMenu 10ms linear infinite;
        background-color: #288a9128;
        box-shadow: -20px 1px 50px 10px #288a91 inset;
    }

    .github-info-container {
        display: flex;
        flex-direction: column;

        gap: 2rem;
    }

    .github-title {
        font-size: 4rem;
        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;
    }

    .github-info-main {
        display: flex;
        align-items: center;

        gap: 3rem;
    }

    .github-description {
        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;
        font-size: 2rem;
    }

    .img-filter {
        position: absolute;
        width: 16rem;
        height: 16rem;

        border-radius: 50%;

        background-color: #88c4c9bd;
        animation: hologramBeamMenu 10ms linear infinite;
        box-shadow: -20px 1px 50px 10px #88c4c9bd inset;
        
        transition: 400ms;

        z-index: 1;

        &:hover {
            animation: hologramBeamMenu 10ms linear infinite;
            background-color: #88c4c900;
            
            cursor: pointer;
        }
    }

    .github-name-and-description {
        display: flex;
        flex-direction: column;

        gap: 2rem;
    }

    .github-profile-name {
        font-size: 3rem;
        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;
    }

    .github-info-main img {
        width: 16rem;
        height: 16rem;

        border-radius: 50%;

        z-index: 0;
    }
`