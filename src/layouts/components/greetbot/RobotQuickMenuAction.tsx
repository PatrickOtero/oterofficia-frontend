import { BellSimpleRinging, ChatsCircle, RocketLaunch } from "phosphor-react";
import type { RobotQuickMenuAction as RobotQuickMenuActionType } from "./RobotQuickMenu.types";
import { getQuickMenuBadgeLabel } from "./RobotQuickMenu.utils";

type RobotQuickMenuActionProps = {
    action: RobotQuickMenuActionType;
};

const iconSize = 24;

const renderActionIcon = (action: RobotQuickMenuActionType) => {
    if (action.id === "notification") {
        return <BellSimpleRinging size={iconSize} weight={action.iconWeight || "regular"} />;
    }

    if (action.id === "travel") {
        return <RocketLaunch size={iconSize} weight={action.iconWeight || "fill"} />;
    }

    return <ChatsCircle size={iconSize} weight={action.iconWeight || "fill"} />;
};

export const RobotQuickMenuAction = ({ action }: RobotQuickMenuActionProps) => (
    <div
        className={`quick-menu-action position-${action.position} tone-${action.tone}`}
        data-alerting={action.alerting ? "true" : "false"}
        onClick={(event) => {
            event.stopPropagation();
        }}
    >
        <span className="quick-menu-action-beam" aria-hidden="true" />
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
            <span className="quick-menu-button-core">{renderActionIcon(action)}</span>
            {action.unreadCount ? <span className="quick-menu-badge">{getQuickMenuBadgeLabel(action.unreadCount)}</span> : null}
        </button>
        <span className="quick-menu-label">{action.label}</span>
    </div>
);
