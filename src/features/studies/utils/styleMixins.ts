import { css } from "styled-components";

export const orbitalPanelCss = css`
    border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
    border-radius: 3rem;
    background:
        linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.92) 0%, rgba(7, 16, 27, 0.84) 100%);
    box-shadow:
        0 1.8rem 3.2rem rgba(0, 0, 0, 0.2),
        inset 0 0 0 1px rgba(255, 255, 255, 0.02),
        inset 0 0 1.2rem rgba(var(--scene-accent-rgb), 0.04);
    backdrop-filter: blur(6px);
`;

export const surfaceCardCss = css`
    border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
    border-radius: 2.2rem;
    background:
        linear-gradient(180deg, rgba(15, 28, 41, 0.78) 0%, rgba(10, 17, 27, 0.7) 100%);
    box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.02),
        0 0.9rem 1.8rem rgba(0, 0, 0, 0.14);
`;

export const scrollableContentCss = css`
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.8rem;
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: rgba(var(--scene-accent-rgb), 0.34);
    }
`;

export const subtleButtonCss = css`
    width: auto;
    min-width: 0;
    height: 4.4rem;
    padding: 0 1.8rem;
    border-radius: 1.4rem;
    font-size: 1.15rem;
    letter-spacing: 0.1em;
`;
