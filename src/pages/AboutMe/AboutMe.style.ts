import styled from "styled-components";
import Box from "@mui/material/Box";

export const AboutMeContainer = styled(Box)`
    @keyframes aboutPanelReveal {
        from {
            opacity: 0;
            transform: translateY(1.6rem) scale(0.98);
        }

        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    position: relative;
    z-index: 4;

    width: min(80rem, 92vw);
    height: min(90rem, calc(100vh - 4rem));
    max-height: 90rem;

    animation: aboutPanelReveal 500ms ease;
    transition: transform 400ms ease, opacity 400ms ease;

    color: rgba(var(--scene-accent-soft-rgb), 0.9);

    line-height: 1.7;
    
    .aboutme-page-main {
        position: relative;
        
        display: flex;
        flex-direction: column;

        overflow: auto;

        padding: 4.8rem 4.8rem 4rem;

        gap: 3.6rem;
        
        width: 100%;
        height: 100%;

        border: 1px solid rgba(var(--scene-accent-rgb), var(--scene-panel-border-opacity));
        border-radius: 3rem;
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), calc(var(--scene-panel-opacity) + 0.08)) 0%, rgba(8, 19, 35, 0.78) 100%);
        box-shadow:
            0 2.4rem 5rem rgba(0, 0, 0, 0.24),
            inset 0 0 0 1px rgba(255, 255, 255, 0.02);

        &::-webkit-scrollbar {          
            background-color: #ffffff00; 
            width: 0.8rem;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3rem;
            background-color: rgba(var(--scene-accent-rgb), 0.5);
        }

        &::before {
            content: "";
            position: absolute;
            inset: 1.4rem;
            border-radius: 2.2rem;
            border: 1px solid rgba(var(--scene-accent-rgb), 0.08);
            pointer-events: none;
        }
    }

    .aboutme-close-button {
        position: absolute;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 999px;

        font-size: 1.6rem;
        cursor: pointer;

        right: 2.4rem;
        top: 2.4rem;

        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        background: rgba(var(--scene-accent-rgb), 0.08);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        transition: transform 200ms ease, background-color 200ms ease, color 200ms ease;

        &:hover {
            transform: translateY(-0.2rem);
            background: rgba(var(--scene-accent-rgb), 0.14);
            color: rgba(var(--scene-accent-soft-rgb), 0.96);
        }
    }

    @media (max-width: 900px) {
        height: min(90rem, calc(100vh - 2rem));

        .aboutme-page-main {
            padding: 4.8rem 2.2rem 3.2rem;
            gap: 3rem;
        }
    }
`;
