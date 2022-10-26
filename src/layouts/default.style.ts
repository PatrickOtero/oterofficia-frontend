import styled from "styled-components"
import Box from "@mui/material/Box"

export const DefaultContainer = styled(Box)`
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        perspective: 1000rem;
        transform-style: preserve-3d;

        min-width: 100vw;
        min-height: 100vh;

    .layout-clickable-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        z-index: -1;

        transform-style: preserve-3d;
    }
`