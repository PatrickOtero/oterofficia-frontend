import { Box } from "@mui/system";
import styled from "styled-components";

export const DirectMessageContainer = styled(Box)`    
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

        flex-wrap: wrap;

        gap: 3rem;

        width: 100%;
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

        background-color: #88c4c98f;
        animation: imgHologramEffect 10ms linear infinite;
        
        transition: 400ms;

        z-index: 1;

        &:hover {
            animation: imgHologramEffect 10ms linear infinite;
            background-color: #88c4c900;
            
            cursor: pointer;
        }
    }
`