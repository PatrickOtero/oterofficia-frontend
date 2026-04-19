import styled from "styled-components"
import Box from "@mui/material/Box"

export const DefaultContainer = styled(Box)`
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        min-width: 100vw;
        min-height: 100vh;
        padding: 4rem;

        overflow: hidden;
        isolation: isolate;

    .layout-clickable-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        z-index: 1;
    }

    .planet-system {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    }

    @media (max-width: 900px) {
        padding: 2rem;
    }
`
