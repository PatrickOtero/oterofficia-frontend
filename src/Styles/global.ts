import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
    --scene-accent-rgb: 122, 210, 222;
    --scene-accent-soft-rgb: 185, 232, 238;
    --scene-title-rgb: 240, 250, 252;
    --scene-panel-rgb: 8, 16, 24;
    --scene-panel-opacity: 0.82;
    --scene-panel-border-opacity: 0.22;
    --scene-glow-opacity: 0.16;
}

* {
    border: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body, #root {
    min-height: 100%;
}

html {
    font-size: 62.5%;
}

body {
    display: flex;
    background:
        radial-gradient(circle at 50% 16%, rgba(var(--scene-accent-rgb), 0.08), transparent 24%),
        radial-gradient(circle at 86% 14%, rgba(255, 255, 255, 0.05), transparent 10%),
        linear-gradient(180deg, #05080d 0%, #03060a 100%);
    color: rgb(var(--scene-accent-soft-rgb));
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
}

.App {
    display: flex;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
}

a {
    text-decoration: none;
    color: rgba(var(--scene-accent-soft-rgb), 0.92);
    transition:
        color 180ms ease,
        opacity 180ms ease;
    
    &:hover {
        color: rgba(var(--scene-title-rgb), 0.96);
    }
}

button {
    border: 1px solid rgba(var(--scene-accent-rgb), 0.2);
    border-radius: 1.6rem;
    background:
        linear-gradient(180deg, rgba(16, 34, 42, 0.72) 0%, rgba(9, 18, 25, 0.64) 100%);
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.05),
        inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.04);
    color: rgba(var(--scene-accent-soft-rgb), 0.92);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    width: 20rem;
    height: 6rem;
    transition:
        transform 180ms ease,
        border-color 180ms ease,
        background-color 180ms ease,
        box-shadow 180ms ease,
        color 180ms ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-0.1rem);
        border-color: rgba(var(--scene-accent-rgb), 0.34);
        background:
            linear-gradient(180deg, rgba(19, 40, 50, 0.78) 0%, rgba(10, 23, 32, 0.7) 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 0 0 1px rgba(var(--scene-accent-rgb), 0.08);            
    }
}

input, textarea {
    border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
    border-radius: 1.4rem;
    background-color: rgba(16, 34, 42, 0.52);
    color: rgba(var(--scene-title-rgb), 0.9);
    padding: 0 2rem;
    outline: none;
    transition:
        border-color 180ms ease,
        background-color 180ms ease;

    &:focus {
        border-color: rgba(var(--scene-accent-rgb), 0.32);
        background-color: rgba(18, 38, 46, 0.68);
    }
}

b, p, span, h1, h2, h3, h4, h5, h6 {
    cursor: default;
}

img {
    display: block;
    max-width: 100%;
}

.theme-changer {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;

    left: 8rem;
    bottom: 10rem;

    width: 7rem;
    height: 7rem;

    border-radius: 50%;
    background-color: ${props => props.theme.buttons};
}

`
