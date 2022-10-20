import styled from "styled-components";
import Box from "@mui/material/Box";

export const SectionContainer = styled(Box)`
    display: flex;
    flex-direction: column;

    padding: 2rem;

    gap: 2rem;
        
    border-radius: 3rem;

    .section-title {
        font-size: 4rem;
        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;
    }

    .section-info-main {
        display: flex;
        align-items: center;

        gap: 3rem;
    }

    .section-description {
        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;
        font-size: 2rem;

        height: 20rem;

        overflow: auto;

        &::-webkit-scrollbar {          
            background-color: #ffffff00; 
            width: 1rem;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3rem; 
            background-color: #26a0a8;
        }
    }

    .img-container {
        position: relative;
    }

    .section-info-main img {
        width: 16rem;
        height: 16rem;

        border-radius: 50%;

        z-index: 0;
    }   

    .img-filter {
        position: absolute;
        width: 16rem;
        height: 16rem;

        border-radius: 50%;

        background-color: #88c4c986;
        animation: imgHologramEffect 10ms linear infinite;
        
        transition: 400ms;

        z-index: 1;

        &:hover {
            animation: imgHologramEffect 10ms linear infinite;
            background-color: #88c4c900;
            
            cursor: pointer;
        }
    }

    .section-name-and-description {
        display: flex;
        flex-direction: column;

        gap: 2rem;
    }

    .section-profile-name {
        font-size: 3rem;
        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;
    }
`