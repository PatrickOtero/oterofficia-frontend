import styled from "styled-components";
import Box from "@mui/material/Box";

export const ProjectCarouselContainer = styled(Box)`
    @keyframes panelReveal {
        0% {
            opacity: 0;
            transform: translateY(1.2rem) scale(0.98);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes contentReveal {
        0% {
            opacity: 0;
            transform: scale(0.985);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes floatingArrow {
        0%, 100% {
            transform: translateY(0) rotate(var(--arrow-rotate, 0deg));
            opacity: 0.66;
        }

        50% {
            transform: translateY(-0.35rem) rotate(var(--arrow-rotate, 0deg));
            opacity: 1;
        }
    }

    @keyframes loadingBarProgressing {
        0% {
            transform: scaleX(0);
        }
        100% {
            transform: scaleX(1);
        }
    }
    
    position: relative;
    z-index: 4;

    display: flex;
    align-items: center;
    flex-direction: column;

    padding: 2.4rem 5rem 4.8rem;

    width: min(70rem, 92vw);
    height: 45rem;
    
    border-radius: 3rem;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.14);

    color: rgba(var(--scene-accent-soft-rgb), 0.82);

    animation: panelReveal 500ms ease;
    background:
        linear-gradient(180deg, rgba(var(--scene-panel-rgb), calc(var(--scene-panel-opacity) + 0.08)) 0%, rgba(8, 19, 35, 0.78) 100%);
    box-shadow:
        0 2.4rem 5rem rgba(0, 0, 0, 0.24),
        inset 0 0 0 1px rgba(255, 255, 255, 0.02);
    transition: height 500ms ease, transform 500ms ease, opacity 300ms ease;

    &::before {
        content: "";
        position: absolute;
        inset: 1.4rem;
        border-radius: 2.2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.08);
        pointer-events: none;
    }

    .loading-container {
        position: relative;
        width: 24rem;
        margin-top: 12rem;
    }

    .loading-text {
        position: absolute;

        top: -2.5rem;
        font-size: 1.5rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;

        color: rgba(var(--scene-accent-soft-rgb), 0.82);
    }

    .loading-track {
        position: absolute;

        background-color: #ffffff00;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.32);
        border-radius: 999px;
        overflow: hidden;

        height: 1rem;
        width: 100%;
    }

    .loading-bar {
        animation: loadingBarProgressing 10000ms forwards;
        transform-origin: left center;

        height: 100%;
        width: 100%;
        border-radius: inherit;
        background:
            linear-gradient(90deg, rgba(var(--scene-accent-rgb), 0.55), rgba(var(--scene-accent-soft-rgb), 0.96));
        box-shadow: 0 0 1.4rem rgba(var(--scene-accent-rgb), 0.16);
    }

    .portfolio-close-button {
        position: absolute;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 999px;
        font-size: 1.6rem;
        cursor: pointer;
        
        right: 2rem;
        top: 2rem;

        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        background: rgba(var(--scene-accent-rgb), 0.08);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        transition: transform 200ms ease, background-color 200ms ease, color 200ms ease;

        &:hover {
            transform: translateY(-0.2rem);
            background: rgba(var(--scene-accent-rgb), 0.14);
            color: rgba(var(--scene-accent-soft-rgb), 0.94);
        }
    }

    .portfolio-button {
        position: absolute;
        justify-content: center;
        align-items: center;

        display: flex;

        background: rgba(var(--scene-accent-rgb), 0.04);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
        border-radius: 1.4rem;
        box-shadow: none;
        transition: transform 200ms ease, background-color 200ms ease, border-color 200ms ease;

        &:hover {
            transform: translateY(-0.12rem);
            background: rgba(var(--scene-accent-rgb), 0.08);
            border-color: rgba(var(--scene-accent-soft-rgb), 0.2);
        }
    }

    .previous {
        top: 9rem;
        left: 0rem;
        z-index: 3;

        width: 4rem;
        height: 30rem;

        border-left: none;
        border-radius: 0 1.4rem 1.4rem 0;

        b {
            transform: rotate(90deg);
            cursor: pointer;
        }
    }

    .next {
        top: 9rem;
        right: 0rem;
        z-index: 3;

        width: 4rem;
        height: 30rem;

        border-right: none;
        border-radius: 1.4rem 0 0 1.4rem;

        b {
            transform: rotate(-90deg);
            cursor: pointer;
        }
    }

    .image-and-name {
        position: relative;
        display: flex;

        justify-content: center;
        align-items: center;
        
        width: min(62rem, 100%);
        height: 37rem;
        border-radius: 2.6rem;
        overflow: hidden;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(6, 15, 28, 0.56);

        margin-top: 1.8rem;

        animation: contentReveal 500ms ease forwards;

        transition: transform 300ms ease, opacity 300ms ease;
    }

    .carousel-effect-1 {
        animation: contentReveal 400ms ease forwards;
    }

    .carousel-effect-2 {
        animation: contentReveal 400ms ease forwards;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        transition: transform 300ms ease;
    }

    .new-project-shown {
        animation: contentReveal 600ms ease;
    }

    .project-image-filter {
        position: absolute;

        inset: 0;
        border-radius: inherit;
        background:
            linear-gradient(180deg, rgba(var(--scene-accent-soft-rgb), 0.08), rgba(var(--scene-accent-rgb), 0.12)),
            linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 55%);
        opacity: 0.2;
        
        transition: opacity 220ms ease, background-color 220ms ease;

        z-index: 1;
    }

    .project-image-filter-hover {
        background-color: rgba(var(--scene-accent-soft-rgb), 0.14);
        opacity: 0.42;
    }

    .project-link {
        position: absolute;

        animation: contentReveal 250ms ease;

        max-width: 80%;
        font-size: clamp(2.2rem, 3vw, 3rem);
        color: #FFFFFF;
        letter-spacing: 0.06em;
        text-align: center;
        text-shadow: 0 0 1.2rem rgba(255, 255, 255, 0.2);
        
        z-index: 2;
    }

    .projects-list-empty-message {
        max-width: 40rem;
        font-size: 2.2rem;
        line-height: 1.5;
        text-align: center;

        z-index: 1;
    }

    .project-description-button-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 2.6rem;
    }

    .project-description-button-container button {
        position: relative;
        width: min(45rem, 100%);
        height: 4rem;
        margin-top: 0;
    }

    .button-description-arrow {
        position: absolute;
        --arrow-rotate: 0deg;
        font-size: 1.6rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        animation: floatingArrow 1800ms ease-in-out infinite;
        transition: transform 300ms ease;
    }

    .arrow1 {
        top: 5rem;
        left: calc(50% - 18rem);
    }

    .arrow2 {
        top: 5rem;
        right: calc(50% - 18rem);
    }

    .arrowUp {
        --arrow-rotate: 180deg;
    }

    @media (max-width: 900px) {
        padding: 4.8rem 2.6rem 3.6rem;

        .previous,
        .next {
            width: 3.4rem;
            height: 24rem;
            top: 8rem;
        }

        .image-and-name {
            height: 30rem;
        }

        .arrow1 {
            left: calc(50% - 14rem);
        }

        .arrow2 {
            right: calc(50% - 14rem);
        }
    }
`;
