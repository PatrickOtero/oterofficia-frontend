import styled from "styled-components";
import Box from "@mui/material/Box";

export const HomeContainer = styled(Box)`
    position: relative;
    z-index: 4;

    display: flex;
    align-items: center;
    justify-content: center;

    width: min(40rem, 88vw);
    min-height: 0;
    overflow: visible;
`;