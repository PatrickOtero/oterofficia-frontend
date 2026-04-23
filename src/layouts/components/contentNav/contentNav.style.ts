import styled from "styled-components";

export const ContentNavigationContainer = styled.nav`
    position: absolute;
    top: clamp(8.4rem, 13vh, 10.4rem);
    right: clamp(2rem, 6vw, 7rem);
    z-index: 10;

    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-end;

    .content-nav-link,
    .content-nav-button-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 4.2rem;
        padding: 0 1.6rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background: rgba(9, 18, 27, 0.56);
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.02rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        backdrop-filter: blur(4px);
    }

    .content-nav-button-link {
        cursor: pointer;
    }

    .content-nav-link.active,
    .content-nav-button-link.active {
        border-color: rgba(var(--scene-accent-rgb), 0.32);
        color: rgba(var(--scene-title-rgb), 0.96);
        box-shadow: inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.08);
    }

    @media (max-width: 900px) {
        display: none;
    }
`;
