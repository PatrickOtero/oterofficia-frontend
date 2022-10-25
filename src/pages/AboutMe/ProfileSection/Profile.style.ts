import { Box } from "@mui/system";
import styled from "styled-components";

export const ProfileContainer = styled(Box)`
    display: flex;
    flex-direction: column;

    gap: 5rem;

    .aboutme-section-info {
        display: flex;
        align-items: center;

        gap: 5rem;
    }

    .aboutme-page-main ul {
        display: flex;
        flex-direction: column;

        gap: 2rem;
    }

    .aboutme-titles {
        font-size: 3rem;
    }

    .aboutme-page-main h2 {
        font-size: 2rem;
    }

    .aboutme-name {
        font-size: 5rem;
        line-height: 6rem;
    }

    li {
        margin-left: 2rem;
        font-size: 2rem;       
    }

    .profile-description {
        font-size: 2rem;      
    }

    .profile-photo {
        border-radius: 3rem;
        height: 30rem;
        width: 25rem;
    }  
`