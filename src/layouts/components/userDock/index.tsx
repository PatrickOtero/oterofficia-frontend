import { useEffect, useRef } from "react";
import { List, UserCircle } from "phosphor-react";
import { UserDockContainer } from "./userDock.style";
import { useUserDockController } from "./useUserDockController";

export const UserDock = () => {
    const {
        actions,
        caption,
        closePanel,
        isAuthenticated,
        isPanelOpen,
        roleLabel,
        shortcutAction,
        status,
        togglePanel,
        triggerLabel,
    } = useUserDockController();
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isPanelOpen) {
            return;
        }

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const target = event.target;

            if (!(target instanceof Node) || rootRef.current?.contains(target)) {
                return;
            }

            closePanel();
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closePanel();
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("touchstart", handlePointerDown);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("touchstart", handlePointerDown);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closePanel, isPanelOpen]);

    return (
        <UserDockContainer ref={rootRef}>
            <div className="user-dock-access-row">
                {shortcutAction ? (
                    <button
                        className={`user-dock-shortcut${shortcutAction.className ? ` ${shortcutAction.className}` : ""}${shortcutAction.active ? " active" : ""}`}
                        onClick={() => {
                            shortcutAction.onClick();
                        }}
                        type="button"
                    >
                        {shortcutAction.label}
                    </button>
                ) : null}

                <button
                    aria-expanded={isPanelOpen}
                    className="user-dock-trigger"
                    onClick={togglePanel}
                    type="button"
                >
                    <UserCircle size={18} weight={isAuthenticated ? "fill" : "regular"} />
                    <span className="user-dock-trigger-copy">
                        <span className="user-dock-trigger-caption">{caption}</span>
                        <strong className="user-dock-trigger-label">{triggerLabel}</strong>
                    </span>
                    <List size={16} weight="bold" />
                </button>
            </div>

            <div
                className={`user-dock-panel${isPanelOpen ? " open" : ""}`}
            >
                <div className="user-dock-header">
                    <div className="user-dock-copy">
                        <span className="user-dock-caption">{caption}</span>
                        <strong className="user-dock-status">{status}</strong>
                    </div>
                    {roleLabel ? <span className="user-dock-role">{roleLabel}</span> : null}
                </div>

                <div className="user-dock-actions">
                    {actions.map((action) => (
                        <button
                            className={`user-dock-action${action.className ? ` ${action.className}` : ""}${action.active ? " active" : ""}`}
                            key={action.id}
                            onClick={() => {
                                action.onClick();
                            }}
                            type="button"
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </UserDockContainer>
    );
};
