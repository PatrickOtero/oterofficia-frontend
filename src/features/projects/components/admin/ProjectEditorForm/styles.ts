import styled from "styled-components";
import {
  orbitalPanelCss,
  scrollableContentCss,
  surfaceCardCss,
} from "../../../../studies/utils/styleMixins";

export const ProjectEditorContainer = styled.section`
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 1.6rem;
    height: 100%;

    .editor-column {
        ${orbitalPanelCss};
        ${scrollableContentCss};
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        padding: 2rem;
    }

    .editor-section,
    .preview-panel {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        padding: 1.8rem;
    }

    .editor-section-title {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.24rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .editor-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.2rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .editor-grid .editor-wide {
        grid-column: span 2;
    }

    input,
    textarea {
        width: 100%;
        min-height: 4.8rem;
        padding: 1.4rem 1.6rem;
        font-size: 1.45rem;
    }

    textarea {
        min-height: 18rem;
        resize: vertical;
    }

    .editor-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .editor-footer button {
        width: auto;
        min-width: 0;
        height: 4rem;
        padding: 0 1.4rem;
        font-size: 0.98rem;
    }

    .preview-media {
        overflow: hidden;
        border-radius: 1.8rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(12, 24, 36, 0.7);
        min-height: 24rem;
    }

    .preview-media img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .preview-empty-media {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 24rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.62);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .preview-copy {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .preview-copy h2 {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(2.4rem, 3vw, 3.6rem);
        line-height: 1.12;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .preview-copy p {
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.52rem;
        line-height: 1.7;
        white-space: pre-line;
    }

    .preview-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .preview-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 3.6rem;
        padding: 0 1rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
        font-size: 0.98rem;
        text-transform: uppercase;
    }

    .preview-link.preview-link--empty {
        border-style: dashed;
        background: rgba(255, 255, 255, 0.02);
    }

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;

        .editor-grid {
            grid-template-columns: 1fr;
        }

        .editor-grid .editor-wide {
            grid-column: span 1;
        }
    }
`;