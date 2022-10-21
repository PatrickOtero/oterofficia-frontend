import { Box } from "@mui/system";
import styled from "styled-components";

export const EmailContainer = styled(Box)`
    display: flex;
    flex-direction: column;

    padding: 2rem;

    gap: 2rem;
        
    border-radius: 3rem;

    animation: hologramBeamSection 10ms linear infinite;

    label {
        font-size: 2rem;
    }

     p {
        font-size: 2rem;
    }

    .email-section-title {
        font-size: 3rem;
        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;
    }

    .email-section-info-main {
        display: flex;
        flex-direction: column;

        justify-content: center;

        gap: 3rem;
    }

    .email-section-info-main div {
        display: flex;
        flex-direction: column;

        gap: 1rem;
    }

    .email-input-container input {
        width: 50rem;
        height: 5rem;

        font-size: 2rem;
    }

    .email-content-input-container textarea {
        width: 50rem;
        height: 15rem;

        font-size: 2rem;
    }
`