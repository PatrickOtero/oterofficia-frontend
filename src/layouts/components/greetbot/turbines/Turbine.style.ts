import styled from "styled-components";

export const TurbineContainer = styled.div`
    @keyframes thrusterPulse {
        0%,
        100% {
            opacity: 0.68;
            transform: translateY(0) scaleY(0.78);
        }

        50% {
            opacity: 1;
            transform: translateY(0.22rem) scaleY(1.14);
        }
    }

    @keyframes nozzleDrift {
        0%,
        100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(0.08rem);
        }
    }

    @keyframes thrusterGlow {
        0%,
        100% {
            opacity: 0.72;
            transform: scale(1);
        }

        50% {
            opacity: 1;
            transform: scale(1.12);
        }
    }

    .turbine-container-zindex {
        --thruster-delay: 0s;

        position: relative;
        width: 1.9rem;
        height: 5.2rem;
        overflow: visible;
    }

    .turbine-container-xindex {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        animation: nozzleDrift 1.8s ease-in-out infinite;
        animation-delay: var(--thruster-delay);
        overflow: visible;
    }

    .turbine-3d-container {
        position: absolute;
        top: 0;
        width: 1.28rem;
        height: 1rem;
        border-radius: 0.38rem 0.38rem 0.22rem 0.22rem;
        background: linear-gradient(180deg, #3b4759 0%, #171e29 100%);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -0.3rem 0.55rem rgba(0, 0, 0, 0.24),
            0 0 0.7rem rgba(214, 95, 255, 0.1);
    }

    .turbine-3d-container::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 0.86rem;
        width: 0.72rem;
        height: 0.2rem;
        transform: translateX(-50%);
        border-radius: 999px;
        background: rgba(255, 238, 255, 0.78);
        opacity: 0.62;
    }

    .turbine-shuttle {
        position: absolute;
        top: 0.72rem;
        width: 0.9rem;
        height: 4.25rem;
        border-radius: 0 0 999px 999px;
        background:
            linear-gradient(
                180deg,
                rgba(255, 248, 255, 0.98) 0%,
                rgba(245, 190, 255, 0.92) 22%,
                rgba(214, 95, 255, 0.88) 46%,
                rgba(214, 95, 255, 0.26) 76%,
                rgba(214, 95, 255, 0) 100%
            );
        box-shadow:
            0 0 1rem rgba(214, 95, 255, 0.28),
            0 0 1.8rem rgba(214, 95, 255, 0.18);
        transform-origin: top center;
        animation: thrusterPulse 1.55s ease-in-out infinite;
        animation-delay: var(--thruster-delay);
    }

    .turbine-shuttle::before {
        content: "";
        position: absolute;
        left: 50%;
        top: -0.08rem;
        width: 1.35rem;
        height: 1.35rem;
        transform: translateX(-50%);
        border-radius: 50%;
        background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(245, 190, 255, 0.84) 34%,
            rgba(214, 95, 255, 0.18) 66%,
            rgba(214, 95, 255, 0) 100%
        );
        animation: thrusterGlow 1.55s ease-in-out infinite;
        animation-delay: var(--thruster-delay);
        filter: blur(1px);
    }

    .turbine-shuttle::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0.25rem;
        width: 1.1rem;
        height: 2.2rem;
        transform: translateX(-50%);
        border-radius: 999px;
        background: radial-gradient(
            ellipse at center,
            rgba(214, 95, 255, 0.24) 0%,
            rgba(214, 95, 255, 0.08) 48%,
            rgba(214, 95, 255, 0) 100%
        );
        filter: blur(4px);
        opacity: 0.9;
    }
`;