import styled from "styled-components";
import { contentPageShellCss } from "../../features/studies/utils/pageShells";
import { surfaceCardCss } from "../../features/studies/utils/styleMixins";

export const ProfilePageContainer = styled.section`
  ${contentPageShellCss};
  gap: 1.6rem;

  .profile-header,
  .profile-section {
    ${surfaceCardCss};
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: 2rem;
  }

  .profile-header {
    display: grid;
    grid-template-columns: 12rem minmax(0, 1fr);
    gap: 1.8rem;
    align-items: center;
  }

  .profile-avatar {
    width: 12rem;
    height: 12rem;
    border-radius: 2.4rem;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
    background: linear-gradient(180deg, rgba(20, 32, 46, 0.84) 0%, rgba(9, 16, 24, 0.78) 100%);
    object-fit: cover;
  }

  .profile-avatar-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(var(--scene-title-rgb), 0.94);
    font-family: "IBM Plex Mono", monospace;
    font-size: 3.2rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .profile-title {
    color: rgba(var(--scene-title-rgb), 0.98);
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(2.8rem, 4vw, 4rem);
    line-height: 1.05;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .profile-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .profile-pill {
    padding: 0.8rem 1.1rem;
    border-radius: 999px;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
    background: rgba(var(--scene-accent-rgb), 0.08);
    color: rgba(var(--scene-accent-soft-rgb), 0.84);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .profile-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
  }

  .profile-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .profile-actions button {
    width: auto;
    min-width: 0;
    height: 4.2rem;
    padding: 0 1.6rem;
    font-size: 1.02rem;
    letter-spacing: 0.08em;
  }

  .profile-section-title {
    color: rgba(var(--scene-title-rgb), 0.96);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.28rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    color: rgba(var(--scene-accent-soft-rgb), 0.74);
    font-size: 1.2rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  input {
    min-height: 4.8rem;
    padding: 0 1.4rem;
  }

  .profile-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 900px) {
    .profile-header,
    .profile-grid {
      grid-template-columns: 1fr;
    }

    .profile-avatar {
      width: 10rem;
      height: 10rem;
    }
  }
`;
