import styled from "styled-components";
import Box from "@mui/material/Box";

export const ProjectDescriptionContainer = styled(Box)`

    color: #88c4c9;
    text-shadow: 0 0 10px #88c4c9;

    line-height: 4rem;

    overflow: auto;

    &::-webkit-scrollbar {          
        background-color: #ffffff00; 
        width: 1rem;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3rem; 
        background-color: #26a0a8;
    }

.project-description-title {
    margin-top: 5rem;
    font-size: 4rem;
}

.project-description-content {
    margin-top: 5rem;
    font-size: 2rem;
}
   
`