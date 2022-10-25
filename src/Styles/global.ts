import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    border: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    display: flex;

    background-color: ${props => props.theme.backgroundColor};
    font-family: 'Open Sans', sans-serif;
}

.App {
    display: flex;

    max-width: 100vw;
    max-height: 100vh;

    overflow: hidden;

    perspective: 1000rem;
    transform-style: preserve-3d;
}

a {
    text-decoration: none;

    color: #2dcdd8;
    text-shadow: 0 0 10px #96e0e7;

    transition: 200ms;
    
    &:hover {
        color: #63d3db;
        text-shadow: 0 0 10px #96e0e7;     
    }
}

button {
    border-radius: 1rem;
    background-color: #288a9128;
    box-shadow: 0 0 50px 10px #56cbd3 inset;

    color: #88c4c9;
    font-size: 1.5rem;
    font-weight: 800;
    text-shadow: 0 0 10px #88c4c9;

    width: 20rem;
    height: 6rem;

    transition: 200ms;

    cursor: pointer;

    &:hover {
        background-color: #288a9100;
        box-shadow: 0 0 20px 15px #288a91 inset;            
    }
}

input, textarea {
    border-radius: 1rem;

    background-color: #288a9177;
    color: #2dcdd8;
    text-shadow: 0 0 10px #96e0e7;

    padding-left: 2rem;

    border: none;
}

b, p, span, h1, h2, h3, h4, h5, h6 {
    cursor: default;
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