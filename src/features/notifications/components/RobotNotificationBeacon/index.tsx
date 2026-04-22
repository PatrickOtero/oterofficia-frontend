import { BellSimpleRinging } from "phosphor-react";
import styled, { css, keyframes } from "styled-components";

type RobotNotificationBeaconProps = {
  alerting: boolean;
  isLoading?: boolean;
  unreadCount: number;
  onClick: () => void;
};

const bellPulse = keyframes`
    0%, 100% {
        transform: translateX(-50%) scale(0.96);
    }

    45% {
        transform: translateX(-50%) scale(1.08);
    }

    60% {
        transform: translateX(-50%) scale(1.02);
    }
`;

const beamBleep = keyframes`
    0%, 100% {
        opacity: 0.48;
        filter: blur(0.4px);
    }

    50% {
        opacity: 0.94;
        filter: blur(0.8px);
    }
`;

const waveExpand = keyframes`
    0% {
        opacity: 0.72;
        transform: translate(-50%, -50%) scale(0.44);
    }

    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.7);
    }
`;

const hologramBlink = keyframes`
    0%, 100% {
        opacity: 0.78;
    }

    18% {
        opacity: 1;
    }

    26% {
        opacity: 0.7;
    }

    36% {
        opacity: 1;
    }
`;

const BeaconContainer = styled.div<{ $alerting: boolean }>`
    position: absolute;
    inset: 0;
    pointer-events: none;

    .notification-projector {
        position: absolute;
        left: 50%;
        top: 7%;
        width: 9rem;
        height: 9rem;
        transform: translateX(-50%);
    }

    .notification-projector-beam {
        position: absolute;
        left: 50%;
        top: 4.7rem;
        width: 0.9rem;
        height: 3.8rem;
        transform: translateX(-50%);
        border-radius: 999px;
        background:
            linear-gradient(
                180deg,
                rgba(176, 241, 255, 0.88) 0%,
                rgba(118, 213, 255, 0.54) 28%,
                rgba(88, 164, 255, 0.18) 72%,
                rgba(88, 164, 255, 0) 100%
            );
        box-shadow:
            0 0 0.8rem rgba(108, 210, 255, 0.42),
            0 0 1.6rem rgba(108, 210, 255, 0.2);
        opacity: ${({ $alerting }) => ($alerting ? 1 : 0.5)};
        animation: ${({ $alerting }) =>
            $alerting
                ? css`
                      ${beamBleep} 1.1s ease-in-out infinite
                  `
                : "none"};
    }

    .notification-projector-beam::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 100%;
        width: 2.6rem;
        height: 1rem;
        transform: translateX(-50%);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(104, 200, 255, 0.34) 0%, rgba(104, 200, 255, 0) 72%);
        filter: blur(1px);
    }

    .notification-bell-button {
        position: absolute;
        left: 50%;
        top: 0;
        width: 4.8rem;
        height: 4.8rem;
        min-width: 0;
        padding: 0;
        transform: translateX(-50%);
        border: 1px solid rgba(124, 214, 255, 0.38);
        border-radius: 50%;
        background:
            radial-gradient(circle at 30% 28%, rgba(214, 248, 255, 0.28), transparent 24%),
            radial-gradient(circle at 50% 50%, rgba(72, 140, 255, 0.24), rgba(7, 20, 39, 0.84) 72%);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.06),
            0 0 1.3rem rgba(104, 202, 255, 0.24),
            0 0 2.2rem rgba(82, 155, 255, 0.16);
        color: rgba(188, 241, 255, 0.96);
        pointer-events: auto;
        cursor: pointer;
        animation: ${({ $alerting }) =>
            $alerting
                ? css`
                      ${bellPulse} 1s ease-in-out infinite,
                      ${hologramBlink} 1.25s ease-in-out infinite
                  `
                : "none"};
        transition:
            transform 180ms ease,
            box-shadow 180ms ease,
            opacity 180ms ease;
        opacity: ${({ $alerting }) => ($alerting ? 1 : 0.92)};
    }

    .notification-bell-button:hover {
        transform: translateX(-50%) scale(1.05);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            0 0 1.8rem rgba(104, 202, 255, 0.32),
            0 0 2.8rem rgba(82, 155, 255, 0.18);
    }

    .notification-bell-core {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(184, 244, 255, 0.22) 0%, rgba(184, 244, 255, 0) 72%);
    }

    .notification-wave {
        position: absolute;
        left: 50%;
        top: 2.4rem;
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 50%;
        border: 1px solid rgba(122, 215, 255, 0.42);
        box-shadow: 0 0 1rem rgba(104, 200, 255, 0.18);
        pointer-events: none;
        opacity: ${({ $alerting }) => ($alerting ? 1 : 0)};
        animation: ${({ $alerting }) =>
            $alerting
                ? css`
                      ${waveExpand} 1s ease-out infinite
                  `
                : "none"};
    }

    .notification-wave.wave-two {
        animation-delay: 0.24s;
    }

    .notification-wave.wave-three {
        animation-delay: 0.48s;
    }

    .notification-count {
        position: absolute;
        right: -0.4rem;
        top: -0.2rem;
        min-width: 2rem;
        height: 2rem;
        padding: 0 0.45rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid rgba(212, 248, 255, 0.4);
        background: linear-gradient(180deg, rgba(86, 182, 255, 0.92) 0%, rgba(48, 125, 255, 0.88) 100%);
        color: rgba(241, 251, 255, 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.95rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        box-shadow: 0 0 1rem rgba(88, 168, 255, 0.32);
    }

    @media (max-width: 900px) {
        .notification-projector {
            width: 7rem;
            height: 7rem;
        }

        .notification-projector-beam {
            top: 4rem;
            height: 2.8rem;
        }

        .notification-bell-button {
            width: 4.2rem;
            height: 4.2rem;
        }

        .notification-wave {
            top: 2.1rem;
            width: 4.2rem;
            height: 4.2rem;
        }
    }
`;

export const RobotNotificationBeacon = ({
  alerting,
  isLoading = false,
  onClick,
  unreadCount,
}: RobotNotificationBeaconProps) => (
  <BeaconContainer $alerting={alerting}>
    <div className="notification-projector">
      <span className="notification-projector-beam" />
      <span className="notification-wave wave-one" />
      <span className="notification-wave wave-two" />
      <span className="notification-wave wave-three" />
      <button
        aria-label={alerting ? "Abrir notificacoes nao lidas" : "Abrir central de notificacoes"}
        className="notification-bell-button"
        onClick={onClick}
        title={alerting ? "Notificacoes ativas" : "Central de notificacoes"}
        type="button"
      >
        <span className="notification-bell-core">
          <BellSimpleRinging size={24} weight={isLoading || alerting ? "fill" : "regular"} />
        </span>
        {unreadCount > 0 ? (
          <span className="notification-count">{unreadCount > 9 ? "9+" : unreadCount}</span>
        ) : null}
      </button>
    </div>
  </BeaconContainer>
);
