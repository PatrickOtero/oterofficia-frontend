import styled from "styled-components";
import Box from "@mui/material/Box";

export const SpaceContainer = styled(Box)`
    @keyframes starsGlow {
        0%, 100% {
            opacity: 0.52;
        }

        50% {
            opacity: 0.8;
        }
    }

    position: absolute;
    inset: 0;

    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    background:
        radial-gradient(circle at 20% 14%, rgba(var(--scene-accent-soft-rgb), 0.08), transparent 22%),
        radial-gradient(circle at 82% 18%, rgba(var(--scene-accent-rgb), 0.06), transparent 18%);

    &::before,
    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-repeat: no-repeat;
    }

    &::before {
        opacity: 0.76;
        animation: starsGlow 14s ease-in-out infinite;
        background-image:
            radial-gradient(circle at 8% 12%, rgba(255, 255, 255, 0.92) 0 1px, transparent 1.8px),
            radial-gradient(circle at 16% 30%, rgba(255, 255, 255, 0.7) 0 1px, transparent 1.6px),
            radial-gradient(circle at 28% 8%, rgba(255, 255, 255, 0.78) 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 38% 24%, rgba(255, 255, 255, 0.62) 0 1px, transparent 1.6px),
            radial-gradient(circle at 52% 14%, rgba(255, 255, 255, 0.88) 0 1.3px, transparent 1.9px),
            radial-gradient(circle at 62% 8%, rgba(255, 255, 255, 0.58) 0 1px, transparent 1.6px),
            radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.82) 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 91% 11%, rgba(255, 255, 255, 0.68) 0 1px, transparent 1.6px),
            radial-gradient(circle at 12% 58%, rgba(255, 255, 255, 0.66) 0 1px, transparent 1.6px),
            radial-gradient(circle at 34% 66%, rgba(255, 255, 255, 0.84) 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 56% 54%, rgba(255, 255, 255, 0.62) 0 1px, transparent 1.6px),
            radial-gradient(circle at 74% 62%, rgba(255, 255, 255, 0.86) 0 1.2px, transparent 1.8px),
            radial-gradient(circle at 88% 46%, rgba(255, 255, 255, 0.64) 0 1px, transparent 1.6px);
    }

    &::after {
        opacity: 0.34;
        background-image:
            radial-gradient(circle at 6% 44%, rgba(var(--scene-accent-soft-rgb), 0.7) 0 1px, transparent 2px),
            radial-gradient(circle at 20% 72%, rgba(var(--scene-accent-soft-rgb), 0.58) 0 1px, transparent 2px),
            radial-gradient(circle at 42% 52%, rgba(var(--scene-accent-soft-rgb), 0.52) 0 1px, transparent 2px),
            radial-gradient(circle at 58% 74%, rgba(var(--scene-accent-soft-rgb), 0.72) 0 1px, transparent 2px),
            radial-gradient(circle at 76% 68%, rgba(var(--scene-accent-soft-rgb), 0.48) 0 1px, transparent 2px),
            radial-gradient(circle at 93% 58%, rgba(var(--scene-accent-soft-rgb), 0.58) 0 1px, transparent 2px);
    }
`;
