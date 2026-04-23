import styled from "styled-components";
import { contentPageShellCss } from "../../features/studies/utils/pageShells";
import { surfaceCardCss } from "../../features/studies/utils/styleMixins";

export const StudyPostPageContainer = styled.section`
  ${contentPageShellCss};
  gap: 1.8rem;

  .post-cover {
    ${surfaceCardCss};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 28rem;
    padding: 1.4rem;
    overflow: hidden;
    cursor: zoom-in;
  }

  .post-cover img {
    width: 100%;
    max-height: 46rem;
    object-fit: contain;
    border-radius: 1.8rem;
    background: rgba(2, 8, 12, 0.92);
  }

  .post-hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(28rem, 34rem);
    gap: 1.6rem;
    align-items: start;
  }

  .post-header-card,
  .content-card,
  .interaction-card {
    ${surfaceCardCss};
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: 2rem;
  }

  .content-card {
    padding: 2.4rem;
  }

  .post-header-top {
    display: flex;
    justify-content: space-between;
    gap: 1.6rem;
    align-items: flex-start;
  }

  .post-title {
    color: rgba(var(--scene-title-rgb), 0.99);
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(3rem, 4vw, 4.8rem);
    line-height: 1.05;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .post-excerpt {
    color: rgba(var(--scene-accent-soft-rgb), 0.8);
    font-size: 1.75rem;
    line-height: 1.9;
  }

  .meta-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .meta-pill {
    padding: 0.8rem 1.1rem;
    border-radius: 999px;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
    background: rgba(var(--scene-accent-rgb), 0.08);
    color: rgba(var(--scene-accent-soft-rgb), 0.84);
    font-size: 1.08rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .interaction-card-title {
    color: rgba(var(--scene-title-rgb), 0.95);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.2rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .post-like-cluster {
    display: inline-flex;
    align-items: center;
    gap: 0.9rem;
    flex-shrink: 0;
  }

  .post-like-button {
    width: 4.8rem;
    min-width: 0;
    height: 4.8rem;
    padding: 0;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .post-like-button svg {
    transition: transform 180ms ease;
  }

  .post-like-button:hover svg {
    transform: scale(1.08);
  }

  .post-like-button[data-liked="true"] svg {
    fill: rgba(var(--scene-accent-rgb), 0.3);
    color: rgba(var(--scene-title-rgb), 0.98);
  }

  .post-like-count {
    color: rgba(var(--scene-accent-soft-rgb), 0.8);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.16rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .interaction-card p {
    color: rgba(var(--scene-accent-soft-rgb), 0.74);
    font-size: 1.45rem;
    line-height: 1.7;
  }

  .post-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    position: sticky;
    top: 0;
  }

  .interaction-note {
    color: rgba(var(--scene-accent-soft-rgb), 0.7);
    font-size: 1.25rem;
    line-height: 1.7;
  }

  @media (max-width: 1100px) {
    .post-hero-grid {
      grid-template-columns: 1fr;
    }

    .post-sidebar {
      position: static;
    }
  }

  @media (max-width: 900px) {
    .post-cover {
      min-height: 20rem;
      padding: 1rem;
    }

    .content-card,
    .interaction-card,
    .post-header-card {
      padding: 1.8rem;
    }

    .post-header-top {
      flex-direction: column;
      align-items: stretch;
    }

    .post-like-cluster {
      align-self: flex-start;
    }
  }
`;
