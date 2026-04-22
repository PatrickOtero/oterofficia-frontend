import { RobotQuickMenuAction } from "./RobotQuickMenuAction";
import { QuickMenuContainer } from "./RobotQuickMenu.style";
import type { RobotQuickMenuProps } from "./RobotQuickMenu.types";
import { getRobotQuickMenuActions } from "./RobotQuickMenu.utils";

export const RobotQuickMenu = (props: RobotQuickMenuProps) => {
    const actions = getRobotQuickMenuActions(props);

    return (
        <QuickMenuContainer $actionCount={actions.length}>
            <div className="quick-menu-orbit" aria-hidden="true">
                <div className="quick-menu-core" />
            </div>

            {actions.map((action) => (
                <RobotQuickMenuAction action={action} key={action.id} />
            ))}
        </QuickMenuContainer>
    );
};
