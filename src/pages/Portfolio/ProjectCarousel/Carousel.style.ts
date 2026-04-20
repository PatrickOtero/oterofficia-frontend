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
    gap: 1.6rem;

    width: min(124rem, 95vw);
    height: min(92rem, calc(100vh - 4rem));
    padding: 1.8rem;

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
        padding: 1.8rem;
    }

    .portfolio-hero {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    .hero-head,
    .section-header {
        display: flex;
        justify-content: space-between;
        gap: 1.2rem;
        align-items: flex-start;
    }

    .hero-copy,
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
        gap: 0.9rem;
    }

    .hero-copy {
        max-width: 56rem;
    }

    .hero-eyebrow,
    .section-kicker,
    .initiative-copy strong,
    .project-card-role {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.98rem;
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
        font-size: clamp(2.6rem, 4vw, 4rem);
    }

    .spotlight-copy h2,
    .section-copy h2,
    .initiative-copy h2 {
        font-size: clamp(1.9rem, 2.6vw, 3rem);
    }

    .project-card-copy h3 {
        font-size: 1.9rem;
        line-height: 1.16;
    }

    .hero-description,
    .initiative-copy p,
    .initiative-note,
    .section-copy p,
    .spotlight-highlight,
    .spotlight-description p,
    .project-card-highlight,
    .project-card-description,
    .project-link-muted {
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-size: 1.42rem;
        line-height: 1.7;
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

    .hero-metrics {
        justify-content: flex-end;
        max-width: 46rem;
    }

    .hero-metric,
    .project-badge,
    .project-tag,
    .initiative-pill,
    .section-count {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        min-height: 3.4rem;
        padding: 0 0.95rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
        font-size: 0.94rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .hero-metric strong {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-size: 1.12rem;
        font-weight: 700;
    }

    .hero-action,
    .project-link-chip,
    .initiative-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 4rem;
        padding: 0 1.3rem;
        border-radius: 1.3rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background: rgba(10, 20, 32, 0.54);
        color: rgba(var(--scene-title-rgb), 0.92);
        font-size: 0.98rem;
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

    .hero-action-secondary {
        margin-left: auto;
    }

    .initiative-card {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 1.2rem;
        align-items: center;
    }

    .initiative-side {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        min-width: 23rem;
    }

    .portfolio-spotlight {
        display: grid;
        grid-template-columns: minmax(34rem, 0.9fr) minmax(0, 1.1fr);
        gap: 1.5rem;
        scroll-margin-top: 2rem;
    }

    .spotlight-media {
        position: relative;
        overflow: hidden;
        border-radius: 2rem;
        min-height: 36rem;
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
        gap: 0.8rem;
    }

    .portfolio-section {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
    }

    .section-copy {
        gap: 0.5rem;
        max-width: 52rem;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(29rem, 1fr));
        gap: 1.1rem;
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
        gap: 0.9rem;
        padding: 1.5rem;
    }

    .project-card-header {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
    }

    .project-card-description {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .project-card-footer {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        margin-top: auto;
    }

    .project-card-hint {
        color: rgba(var(--scene-title-rgb), 0.94);
        font-size: 0.94rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .project-link-muted {
        font-size: 1.16rem;
    }

    .portfolio-empty {
        padding: 2rem;
        text-align: center;
    }

    @media (max-width: 1100px) {
        .hero-head,
        .portfolio-spotlight,
        .initiative-card {
            grid-template-columns: 1fr;
            flex-direction: column;
        }

        .hero-head {
            align-items: flex-start;
        }

        .hero-metrics {
            justify-content: flex-start;
            max-width: none;
        }

        .hero-action-secondary {
            margin-left: 0;
        }

        .initiative-side {
            min-width: 0;
        }
    }

    @media (max-width: 760px) {
        width: min(124rem, 96vw);
        height: min(92rem, calc(100vh - 2rem));
        padding: 1.3rem;

        .portfolio-hero,
        .portfolio-spotlight,
        .portfolio-section,
        .initiative-card {
            padding: 1.5rem;
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
