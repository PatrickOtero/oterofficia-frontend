import styled from "styled-components";
import Box from "@mui/material/Box";

export const GreetTextContainer = styled(Box)`
    @keyframes hologramTextShowing {
        from {
            opacity: 0;
            transform: translate3d(0, 0.8rem, 0);
        }

        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    position: absolute;
    top: -4.8rem;
    left: 50%;

    transform: translateX(-50%);
    animation: hologramTextShowing 220ms ease;
    pointer-events: none;

    .apparition-container {
        padding: 1rem 1.6rem;

        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        background: rgba(var(--scene-panel-rgb), 0.82);
        box-shadow: 0 1rem 2.2rem rgba(0, 0, 0, 0.18);
        white-space: nowrap;
    }

    b {
        color: rgba(var(--scene-accent-soft-rgb), 0.9);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.35rem;
        letter-spacing: 0.08em;
    }
`;
