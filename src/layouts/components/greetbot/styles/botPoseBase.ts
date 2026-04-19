import { css } from "styled-components";

export const botPoseBaseCss = css`
    .bot-pose {
        position: absolute;
        inset: 0;
        overflow: visible;
    }

    .bot-neck {
        position: absolute;
        width: 1.15rem;
        height: 0.92rem;
        border-radius: 0.4rem;
        background: linear-gradient(180deg, #323c4b 0%, #141b26 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        z-index: 3;
    }

    .bot-torso {
        position: absolute;
        width: 7.3rem;
        height: 8.2rem;
        border-radius: 1.5rem 1.5rem 1.1rem 1.1rem;
        background:
            linear-gradient(180deg, rgba(62, 76, 94, 0.98) 0%, rgba(26, 35, 48, 0.98) 58%, rgba(10, 14, 20, 1) 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.07),
            inset 0 -1.35rem 2rem rgba(0, 0, 0, 0.3),
            0 0.9rem 1.8rem rgba(0, 0, 0, 0.12);
        clip-path: polygon(
            18% 0%,
            82% 0%,
            100% 18%,
            94% 82%,
            78% 100%,
            22% 100%,
            6% 82%,
            0% 18%
        );
        overflow: hidden;
        z-index: 2;
    }

    .bot-torso::before {
        content: "";
        position: absolute;
        inset: 0.55rem 0.68rem 1.4rem;
        border-radius: 1.05rem;
        background:
            radial-gradient(circle at 34% 20%, rgba(255, 255, 255, 0.06), transparent 20%),
            linear-gradient(180deg, rgba(18, 25, 36, 0.74), rgba(7, 11, 17, 0.42));
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.025);
    }

    .bot-core {
        position: absolute;
        left: 50%;
        top: 1.7rem;
        width: 1.3rem;
        height: 3rem;
        transform: translateX(-50%);
        border-radius: 999px;
        background: linear-gradient(
            180deg,
            rgba(var(--bot-accent-rgb), 0.16) 0%,
            rgba(var(--bot-accent-rgb), 0.92) 50%,
            rgba(var(--bot-accent-rgb), 0.14) 100%
        );
        box-shadow:
            0 0 1rem rgba(var(--bot-accent-rgb), 0.2),
            inset 0 0 0.35rem rgba(255, 255, 255, 0.08);
        opacity: 0.97;
        z-index: 2;
    }

    .bot-pelvis {
        position: absolute;
        width: 4.65rem;
        height: 2rem;
        border-radius: 0.95rem;
        background: linear-gradient(180deg, #324050 0%, #141b27 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        z-index: 2;
    }

    .segment {
        position: absolute;
        border-radius: 999px;
        background: linear-gradient(180deg, #394658 0%, #151c27 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .small-segment {
        position: absolute;
        border-radius: 999px;
        background: linear-gradient(180deg, #334052 0%, #131a25 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .hand {
        position: absolute;
        border-radius: 0.4rem;
        background: linear-gradient(180deg, #2f3948 0%, #111722 100%);
        z-index: 2;
    }

    .foot {
        position: absolute;
        width: 2.6rem;
        height: 4.9rem;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        overflow: visible;
        z-index: 1;
    }

    .foot::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: 2rem;
        height: 0.72rem;
        transform: translateX(-50%);
        border-radius: 0.5rem 0.5rem 0.22rem 0.22rem;
        background: linear-gradient(180deg, #334052 0%, #131a25 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 0.18rem 0.5rem rgba(0, 0, 0, 0.14);
    }
`;