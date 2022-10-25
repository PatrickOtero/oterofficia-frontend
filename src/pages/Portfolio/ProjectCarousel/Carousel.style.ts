import styled from "styled-components";
import Box from "@mui/material/Box";

export const ProjectCarouselContainer = styled(Box)`
    @keyframes hologramExpandToPortfolio {
        0% {
            height: 60rem;
            width: 40rem;         
        }

        100% {
            width: 70rem;
            height: 45rem;
        }
    }

    @keyframes portfolioCarouselFadingIn {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes imgHologramEffect {
        0% {
            box-shadow: 0 0 10px 30px #288a91 inset;
        }

        50% {
            box-shadow: 0 0 220px -50px #288a91 inset;
        }

        100% {
            box-shadow: 0 0 10px 30px #288a91 inset;
        }
    }

    @keyframes projectNameShow {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes floatingArrow {
        0% {
            margin-bottom: 1rem;
        }

        50% {
            margin-bottom: 0rem;
        }

        to {
            margin-bottom: 1rem;
        }
    }   
    
    position: relative;

    display: flex;
    align-items: center;
    flex-direction: column;

    padding: 2rem 6rem 6rem 6rem;

    width: 70rem;
    height: 45rem;
    
    border-radius: 5rem;

    color: #88c4c9;
    text-shadow: 0 0 10px #88c4c9;

    animation: hologramExpandToPortfolio 500ms;
    background-color: #288a9128;
    box-shadow: 0px 0px 50px 10px #288a91 inset;
    transition: 600ms;

    .portfolio-close-button {
        position: absolute;

        font-size: 2rem;
        cursor: pointer;
        
        right: 2rem;
        top: 2rem;
    }

    .portfolio-button {
        position: absolute;
        justify-content: center;
        align-items: center;

        display: flex;

        background-color: #288a9100;
        box-shadow: 0 0 50px 10px #288a9100 inset;
        border-radius: 1rem 1rem 0 0;

        &:hover {
            box-shadow: 0 0 30px -10px #288a91 inset;
        }
    }

    .previous {
        top: 9rem;
        left: 0rem;
        z-index: 3;

        width: 4rem;
        height: 30rem;

        border-radius: 0;

        b {
            transform: rotate(90deg);
            cursor: pointer;
        }

        .arrowUp {
            transform: rotate(-180deg);
        }
    }

    .next {
        top: 9rem;
        right: 0rem;
        z-index: 3;

        width: 4rem;
        height: 30rem;

        border-radius: 0;

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
        
        opacity: 0;

        width: 62rem;
        height: 37rem;
        border-radius: 3rem;

        margin-top: 2rem;

        animation: portfolioCarouselFadingIn 600ms forwards;

        transition: 400ms
    }

    .carousel-effect-1 {
        animation: projectNameShow 600ms forwards;
    }

    .carousel-effect-2 {
        animation: projectNameShow 600ms forwards;
    }

    img {
        width: 62rem;
        height: 37rem;

        border-radius: 3rem;

        transition: 400ms;
    }

    .new-project-shown {
        animation: portfolioCarouselFadingIn 2000ms;
    }

    .project-image-filter {
        position: absolute;

        width: 62rem;
        height: 37rem;
        border-radius: 3rem;

        top: 0;

        animation: imgHologramEffect 10ms linear infinite;
        background-color: #88c4c900;
        
        transition: 400ms;

        z-index: 1;

        &:hover {
            background-color: #88c4c98f;
            animation: imgHologramEffect 10ms linear infinite;
        }
    }

    .project-name {
        position: absolute;

        animation: projectNameShow 400ms;

        font-size: 5rem;
        color: #FFFFFF;
        text-shadow: 0 0 10px #FFFFFF;
        
        z-index: 2;
    }

    .project-description-button-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .project-description-button-container button {
        width: 45rem;
        height: 3.6rem;

        transition: 400ms;

        margin-top: 3rem;

        bottom: 0;
    }

    .button-description-arrow {
        position: absolute;
        color: white;

        font-size: 2rem;
        color: #88c4c9;
        text-shadow: 0 0 10px #88c4c9;

        animation: floatingArrow 1000ms linear infinite;
        transition: 400ms;
    }

    .arrow1 {
        bottom: 0;
        right: 15rem;
    }

    .arrow2 {
        bottom: 0;
        left: 15rem;
    }

    .arrowUp {
        transform: rotate(-180deg);
    }
`