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