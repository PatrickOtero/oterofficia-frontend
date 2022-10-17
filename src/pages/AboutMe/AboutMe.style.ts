import styled from "styled-components";
import Box from "@mui/material/Box";

export const AboutMeContainer = styled(Box)`
    position: absolute;

    height: 60rem;
    width: 40rem;

    transform-style: preserve-3d;

    transform: translateZ(-140);
    
    .aboutme-page-main {
        display: flex;
        align-items: center;
        flex-direction: column;

        padding: 4rem;
        
        width: 100%;
        height: 100%;

        border-radius: 5rem;
        animation: hologramBeamMenu 10ms linear infinite;
        background-color: #288a9128;
        box-shadow: -20px 1px 50px 10px #288a91 inset;
    }
`