import { Box } from "@mui/system";
import styled from "styled-components";

export const DirectMessageContainer = styled(Box)`    
    display: flex;
    flex-direction: column;

    padding: 2.4rem;
    gap: 2rem;
        
    border-radius: 2.8rem;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
    background: rgba(7, 17, 31, 0.38);

    .section-title {
        font-family: "IBM Plex Mono", monospace;
        font-size: 2.2rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
    }

    .section-info-main {
        display: flex;
        align-items: center;

        flex-wrap: wrap;

        gap: 3rem;

        width: 100%;
    }

    .img-container {
        position: relative;
        width: 9.6rem;
        height: 9.6rem;
        border-radius: 2.4rem;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);

        a {
            position: absolute;
            inset: 0;
            z-index: 2;
        }
    }

    .section-info-main img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
    }   

    .img-filter {
        position: absolute;
        inset: 0;

        border-radius: inherit;

        background:
            linear-gradient(180deg, rgba(var(--scene-accent-soft-rgb), 0.2), rgba(var(--scene-accent-rgb), 0.06)),
            linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 60%);
        opacity: 0.34;
        transition: opacity 220ms ease, transform 220ms ease;

        z-index: 1;
        pointer-events: none;
    }

    .img-container:hover .img-filter {
        opacity: 0.08;
        transform: translateY(-0.15rem);
    }

    @media (max-width: 900px) {
        .section-info-main {
            gap: 1.6rem;
        }
    }
`;
