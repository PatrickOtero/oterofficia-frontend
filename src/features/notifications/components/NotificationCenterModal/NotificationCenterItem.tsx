import type { NotificationItem } from "../../types/notification";
import {
    formatNotificationDate,
    getNotificationActorInitials,
    getNotificationKindLabel,
} from "./NotificationCenterModal.utils";

type NotificationCenterItemProps = {
    item: NotificationItem;
    onClick: (item: NotificationItem) => void;
};

export const NotificationCenterItem = ({
    item,
    onClick,
}: NotificationCenterItemProps) => (
    <button
        className="notification-item"
        data-unread={!item.readAt}
        onClick={() => onClick(item)}
        type="button"
    >
        <span className="notification-avatar">
            {item.actor?.avatarUrl ? (
                <img alt={item.actor.name} loading="lazy" src={item.actor.avatarUrl} />
            ) : (
                getNotificationActorInitials(item)
            )}
        </span>

        <span className="notification-copy">
            <span className="notification-copy-header">
                <strong className="notification-copy-title">{item.title}</strong>
                <span className="notification-copy-meta">
                    <span className="notification-chip">{getNotificationKindLabel(item.kind)}</span>
                    <span className="notification-time">{formatNotificationDate(item.createdAt)}</span>
                </span>
            </span>

            <span className="notification-copy-body">{item.body}</span>
        </span>
    </button>
);
