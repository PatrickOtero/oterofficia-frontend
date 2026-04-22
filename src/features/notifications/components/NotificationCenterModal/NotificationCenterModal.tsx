import { X } from "phosphor-react";
import { createPortal } from "react-dom";
import { NotificationCenterPortalContainer } from "./NotificationCenterModal.style";
import type { NotificationCenterModalProps } from "./NotificationCenterModal.types";
import { getNotificationHeaderCopy } from "./NotificationCenterModal.utils";
import { NotificationCenterItem } from "./NotificationCenterItem";

export const NotificationCenterModal = ({
    feed,
    onClose,
    onItemClick,
    onMarkAllAsRead,
}: NotificationCenterModalProps) => {
    if (typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <NotificationCenterPortalContainer onClick={onClose}>
            <div
                className="notification-center-shell"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="notification-center-header">
                    <div className="notification-title-group">
                        <strong>Central de notificacoes</strong>
                        <span>{getNotificationHeaderCopy(feed.unreadCount)}</span>
                    </div>

                    <div className="notification-center-actions">
                        {feed.unreadCount > 0 ? (
                            <button
                                className="notification-mark-all"
                                onClick={onMarkAllAsRead}
                                type="button"
                            >
                                Marcar tudo como lido
                            </button>
                        ) : null}
                        <button
                            aria-label="Fechar notificacoes"
                            className="notification-close"
                            onClick={onClose}
                            type="button"
                        >
                            <X size={18} weight="bold" />
                        </button>
                    </div>
                </div>

                <div className="notification-center-list">
                    {feed.items.length ? (
                        feed.items.map((item) => (
                            <NotificationCenterItem
                                item={item}
                                key={item.id}
                                onClick={onItemClick}
                            />
                        ))
                    ) : (
                        <div className="notification-empty">
                            <strong>Sem sinais novos</strong>
                            <span>
                                Quando alguem interagir com o seu espaco, o sino holografico vai chamar voce aqui.
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </NotificationCenterPortalContainer>,
        document.body
    );
};
