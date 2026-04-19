import { Box } from "@mui/system";
import styled from "styled-components";

export const ProfileContainer = styled(Box)`
    display: flex;
    flex-direction: column;

    gap: 3rem;

    .aboutme-section-info {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        gap: 3rem;
    }

    .aboutme-page-main ul {
        display: flex;
        flex-direction: column;

        gap: 1.2rem;
    }

    .aboutme-titles {
        font-family: "IBM Plex Mono", monospace;
        font-size: 2.4rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(var(--scene-accent-soft-rgb), 0.9);
    }

    .aboutme-page-main h2 {
        margin-top: 1.6rem;
        font-size: 1.8rem;
        letter-spacing: 0.04em;
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
    }

    .aboutme-name {
        max-width: 24rem;
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(4rem, 6vw, 5.4rem);
        line-height: 1.05;
        letter-spacing: 0.08em;
        color: rgba(var(--scene-title-rgb), 0.94);
    }

    li {
        margin-left: 2rem;
        font-size: 1.8rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
    }

    .profile-description {
        max-width: 62rem;
        font-size: 1.8rem;
        line-height: 1.8;
        color: rgba(var(--scene-accent-soft-rgb), 0.74);
    }

    .profile-photo {
        border-radius: 2.8rem;
        height: 30rem;
        width: 24rem;
        object-fit: cover;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        box-shadow:
            0 2rem 4rem rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    }
`;
