import styled from "styled-components"
import Box from "@mui/material/Box"

export const DefaultContainer = styled(Box)`
    position: relative;

    perspective: 1000rem;
    transform-style: preserve-3d;

    min-width: 100vw;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`