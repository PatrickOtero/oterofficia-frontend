import styled from "styled-components";
import Box from "@mui/material/Box";

export const ProjectDescriptionContainer = styled(Box)`
    width: 100%;
    color: rgba(var(--scene-accent-soft-rgb), 0.78);
    line-height: 1.8;

    overflow: auto;
    padding-top: 2.2rem;

    &::-webkit-scrollbar {          
        background-color: #ffffff00; 
        width: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 3rem;
        background-color: rgba(var(--scene-accent-rgb), 0.5);
    }

.project-description-title {
    margin-top: 0;
    font-family: "IBM Plex Mono", monospace;
    font-size: 3.2rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(var(--scene-title-rgb), 0.9);
}

.project-description-content {
    margin-top: 2.4rem;
    font-size: 1.8rem;
}

.front-end-link-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;

    b {
        font-size: 2.1rem;
    }

    a {
        font-size: 1.8rem;
    }

    margin-top: 3rem;
    margin-bottom: 2rem;
}

.back-end-link-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    
    b {
        font-size: 2.1rem;
    }

    a {
        font-size: 1.8rem;
    }
}
   
`;
