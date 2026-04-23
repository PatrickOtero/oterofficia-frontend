import { QuickMenuContainer } from "./RobotQuickMenu.style";
import type { RobotQuickMenuProps } from "./RobotQuickMenu.types";
import { RobotQuickMenuAction } from "./RobotQuickMenuAction";

export const RobotQuickMenu = ({ actions }: RobotQuickMenuProps) => (
    <QuickMenuContainer $actionCount={actions.length}>
        <div className="quick-menu-orbit" aria-hidden="true">
            <div className="quick-menu-core" />
        </div>

        {actions.map((action) => (
            <RobotQuickMenuAction action={action} key={action.id} />
        ))}
    </QuickMenuContainer>
);
