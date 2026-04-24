import type {
    NotificationItem,
    NotificationKind,
} from "../../types/notification";

const kindLabelMap: Record<NotificationKind, string> = {
    "admin-comment": "Comentário",
    "admin-comment-like": "Curtida",
    "admin-reply": "Resposta",
    "admin-study-like": "Publicação",
    "comment-like": "Curtiram você",
    "comment-reply": "Resposta",
    "thread-comment": "Conversa",
};

export const getNotificationKindLabel = (kind: NotificationKind) => kindLabelMap[kind];

export const formatNotificationDate = (value: string) =>
    new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
    }).format(new Date(value));

export const getNotificationActorInitials = (item: NotificationItem) => {
    const name = item.actor?.name || "Site";

    return name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join("");
};

export const getNotificationHeaderCopy = (unreadCount: number) =>
    unreadCount > 0
        ? `${unreadCount} alerta${unreadCount === 1 ? "" : "s"} aguardando leitura`
        : "Tudo em dia por aqui";
