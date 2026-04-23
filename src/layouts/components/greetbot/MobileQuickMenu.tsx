import { CaretLeft, CaretRight, GameController } from "phosphor-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { RobotQuickMenuAction, RobotQuickMenuLauncherMode } from "./RobotQuickMenu.types";
import { getQuickMenuBadgeLabel } from "./RobotQuickMenu.utils";
import { renderQuickMenuIcon } from "./quickMenuIcons";
import { MobileQuickMenuContainer } from "./MobileQuickMenu.style";

type MobileQuickMenuProps = {
    actions: RobotQuickMenuAction[];
    mode?: RobotQuickMenuLauncherMode;
};

export const MobileQuickMenu = ({ actions, mode = "default" }: MobileQuickMenuProps) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const isDirectAction = mode === "content" && actions.length === 1;
    const triggerLabel = isDirectAction
        ? "Conversar com o robo"
        : isOpen
          ? "Fechar robo"
          : "Comandos do robo";

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    if (!actions.length) {
        return null;
    }

    return (
        <MobileQuickMenuContainer $mode={mode}>
            {isOpen && !isDirectAction ? (
                <div className="mobile-quick-menu-panel">
                    {actions.map((action) => (
                        <div
                            className="mobile-quick-menu-item"
                            key={action.id}
                        >
                            <button
                                className="mobile-quick-menu-item-main"
                                onClick={() => {
                                    action.onClick();
                                    setIsOpen(false);
                                }}
                                type="button"
                            >
                                <span className="mobile-quick-menu-icon">{renderQuickMenuIcon(action)}</span>
                                <span className="mobile-quick-menu-copy">
                                    <span className="mobile-quick-menu-label">{action.label}</span>
                                    {action.caption ? (
                                        <span className="mobile-quick-menu-caption">{action.caption}</span>
                                    ) : null}
                                </span>
                            </button>
                            <span className="mobile-quick-menu-controls">
                                {action.unreadCount ? (
                                    <span className="mobile-quick-menu-badge">
                                        {getQuickMenuBadgeLabel(action.unreadCount)}
                                    </span>
                                ) : null}
                                {action.navigation ? (
                                    <>
                                        <button
                                            aria-label={action.navigation.previousAriaLabel}
                                            className="mobile-quick-menu-nav"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                action.navigation?.onPreviousClick();
                                            }}
                                            type="button"
                                        >
                                            <CaretLeft size={14} weight="bold" />
                                        </button>
                                        <button
                                            aria-label={action.navigation.nextAriaLabel}
                                            className="mobile-quick-menu-nav"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                action.navigation?.onNextClick();
                                            }}
                                            type="button"
                                        >
                                            <CaretRight size={14} weight="bold" />
                                        </button>
                                    </>
                                ) : null}
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}

            <button
                aria-expanded={isDirectAction ? undefined : isOpen}
                className="mobile-quick-menu-trigger"
                onClick={() => {
                    if (isDirectAction) {
                        actions[0]?.onClick();
                        return;
                    }

                    setIsOpen((currentState) => !currentState);
                }}
                type="button"
            >
                <GameController size={18} weight="bold" />
                {triggerLabel}
            </button>
        </MobileQuickMenuContainer>
    );
};
