import styled from "styled-components";
import { orbitalPanelCss, surfaceCardCss } from "../../../../studies/utils/styleMixins";

export const AboutRendererContainer = styled.div<{ $preview: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .about-grid {
        display: grid;
        gap: 2rem;
    }

    .about-card {
        ${surfaceCardCss};
        padding: 2.2rem;
    }

    .about-card-title,
    .about-section-title,
    .hero-eyebrow,
    .contact-feedback {
        font-family: "IBM Plex Mono", monospace;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .hero-card {
        ${orbitalPanelCss};
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(24rem, 0.7fr);
        gap: 2rem;
        padding: 2.8rem;
    }

    .hero-copy {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
    }

    .hero-eyebrow,
    .about-section-title {
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-size: 1rem;
    }

    .hero-title {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(3.4rem, 5vw, 5.8rem);
        line-height: 1;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .hero-subtitle,
    .hero-summary,
    .about-text-body,
    .stack-description,
    .social-description,
    .contact-description,
    .contact-form-description {
        color: rgba(var(--scene-accent-soft-rgb), 0.82);
        font-size: 1.65rem;
        line-height: 1.8;
        white-space: pre-wrap;
    }

    .hero-meta,
    .hero-highlights,
    .stack-items,
    .social-grid,
    .contact-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.9rem;
    }

    .meta-pill,
    .stack-pill {
        padding: 0.75rem 1.1rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
        font-size: 1.04rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 0.6rem;
    }

    .hero-action,
    .social-card,
    .contact-item,
    .contact-form button {
        min-height: 4.6rem;
        border-radius: 1.6rem;
    }

    .hero-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 1.8rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        color: rgba(var(--scene-title-rgb), 0.94);
        background: rgba(10, 20, 32, 0.54);
        font-size: 1.1rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        cursor: pointer;
        transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
        pointer-events: ${(props) => (props.$preview ? "none" : "auto")};
    }

    .hero-action:hover,
    .social-card:hover,
    .contact-item:hover {
        transform: translateY(-0.18rem);
        border-color: rgba(var(--scene-accent-rgb), 0.26);
        background: rgba(var(--scene-accent-rgb), 0.08);
    }

    .hero-media {
        ${surfaceCardCss};
        overflow: hidden;
        min-height: 30rem;
    }

    .hero-media img,
    .about-image-card img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hero-media-empty,
    .about-image-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: inherit;
        color: rgba(var(--scene-accent-soft-rgb), 0.56);
        font-size: 1.25rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .about-text-grid,
    .stack-grid,
    .social-section,
    .contact-section,
    .contact-form {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        padding: 2.2rem;
    }

    .about-text-grid.spotlight {
        ${orbitalPanelCss};
    }

    .about-card-title {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-size: clamp(2rem, 3vw, 3rem);
        line-height: 1.15;
    }

    .about-image-card {
        ${surfaceCardCss};
        overflow: hidden;
    }

    .about-image-card.banner img {
        max-height: 34rem;
    }

    .about-image-card.wide img {
        max-height: 46rem;
    }

    .about-image-card.portrait img {
        max-height: 60rem;
        object-fit: contain;
        background: rgba(5, 12, 20, 0.8);
    }

    .about-image-caption {
        padding: 1.4rem 1.8rem 1.8rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.7);
        font-size: 1.35rem;
        line-height: 1.65;
    }

    .stack-groups {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        gap: 1.2rem;
    }

    .stack-group {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        padding: 1.8rem;
    }

    .stack-group-title,
    .social-label,
    .contact-label {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.05rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .social-grid,
    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        gap: 1rem;
    }

    .social-card,
    .contact-item {
        ${surfaceCardCss};
        display: flex;
        align-items: center;
        gap: 1.2rem;
        padding: 1.4rem 1.6rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
        transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
        pointer-events: ${(props) => (props.$preview ? "none" : "auto")};
    }

    .social-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 1.4rem;
        overflow: hidden;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-title-rgb), 0.92);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.2rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .social-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .social-copy,
    .contact-copy {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        min-width: 0;
    }

    .social-handle,
    .contact-note {
        color: rgba(var(--scene-accent-soft-rgb), 0.66);
        font-size: 1.2rem;
        line-height: 1.5;
    }

    .contact-value {
        color: rgba(var(--scene-title-rgb), 0.92);
        font-size: 1.5rem;
        line-height: 1.55;
        word-break: break-word;
    }

    .contact-form-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }

    .contact-form label {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-size: 1.12rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .contact-form input,
    .contact-form textarea {
        width: 100%;
        min-height: 4.8rem;
        padding: 1.4rem 1.5rem;
    }

    .contact-form textarea {
        min-height: 16rem;
        resize: vertical;
    }

    .contact-form .contact-form-full {
        grid-column: 1 / -1;
    }

    .contact-form button {
        width: fit-content;
        min-width: 18rem;
        padding: 0 1.8rem;
    }

    .contact-feedback {
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-size: 1rem;
    }

    .contact-feedback.error {
        color: rgba(255, 138, 138, 0.92);
    }

    .contact-feedback.success {
        color: rgba(140, 228, 184, 0.92);
    }

    @media (max-width: 1100px) {
        .hero-card,
        .contact-form-grid {
            grid-template-columns: 1fr;
        }

        .hero-media {
            min-height: 24rem;
        }
    }
`;
