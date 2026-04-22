import styled from "styled-components";

type RobotSpeechBubbleProps = {
  detail?: string;
  message: string;
  title?: string;
};

const RobotSpeechBubbleContainer = styled.div`
    @keyframes robotSpeechBubbleIn {
        from {
            opacity: 0;
            transform: translate3d(-50%, 0.9rem, 0);
        }

        to {
            opacity: 1;
            transform: translate3d(-50%, 0, 0);
        }
    }

    position: absolute;
    top: -10.2rem;
    left: 50%;
    width: min(28rem, calc(100vw - 3.2rem));
    transform: translateX(-50%);
    animation: robotSpeechBubbleIn 240ms ease;
    pointer-events: none;

    .robot-speech-shell {
        position: relative;
        padding: 1.25rem 1.5rem;
        border-radius: 1.8rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.2);
        background:
            linear-gradient(180deg, rgba(var(--scene-panel-rgb), 0.94) 0%, rgba(var(--scene-panel-rgb), 0.84) 100%);
        box-shadow:
            0 1rem 2.4rem rgba(0, 0, 0, 0.24),
            inset 0 0 0 1px rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(10px);
    }

    .robot-speech-shell::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -0.7rem;
        width: 1.25rem;
        height: 1.25rem;
        transform: translateX(-50%) rotate(45deg);
        border-right: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        border-bottom: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background: rgba(var(--scene-panel-rgb), 0.88);
    }

    strong,
    p,
    span {
        margin: 0;
        font-family: "IBM Plex Mono", monospace;
    }

    strong {
        display: block;
        color: rgba(var(--scene-accent-soft-rgb), 0.96);
        font-size: 1rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    p {
        margin-top: 0.55rem;
        color: rgba(233, 246, 255, 0.94);
        font-size: 1.1rem;
        line-height: 1.65;
        white-space: pre-wrap;
    }

    span {
        display: block;
        margin-top: 0.65rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 0.88rem;
        line-height: 1.5;
    }

    @media (max-width: 640px) {
        top: -9.2rem;
        width: min(24rem, calc(100vw - 2rem));

        .robot-speech-shell {
            padding: 1rem 1.2rem;
        }

        p {
            font-size: 0.98rem;
        }
    }
`;

export const RobotSpeechBubble = ({ detail, message, title }: RobotSpeechBubbleProps) => (
  <RobotSpeechBubbleContainer>
    <div className="robot-speech-shell">
      {title ? <strong>{title}</strong> : null}
      <p>{message}</p>
      {detail ? <span>{detail}</span> : null}
    </div>
  </RobotSpeechBubbleContainer>
);
