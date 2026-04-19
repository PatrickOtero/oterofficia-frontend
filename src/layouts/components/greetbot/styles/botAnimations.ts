import { css } from "styled-components";

export const botAnimationsCss = css`
    @keyframes greetBotFloating {
        0%,
        100% {
            transform: translate3d(0, 0, 0);
        }

        50% {
            transform: translate3d(0, calc(var(--bot-float-distance) * -1), 0);
        }
    }

    @keyframes eyePulse {
        0%,
        100% {
            opacity: 0.86;
            transform: translateY(-50%) scale(1);
        }

        50% {
            opacity: 1;
            transform: translateY(-50%) scale(1.08);
        }
    }

    @keyframes eyeEmittingHolo {
        0%,
        100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
        }

        50% {
            opacity: 0.82;
            transform: translateY(-50%) scale(1.14);
        }
    }
`;