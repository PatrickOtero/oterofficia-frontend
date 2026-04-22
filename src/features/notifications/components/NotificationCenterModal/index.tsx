import { X } from "phosphor-react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { NotificationFeed, NotificationItem, NotificationKind } from "../../types/notification";

type NotificationCenterModalProps = {
  feed: NotificationFeed;
  onClose: () => void;
  onItemClick: (item: NotificationItem) => void;
  onMarkAllAsRead: () => void;
};

const NotificationCenterPortalContainer = styled.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.4rem;
    background: rgba(3, 10, 16, 0.74);
    backdrop-filter: blur(10px);

    .notification-center-shell {
        width: min(68rem, 100%);
        max-height: calc(100vh - 4.8rem);
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        padding: 1.6rem;
        border: 1px solid rgba(112, 204, 255, 0.18);
        border-radius: 2.4rem;
        background:
            linear-gradient(180deg, rgba(8, 21, 34, 0.96) 0%, rgba(6, 15, 25, 0.94) 100%);
        box-shadow:
            0 1.6rem 3.8rem rgba(0, 0, 0, 0.34),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
        overflow: hidden;
    }

    .notification-center-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.2rem;
    }

    .notification-title-group {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
    }

    .notification-title-group strong {
        color: rgba(236, 248, 255, 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.5rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .notification-title-group span {
        color: rgba(171, 220, 242, 0.74);
        font-size: 1.18rem;
    }

    .notification-center-actions {
        display: inline-flex;
        align-items: center;
        gap: 0.8rem;
    }

    .notification-mark-all,
    .notification-close {
        min-width: 0;
        height: 4rem;
        padding: 0 1.4rem;
        border-radius: 1.2rem;
        border: 1px solid rgba(115, 206, 255, 0.16);
        background: rgba(10, 28, 42, 0.8);
        color: rgba(222, 245, 255, 0.92);
    }

    .notification-close {
        width: 4rem;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .notification-center-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        padding-right: 0.4rem;
    }

    .notification-center-list::-webkit-scrollbar {
        width: 0.7rem;
    }

    .notification-center-list::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background: rgba(103, 194, 255, 0.28);
    }

    .notification-item {
        display: flex;
        gap: 1.1rem;
        align-items: flex-start;
        width: 100%;
        padding: 1.3rem 1.4rem;
        border-radius: 1.8rem;
        border: 1px solid rgba(110, 198, 255, 0.12);
        background:
            linear-gradient(180deg, rgba(14, 31, 46, 0.82) 0%, rgba(10, 18, 28, 0.86) 100%);
        text-align: left;
        transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
    }

    .notification-item[data-unread="true"] {
        border-color: rgba(116, 214, 255, 0.28);
        box-shadow: inset 0 0 0 1px rgba(116, 214, 255, 0.06);
    }

    .notification-item:hover {
        transform: translateY(-0.12rem);
        border-color: rgba(116, 214, 255, 0.24);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.16);
    }

    .notification-avatar {
        width: 4.2rem;
        height: 4.2rem;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid rgba(116, 212, 255, 0.22);
        background:
            radial-gradient(circle at 30% 28%, rgba(219, 246, 255, 0.22), transparent 28%),
            linear-gradient(180deg, rgba(41, 84, 130, 0.8) 0%, rgba(10, 25, 40, 0.92) 100%);
        color: rgba(231, 248, 255, 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.2rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        overflow: hidden;
    }

    .notification-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .notification-copy {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
        min-width: 0;
        flex: 1;
    }

    .notification-copy-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.7rem;
    }

    .notification-copy-header strong {
        color: rgba(236, 248, 255, 0.96);
        font-size: 1.2rem;
        line-height: 1.4;
    }

    .notification-chip,
    .notification-time {
        display: inline-flex;
        align-items: center;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.9rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .notification-chip {
        border: 1px solid rgba(111, 205, 255, 0.14);
        background: rgba(111, 205, 255, 0.08);
        color: rgba(186, 231, 255, 0.88);
    }

    .notification-time {
        color: rgba(170, 220, 242, 0.58);
        background: rgba(255, 255, 255, 0.02);
    }

    .notification-copy p {
        color: rgba(188, 225, 242, 0.8);
        font-size: 1.12rem;
        line-height: 1.7;
        word-break: break-word;
    }

    .notification-empty {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        align-items: center;
        justify-content: center;
        min-height: 20rem;
        padding: 2rem;
        border-radius: 2rem;
        border: 1px dashed rgba(110, 198, 255, 0.18);
        color: rgba(188, 225, 242, 0.72);
        text-align: center;
    }

    @media (max-width: 900px) {
        padding: 1.4rem;

        .notification-center-shell {
            max-height: calc(100vh - 2.8rem);
            padding: 1.2rem;
        }

        .notification-center-header {
            flex-direction: column;
            align-items: stretch;
        }

        .notification-center-actions {
            justify-content: space-between;
        }
    }
`;

const kindLabelMap: Record<NotificationKind, string> = {
  "admin-comment": "Comentario",
  "admin-comment-like": "Curtida",
  "admin-reply": "Resposta",
  "admin-study-like": "Publicacao",
  "comment-like": "Curtiram voce",
  "comment-reply": "Resposta",
  "thread-comment": "Conversa",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  }).format(new Date(value));

const getActorInitials = (item: NotificationItem) => {
  const name = item.actor?.name || "Site";
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};

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
      <div className="notification-center-shell" onClick={(event) => event.stopPropagation()}>
        <div className="notification-center-header">
          <div className="notification-title-group">
            <strong>Central de notificacoes</strong>
            <span>
              {feed.unreadCount > 0
                ? `${feed.unreadCount} alerta${feed.unreadCount === 1 ? "" : "s"} aguardando leitura`
                : "Tudo em dia por aqui"}
            </span>
          </div>

          <div className="notification-center-actions">
            {feed.unreadCount > 0 ? (
              <button className="notification-mark-all" onClick={onMarkAllAsRead} type="button">
                Marcar tudo como lido
              </button>
            ) : null}
            <button aria-label="Fechar notificacoes" className="notification-close" onClick={onClose} type="button">
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>

        <div className="notification-center-list">
          {feed.items.length ? (
            feed.items.map((item) => (
              <button
                className="notification-item"
                data-unread={!item.readAt}
                key={item.id}
                onClick={() => onItemClick(item)}
                type="button"
              >
                <span className="notification-avatar">
                  {item.actor?.avatarUrl ? (
                    <img alt={item.actor.name} loading="lazy" src={item.actor.avatarUrl} />
                  ) : (
                    getActorInitials(item)
                  )}
                </span>

                <span className="notification-copy">
                  <span className="notification-copy-header">
                    <strong>{item.title}</strong>
                    <span className="notification-chip">{kindLabelMap[item.kind]}</span>
                    <span className="notification-time">{formatDate(item.createdAt)}</span>
                  </span>
                  <p>{item.body}</p>
                </span>
              </button>
            ))
          ) : (
            <div className="notification-empty">
              <strong>Sem sinais novos</strong>
              <span>Quando alguem interagir com o seu espaco, o sino holografico vai chamar voce aqui.</span>
            </div>
          )}
        </div>
      </div>
    </NotificationCenterPortalContainer>,
    document.body
  );
};
