import { Box } from "@mui/system";
import styled from "styled-components";

export const EmailContainer = styled(Box)`
    @keyframes messageShowing {
        from {
            opacity: 0;
            transform: translateX(-1.2rem);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    display: flex;
    flex-direction: column;

    padding: 2.6rem;

    gap: 1.8rem;
        
    border-radius: 2.8rem;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
    background: rgba(7, 17, 31, 0.38);

    label {
        font-size: 1.5rem;
        letter-spacing: 0.04em;
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
    }

     p {
        max-width: 56rem;
        font-size: 1.8rem;
        line-height: 1.7;
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
    }

    .email-section-messages {
        font-size: 1.5rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.9);
        
        animation: messageShowing 300ms ease;
        transition: opacity 250ms ease, transform 250ms ease;
    }

    .email-section-title {
        font-family: "IBM Plex Mono", monospace;
        font-size: 2.2rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
    }

    .email-section-info-main {
        position: relative;
        display: flex;
        flex-direction: column;

        justify-content: center;
        gap: 2.2rem;
    }

    .email-input-container, .name-input-container, .subject-input-container {
        display: flex;
        flex-direction: column;

        gap: 0.8rem;
    }

    .email-input-container input, .name-input-container input, .subject-input-container input {
        width: min(50rem, 100%);
        height: 5.2rem;

        font-size: 1.8rem;
    }

    .email-content-input-container {
        display: flex;
        flex-direction: column;

        gap: 0.8rem;
    }

    .email-content-input-container textarea {
        width: min(50rem, 100%);
        min-height: 15rem;

        font-size: 1.8rem;

        margin-bottom: 0.6rem;
        resize: vertical;
    }

    .email-buttons-container {
        display: flex;
        flex-wrap: wrap;

        gap: 1.6rem;
        margin-top: 0.6rem;
    }

    .email-buttons-container button {
        min-width: 16rem;
        height: 4.4rem;
        font-size: 1.5rem;
    }

    .email-return-button {
        background-color: rgba(var(--scene-accent-rgb), 0.04);
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
    }

    .email-send-button {
        background:
            linear-gradient(180deg, rgba(var(--scene-accent-soft-rgb), 0.94), rgba(var(--scene-accent-rgb), 0.88));
        color: #05222a;
        border-color: rgba(var(--scene-accent-soft-rgb), 0.34);
        box-shadow: 0 1rem 2.4rem rgba(var(--scene-accent-rgb), 0.16);
    }

    @media (max-width: 900px) {
        padding: 2.2rem;
    }
`;
