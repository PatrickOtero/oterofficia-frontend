export type NotificationKind =
  | "thread-comment"
  | "comment-reply"
  | "comment-like"
  | "admin-comment"
  | "admin-reply"
  | "admin-comment-like"
  | "admin-study-like";

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  targetPath: string | null;
  metadata: Record<string, unknown> | null;
  readAt: string | null;
  createdAt: string;
  actor: {
    id: string;
    name: string;
    role: "admin" | "user";
    avatarUrl: string | null;
  } | null;
}

export interface NotificationFeed {
  items: NotificationItem[];
  unreadCount: number;
}

export interface NotificationContextValue {
  feed: NotificationFeed;
  isLoading: boolean;
  markAllAsRead: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
}
