import { ChartBar, RocketLaunch } from "phosphor-react";
import styled from "styled-components";
import { RobotNotificationBeacon } from "../../../features/notifications/components/RobotNotificationBeacon";

type SpaceTheme = "earth" | "mars";

type RobotQuickMenuProps = {
    isNotificationAlerting: boolean;
    isNotificationLoading?: boolean;
    nextTheme: SpaceTheme;
    onNotificationClick: () => void;
    onTravelClick: () => void;
    onUpdateClick: () => void;
    showNotification: boolean;
    showTravel: boolean;
    showUpdate: boolean;
    unreadCount: number;
};

const QuickMenuContainer = styled.div<{
    $nextTheme: SpaceTheme;
    $showNotification: boolean;
    $showTravel: boolean;
    $showUpdate: boolean;
}>`
    position: absolute;
    inset: 0;
    pointer-events: none;

    .quick-menu-hub {
        position: absolute;
        left: 50%;
        top: 0;
        width: 22rem;
        height: 10rem;
        transform: translateX(-50%);
    }

    .quick-menu-slot {
        position: absolute;
        top: 0;
        left: 50%;
        width: 9rem;
        height: 9rem;
        transition:
            transform 260ms cubic-bezier(0.16, 1, 0.22, 1),
            opacity 180ms ease;
    }

    .notification-slot {
        opacity: ${({ $showNotification }) => ($showNotification ? 1 : 0)};
        pointer-events: ${({ $showNotification }) => ($showNotification ? "auto" : "none")};
        transform: ${({ $showNotification, $showTravel, $showUpdate }) =>
            !$showNotification
                ? "translateX(-50%) scale(0.84)"
                : $showUpdate || $showTravel
                  ? "translateX(calc(-50% - 4.8rem)) scale(1)"
                  : "translateX(-50%) scale(1)"};
    }

    .update-slot {
        opacity: ${({ $showUpdate }) => ($showUpdate ? 1 : 0)};
        pointer-events: ${({ $showUpdate }) => ($showUpdate ? "auto" : "none")};
        transform: ${({ $showUpdate }) =>
            $showUpdate ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.84)"};
    }

    .travel-slot {
        opacity: ${({ $showTravel }) => ($showTravel ? 1 : 0)};
        pointer-events: ${({ $showTravel }) => ($showTravel ? "auto" : "none")};
        transform: ${({ $showNotification, $showTravel, $showUpdate }) =>
            !$showTravel
                ? "translateX(-50%) scale(0.84)"
                : $showUpdate || $showNotification
                  ? "translateX(calc(-50% + 4.8rem)) scale(1)"
                  : "translateX(-50%) scale(1)"};
    }

    .quick-menu-action {
        position: absolute;
        left: 50%;
        top: 7%;
        width: 9rem;
        height: 9rem;
        transform: translateX(-50%);
    }

    .quick-menu-beam {
        position: absolute;
        left: 50%;
        top: 4.7rem;
        width: 0.9rem;
        height: 3.8rem;
        transform: translateX(-50%);
        border-radius: 999px;
        opacity: 0.88;
    }

    .quick-menu-beam::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 100%;
        width: 2.6rem;
        height: 1rem;
        transform: translateX(-50%);
        border-radius: 50%;
        filter: blur(1px);
    }

    .quick-menu-button {
        position: absolute;
        left: 50%;
        top: 0;
        width: 4.8rem;
        height: 4.8rem;
        min-width: 0;
        padding: 0;
        transform: translateX(-50%);
        border-radius: 50%;
        cursor: pointer;
        pointer-events: auto;
        transition:
            transform 180ms ease,
            box-shadow 180ms ease;
    }

    .quick-menu-button:hover {
        transform: translateX(-50%) scale(1.05);
    }

    .quick-menu-button-core {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.7rem;
        height: 2.7rem;
        border-radius: 50%;
    }

    .update-beam {
        background: linear-gradient(
            180deg,
            rgba(183, 255, 237, 0.86) 0%,
            rgba(98, 241, 204, 0.54) 28%,
            rgba(48, 191, 167, 0.18) 72%,
            rgba(48, 191, 167, 0) 100%
        );
        box-shadow:
            0 0 0.8rem rgba(98, 241, 204, 0.24),
            0 0 1.6rem rgba(98, 241, 204, 0.14);
    }

    .update-beam::after {
        background: radial-gradient(circle, rgba(98, 241, 204, 0.28) 0%, rgba(98, 241, 204, 0) 72%);
    }

    .update-button {
        border: 1px solid rgba(122, 242, 214, 0.34);
        background:
            radial-gradient(circle at 30% 28%, rgba(219, 255, 245, 0.2), transparent 24%),
            radial-gradient(circle at 50% 50%, rgba(52, 188, 168, 0.24), rgba(5, 28, 29, 0.9) 72%);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.06),
            0 0 1.2rem rgba(98, 241, 204, 0.18),
            0 0 2rem rgba(47, 180, 159, 0.12);
        color: rgba(204, 255, 245, 0.96);
    }

    .update-button:hover {
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            0 0 1.6rem rgba(98, 241, 204, 0.24),
            0 0 2.4rem rgba(47, 180, 159, 0.16);
    }

    .update-button-core {
        background: radial-gradient(circle, rgba(195, 255, 240, 0.16) 0%, rgba(195, 255, 240, 0) 72%);
    }

    .travel-beam {
        background: ${({ $nextTheme }) =>
            $nextTheme === "mars"
                ? `linear-gradient(
                    180deg,
                    rgba(255, 228, 198, 0.86) 0%,
                    rgba(255, 164, 96, 0.54) 28%,
                    rgba(255, 118, 62, 0.18) 72%,
                    rgba(255, 118, 62, 0) 100%
                )`
                : `linear-gradient(
                    180deg,
                    rgba(176, 241, 255, 0.86) 0%,
                    rgba(118, 213, 255, 0.54) 28%,
                    rgba(88, 164, 255, 0.18) 72%,
                    rgba(88, 164, 255, 0) 100%
                )`};
        box-shadow: ${({ $nextTheme }) =>
            $nextTheme === "mars"
                ? "0 0 0.8rem rgba(255, 154, 88, 0.34), 0 0 1.6rem rgba(255, 118, 62, 0.18)"
                : "0 0 0.8rem rgba(108, 210, 255, 0.28), 0 0 1.6rem rgba(108, 210, 255, 0.16)"};
    }

    .travel-beam::after {
        background: ${({ $nextTheme }) =>
            $nextTheme === "mars"
                ? "radial-gradient(circle, rgba(255, 164, 96, 0.28) 0%, rgba(255, 164, 96, 0) 72%)"
                : "radial-gradient(circle, rgba(104, 200, 255, 0.28) 0%, rgba(104, 200, 255, 0) 72%)"};
    }

    .travel-button {
        border: ${({ $nextTheme }) =>
            $nextTheme === "mars"
                ? "1px solid rgba(255, 184, 132, 0.42)"
                : "1px solid rgba(124, 214, 255, 0.38)"};
        background: ${({ $nextTheme }) =>
            $nextTheme === "mars"
                ? `radial-gradient(circle at 30% 28%, rgba(255, 240, 224, 0.22), transparent 24%),
                   radial-gradient(circle at 50% 50%, rgba(255, 132, 72, 0.24), rgba(31, 15, 13, 0.88) 72%)`
                : `radial-gradient(circle at 30% 28%, rgba(214, 248, 255, 0.22), transparent 24%),
                   radial-gradient(circle at 50% 50%, rgba(72, 140, 255, 0.22), rgba(7, 20, 39, 0.88) 72%)`};
        box-shadow: ${({ $nextTheme }) =>
            $nextTheme === "mars"
                ? "inset 0 0 0 1px rgba(255, 255, 255, 0.06), 0 0 1.2rem rgba(255, 151, 87, 0.22), 0 0 2rem rgba(255, 106, 68, 0.14)"
                : "inset 0 0 0 1px rgba(255, 255, 255, 0.06), 0 0 1.2rem rgba(104, 202, 255, 0.18), 0 0 2rem rgba(82, 155, 255, 0.12)"};
        color: ${({ $nextTheme }) =>
            $nextTheme === "mars" ? "rgba(255, 228, 204, 0.96)" : "rgba(188, 241, 255, 0.96)"};
    }

    .travel-button:hover {
        box-shadow: ${({ $nextTheme }) =>
            $nextTheme === "mars"
                ? "inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 1.6rem rgba(255, 151, 87, 0.28), 0 0 2.4rem rgba(255, 106, 68, 0.16)"
                : "inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 1.6rem rgba(104, 202, 255, 0.24), 0 0 2.4rem rgba(82, 155, 255, 0.16)"};
    }

    .travel-button-core {
        background: ${({ $nextTheme }) =>
            $nextTheme === "mars"
                ? "radial-gradient(circle, rgba(255, 218, 188, 0.18) 0%, rgba(255, 218, 188, 0) 72%)"
                : "radial-gradient(circle, rgba(184, 244, 255, 0.18) 0%, rgba(184, 244, 255, 0) 72%)"};
    }

    @media (max-width: 900px) {
        .quick-menu-hub {
            width: 16rem;
            height: 8rem;
        }

        .quick-menu-slot {
            width: 7rem;
            height: 7rem;
        }

        .notification-slot {
            transform: ${({ $showNotification, $showTravel, $showUpdate }) =>
                !$showNotification
                    ? "translateX(-50%) scale(0.84)"
                    : $showUpdate || $showTravel
                      ? "translateX(calc(-50% - 3.4rem)) scale(1)"
                      : "translateX(-50%) scale(1)"};
        }

        .travel-slot {
            transform: ${({ $showNotification, $showTravel, $showUpdate }) =>
                !$showTravel
                    ? "translateX(-50%) scale(0.84)"
                    : $showUpdate || $showNotification
                      ? "translateX(calc(-50% + 3.4rem)) scale(1)"
                      : "translateX(-50%) scale(1)"};
        }

        .quick-menu-action {
            width: 7rem;
            height: 7rem;
        }

        .quick-menu-beam {
            top: 4rem;
            height: 2.8rem;
        }

        .quick-menu-button {
            width: 4.2rem;
            height: 4.2rem;
        }
    }
`;

export const RobotQuickMenu = ({
    isNotificationAlerting,
    isNotificationLoading = false,
    nextTheme,
    onNotificationClick,
    onTravelClick,
    onUpdateClick,
    showNotification,
    showTravel,
    showUpdate,
    unreadCount,
}: RobotQuickMenuProps) => (
    <QuickMenuContainer
        $nextTheme={nextTheme}
        $showNotification={showNotification}
        $showTravel={showTravel}
        $showUpdate={showUpdate}
    >
        <div className="quick-menu-hub">
            <div
                className="quick-menu-slot notification-slot"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <RobotNotificationBeacon
                    alerting={isNotificationAlerting}
                    isLoading={isNotificationLoading}
                    onClick={onNotificationClick}
                    unreadCount={unreadCount}
                />
            </div>

            <div
                className="quick-menu-slot update-slot"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <div className="quick-menu-action">
                    <span className="quick-menu-beam update-beam" />
                    <button
                        aria-label="Me atualize"
                        className="quick-menu-button update-button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onUpdateClick();
                        }}
                        title="Me atualize"
                        type="button"
                    >
                        <span className="quick-menu-button-core update-button-core">
                            <ChartBar size={24} weight="fill" />
                        </span>
                    </button>
                </div>
            </div>

            <div
                className="quick-menu-slot travel-slot"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <div className="quick-menu-action">
                    <span className="quick-menu-beam travel-beam" />
                    <button
                        aria-label={nextTheme === "mars" ? "Viajar para Marte" : "Voltar para Terra"}
                        className="quick-menu-button travel-button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onTravelClick();
                        }}
                        title={nextTheme === "mars" ? "Viajar para Marte" : "Voltar para Terra"}
                        type="button"
                    >
                        <span className="quick-menu-button-core travel-button-core">
                            <RocketLaunch size={24} weight="fill" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </QuickMenuContainer>
);
