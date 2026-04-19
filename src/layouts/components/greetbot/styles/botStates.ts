import { css } from "styled-components";

export const botStatesCss = css`
    .visor-to-top {
        transform: translate3d(0, 0, 0) rotate(0deg);
    }

    .visor-to-left {
        transform: translate3d(-0.45rem, 0, 0) rotate(-7deg);
    }

    .visor-to-diagonal-left {
        transform: translate3d(-0.22rem, 0, 0) rotate(-4deg);
    }

    .visor-to-right {
        transform: translate3d(0.45rem, 0, 0) rotate(7deg);
    }
`;