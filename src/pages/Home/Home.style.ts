import styled from "styled-components";

export const HomeContainer = styled.div`
    position: relative;
    z-index: 4;

    display: flex;
    align-items: center;
    justify-content: center;

    width: min(40rem, 88vw);
    min-height: 0;
    overflow: visible;

    .home-access-dock {
        position: fixed;
        left: clamp(2rem, 4vw, 5rem);
        bottom: clamp(2rem, 4vh, 4rem);
        z-index: 5;

        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: min(30rem, calc(100vw - 4rem));
        padding: 1.6rem 1.8rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        border-radius: 2.2rem;
        background:
            linear-gradient(180deg, rgba(10, 18, 28, 0.82) 0%, rgba(5, 10, 18, 0.74) 100%);
        box-shadow:
            0 1rem 2.1rem rgba(0, 0, 0, 0.2),
            inset 0 0 0 1px rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(5px);
    }

    .home-access-label {
        color: rgba(var(--scene-accent-soft-rgb), 0.68);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.02rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .home-access-user {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.5rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .home-access-actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.8rem;
    }

    .home-access-actions button {
        width: 100%;
        min-width: 0;
        height: 4.2rem;
        padding: 0 1.2rem;
        border-radius: 1.4rem;
        font-size: 1rem;
        letter-spacing: 0.08em;
    }

    .home-access-actions .secondary {
        background: rgba(13, 28, 42, 0.72);
    }

    @media (max-width: 900px) {
        .home-access-dock {
            left: 1.6rem;
            right: 1.6rem;
            bottom: 1.6rem;
            min-width: 0;
        }

        .home-access-actions {
            grid-template-columns: 1fr;
        }
    }
`;
