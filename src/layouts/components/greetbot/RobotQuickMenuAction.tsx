import { CaretLeft, CaretRight } from "phosphor-react";
import type { RobotQuickMenuAction as RobotQuickMenuActionType } from "./RobotQuickMenu.types";
import { getQuickMenuBadgeLabel } from "./RobotQuickMenu.utils";
import { renderQuickMenuIcon } from "./quickMenuIcons";

type RobotQuickMenuActionProps = {
    action: RobotQuickMenuActionType;
};

const renderActionNavigation = (action: RobotQuickMenuActionType) => {
    if (!action.navigation) {
        return null;
    }

    return (
        <>
            <span aria-hidden="true" className="quick-menu-nav-orbit" />
            <button
                aria-label={action.navigation.previousAriaLabel}
                className="quick-menu-nav-button previous"
                onClick={(event) => {
                    event.stopPropagation();
                    action.navigation?.onPreviousClick();
                }}
                title={action.navigation.previousAriaLabel}
                type="button"
            >
                <CaretLeft size={16} weight="bold" />
            </button>
            <button
                aria-label={action.navigation.nextAriaLabel}
                className="quick-menu-nav-button next"
                onClick={(event) => {
                    event.stopPropagation();
                    action.navigation?.onNextClick();
                }}
                title={action.navigation.nextAriaLabel}
                type="button"
            >
                <CaretRight size={16} weight="bold" />
            </button>
        </>
    );
};

export const RobotQuickMenuAction = ({ action }: RobotQuickMenuActionProps) => (
    <div
        className={`quick-menu-action position-${action.position} tone-${action.tone}${action.navigation ? " has-navigation" : ""}`}
        data-alerting={action.alerting ? "true" : "false"}
        onClick={(event) => {
            event.stopPropagation();
        }}
    >
        <span className="quick-menu-action-beam" aria-hidden="true" />
        <div className={`quick-menu-button-stack${action.navigation ? " has-navigation" : ""}`}>
            {renderActionNavigation(action)}
            <button
                aria-label={action.ariaLabel || action.label}
                className="quick-menu-button"
                onClick={(event) => {
                    event.stopPropagation();
                    action.onClick();
                }}
                title={action.ariaLabel || action.label}
                type="button"
            >
                <span className="quick-menu-button-core">{renderQuickMenuIcon(action)}</span>
                {action.unreadCount ? (
                    <span className="quick-menu-badge">{getQuickMenuBadgeLabel(action.unreadCount)}</span>
                ) : null}
            </button>
        </div>
        <span className="quick-menu-label">
            <span className="quick-menu-label-title">{action.label}</span>
            {action.caption ? <span className="quick-menu-label-caption">{action.caption}</span> : null}
        </span>
    </div>
);
