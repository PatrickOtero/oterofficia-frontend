import type {
    NotificationFeed,
    NotificationItem,
} from "../../types/notification";

export type NotificationCenterModalProps = {
    feed: NotificationFeed;
    onClose: () => void;
    onItemClick: (item: NotificationItem) => void;
    onMarkAllAsRead: () => void;
};
