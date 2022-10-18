import { Box } from "@mui/system";
import styled from "styled-components";

export const DirectMessageContainer = styled(Box)`
    display: flex;
    flex-direction: column;

    padding: 2rem;

    gap: 2rem;
        
    border-radius: 3rem;

    animation: hologramBeamSection 10ms linear infinite;

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
`