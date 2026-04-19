import styled from "styled-components";
import {
  orbitalPanelCss,
  scrollableContentCss,
  surfaceCardCss,
} from "../../../utils/styleMixins";

export const EditorContainer = styled.section`
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
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

    .editor-section {
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

    input,
    textarea,
    select {
        width: 100%;
        min-height: 4.8rem;
        padding: 1.4rem 1.6rem;
        font-size: 1.45rem;
    }

    textarea {
        min-height: 12rem;
        resize: vertical;
    }

    .editor-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .editor-toolbar button,
    .editor-footer button {
        width: auto;
        min-width: 0;
        height: 4rem;
        padding: 0 1.3rem;
        font-size: 0.98rem;
    }

    .editor-preview {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
    }

    .preview-header h2 {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(2.6rem, 3vw, 3.8rem);
        line-height: 1.12;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .preview-header p {
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.6rem;
        line-height: 1.8;
    }

    .preview-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .preview-pill {
        padding: 0.7rem 1rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
        font-size: 1.06rem;
        text-transform: uppercase;
    }

    .editor-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        flex-wrap: wrap;
    }

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;

        .editor-grid {
            grid-template-columns: 1fr;
        }
    }
`;

export const BlockCardContainer = styled.div`
    ${surfaceCardCss};
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.6rem;

    .block-card-header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .block-card-header strong {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.08rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .block-actions {
        display: flex;
        gap: 0.8rem;
        flex-wrap: wrap;
    }

    .block-actions button,
    .block-add-button {
        width: auto;
        min-width: 0;
        height: 4rem;
        padding: 0 1.3rem;
        font-size: 0.98rem;
    }

    .block-inline-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .reference-item {
        ${surfaceCardCss};
        padding: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    @media (max-width: 1100px) {
        .block-inline-grid {
            grid-template-columns: 1fr;
        }
    }
`;
