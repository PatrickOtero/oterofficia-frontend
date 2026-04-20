import styled from "styled-components";
import {
  orbitalPanelCss,
  scrollableContentCss,
  surfaceCardCss,
} from "../../../features/studies/utils/styleMixins";

export const ProjectCarouselContainer = styled.section`
    ${orbitalPanelCss};
    ${scrollableContentCss};

    position: relative;
    z-index: 4;

    display: flex;
    flex-direction: column;
    gap: 1.8rem;

    width: min(124rem, 95vw);
    height: min(92rem, calc(100vh - 4rem));
    padding: 2rem;

    .portfolio-close-button {
        position: sticky;
        top: 0;
        margin-left: auto;
        z-index: 3;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3.8rem;
        height: 3.8rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.5rem;
        cursor: pointer;
        transition: transform 180ms ease, background-color 180ms ease, color 180ms ease;
    }

    .portfolio-close-button:hover {
        transform: translateY(-0.2rem);
        background: rgba(var(--scene-accent-rgb), 0.14);
        color: rgba(var(--scene-accent-soft-rgb), 0.96);
    }

    .portfolio-hero,
    .portfolio-spotlight,
    .portfolio-section,
    .initiative-card,
    .portfolio-empty {
        ${surfaceCardCss};
    }

    .portfolio-hero,
    .portfolio-spotlight,
    .initiative-card,
    .portfolio-section {
        padding: 2.2rem;
    }

    .portfolio-hero {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(32rem, 0.75fr);
        gap: 1.6rem;
    }

    .hero-copy,
    .hero-side,
    .initiative-copy,
    .spotlight-copy,
    .section-copy,
    .project-card-copy {
        display: flex;
        flex-direction: column;
    }

    .hero-copy,
    .initiative-copy,
    .spotlight-copy,
    .project-card-copy {
        gap: 1.2rem;
    }

    .hero-side {
        gap: 1.2rem;
    }

    .hero-eyebrow,
    .section-kicker,
    .initiative-copy strong,
    .project-card-role {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .hero-copy h1,
    .spotlight-copy h2,
    .section-copy h2,
    .initiative-copy h2,
    .project-card-copy h3 {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        line-height: 1.08;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .hero-copy h1 {
        font-size: clamp(3rem, 4.8vw, 5.2rem);
    }

    .spotlight-copy h2,
    .section-copy h2,
    .initiative-copy h2 {
        font-size: clamp(2rem, 2.8vw, 3.2rem);
    }

    .project-card-copy h3 {
        font-size: 2rem;
        line-height: 1.16;
    }

    .hero-description,
    .hero-note,
    .initiative-copy p,
    .initiative-note,
    .section-copy p,
    .spotlight-highlight,
    .spotlight-description p,
    .project-card-highlight,
    .project-card-description,
    .project-link-muted {
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-size: 1.55rem;
        line-height: 1.74;
    }

    .hero-metrics,
    .hero-actions,
    .project-link-list,
    .project-card-badges,
    .spotlight-meta,
    .project-tag-list,
    .initiative-highlights {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .hero-metric,
    .project-badge,
    .project-tag,
    .initiative-pill,
    .section-count {
        display: inline-flex;
        align-items: center;
        gap: 0.7rem;
        min-height: 3.6rem;
        padding: 0 1rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
        font-size: 0.98rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .hero-metric strong {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-size: 1.2rem;
        font-weight: 700;
    }

    .hero-action,
    .project-link-chip,
    .initiative-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 4.2rem;
        padding: 0 1.4rem;
        border-radius: 1.4rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background: rgba(10, 20, 32, 0.54);
        color: rgba(var(--scene-title-rgb), 0.92);
        font-size: 1rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
    }

    .hero-action:hover,
    .project-link-chip:hover,
    .initiative-link:hover {
        transform: translateY(-0.18rem);
        border-color: rgba(var(--scene-accent-rgb), 0.28);
        background: rgba(var(--scene-accent-rgb), 0.08);
    }

    .hero-panel {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.8rem;
        background:
            linear-gradient(180deg, rgba(10, 20, 32, 0.9) 0%, rgba(7, 16, 27, 0.78) 100%);
    }

    .hero-panel-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }

    .hero-panel-stat {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        padding: 1.4rem;
        background: rgba(7, 16, 28, 0.7);
    }

    .hero-panel-stat b {
        color: rgba(var(--scene-title-rgb), 0.97);
        font-family: "IBM Plex Mono", monospace;
        font-size: 2.4rem;
        letter-spacing: 0.06em;
    }

    .hero-panel-stat span {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 1rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .initiative-card {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 1.4rem;
        align-items: start;
    }

    .initiative-card-compact {
        grid-template-columns: 1fr;
    }

    .initiative-side {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 22rem;
    }

    .portfolio-spotlight {
        display: grid;
        grid-template-columns: minmax(34rem, 0.95fr) minmax(0, 1.05fr);
        gap: 1.6rem;
        scroll-margin-top: 2rem;
    }

    .spotlight-media {
        position: relative;
        overflow: hidden;
        border-radius: 2.2rem;
        min-height: 42rem;
        background:
            radial-gradient(circle at 22% 20%, rgba(var(--scene-accent-rgb), 0.16), transparent 38%),
            rgba(6, 14, 23, 0.86);
    }

    .spotlight-media::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(180deg, rgba(6, 14, 23, 0) 0%, rgba(6, 14, 23, 0.08) 42%, rgba(6, 14, 23, 0.28) 100%);
        pointer-events: none;
    }

    .spotlight-media img,
    .project-card-media img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .spotlight-copy {
        justify-content: center;
    }

    .spotlight-description {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
    }

    .portfolio-section {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: flex-start;
    }

    .section-copy {
        gap: 0.8rem;
        max-width: 72rem;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(29rem, 1fr));
        gap: 1.2rem;
    }

    .project-card {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        overflow: hidden;
        cursor: pointer;
        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
    }

    .project-card:hover,
    .project-card:focus-visible {
        transform: translateY(-0.24rem);
        border-color: rgba(var(--scene-accent-rgb), 0.24);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.03),
            0 1.5rem 2.8rem rgba(0, 0, 0, 0.18);
    }

    .project-card-active {
        border-color: rgba(var(--scene-accent-rgb), 0.3);
        box-shadow:
            inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.08),
            0 1.5rem 2.8rem rgba(0, 0, 0, 0.18);
    }

    .project-card-media {
        position: relative;
        aspect-ratio: 16 / 10;
        overflow: hidden;
        background: rgba(7, 15, 24, 0.76);
    }

    .project-card-copy {
        gap: 1rem;
        padding: 1.6rem;
    }

    .project-card-header {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .project-card-description {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .project-card-footer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: auto;
    }

    .project-card-hint {
        color: rgba(var(--scene-title-rgb), 0.94);
        font-size: 0.98rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .project-link-muted {
        font-size: 1.18rem;
    }

    .portfolio-empty {
        padding: 2.2rem;
        text-align: center;
    }

    @media (max-width: 1100px) {
        .portfolio-hero,
        .portfolio-spotlight,
        .initiative-card {
            grid-template-columns: 1fr;
        }

        .initiative-side {
            min-width: 0;
        }
    }

    @media (max-width: 760px) {
        width: min(124rem, 96vw);
        height: min(92rem, calc(100vh - 2rem));
        padding: 1.4rem;

        .portfolio-hero,
        .portfolio-spotlight,
        .portfolio-section,
        .initiative-card {
            padding: 1.6rem;
        }

        .hero-panel-grid {
            grid-template-columns: 1fr;
        }

        .section-header {
            flex-direction: column;
        }

        .projects-grid {
            grid-template-columns: 1fr;
        }

        .spotlight-media {
            min-height: 24rem;
        }
    }
`;
