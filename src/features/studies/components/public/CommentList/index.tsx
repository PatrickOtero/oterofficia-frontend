import { memo } from "react";
import { ChatCircleDots, HeartStraight, Trash } from "phosphor-react";
import styled from "styled-components";
import { StudyComment } from "../../../types/study";
import { EmptyState } from "../../shared/EmptyState";
import { surfaceCardCss } from "../../../utils/styleMixins";

type CommentListProps = {
  comments: StudyComment[];
  onDelete?: (commentId: string) => void;
  onReply?: (comment: StudyComment) => void;
  onToggleLike?: (comment: StudyComment) => void;
  isDeleting?: string | null;
  likePendingId?: string | null;
};

type CommentNodeProps = {
  comment: StudyComment;
  depth?: number;
  isDeleting?: string | null;
  likePendingId?: string | null;
  onDelete?: (commentId: string) => void;
  onReply?: (comment: StudyComment) => void;
  onToggleLike?: (comment: StudyComment) => void;
};

const CommentListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    .comment-card {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        padding: 1.8rem 2rem;
    }

    .comment-main {
        display: flex;
        gap: 1.4rem;
        align-items: flex-start;
    }

    .comment-avatar,
    .comment-avatar img {
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .comment-avatar {
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        background: rgba(var(--scene-accent-rgb), 0.1);
        color: rgba(var(--scene-title-rgb), 0.94);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.4rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .comment-avatar img {
        object-fit: cover;
    }

    .comment-body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
        min-width: 0;
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        gap: 1.2rem;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .comment-author {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.12rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .comment-date {
        color: rgba(var(--scene-accent-soft-rgb), 0.62);
        font-size: 1.2rem;
    }

    .comment-content {
        color: rgba(var(--scene-accent-soft-rgb), 0.82);
        font-size: 1.5rem;
        line-height: 1.8;
        white-space: pre-wrap;
    }

    .comment-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
    }

    .comment-like-group {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.68);
    }

    .comment-action-icon {
        width: 3.8rem;
        min-width: 0;
        height: 3.8rem;
        padding: 0;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .comment-action-icon svg {
        transition: transform 160ms ease, opacity 160ms ease;
    }

    .comment-action-icon[data-liked="true"] svg {
        fill: rgba(var(--scene-accent-rgb), 0.3);
        color: rgba(var(--scene-title-rgb), 0.96);
    }

    .comment-action-icon:hover svg {
        transform: scale(1.06);
    }

    .comment-like-count {
        color: rgba(var(--scene-accent-soft-rgb), 0.64);
        font-size: 1.18rem;
    }

    .comment-children {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        margin-left: clamp(1.6rem, 2vw, 2.6rem);
        padding-left: 1.4rem;
        border-left: 1px solid rgba(var(--scene-accent-rgb), 0.12);
    }

    @media (max-width: 700px) {
        .comment-card {
            padding: 1.6rem;
        }

        .comment-main {
            gap: 1rem;
        }

        .comment-avatar,
        .comment-avatar img {
            width: 4rem;
            height: 4rem;
        }

        .comment-children {
            margin-left: 1rem;
            padding-left: 1rem;
        }
    }
`;

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const CommentNodeBase = ({
  comment,
  depth = 0,
  isDeleting,
  likePendingId,
  onDelete,
  onReply,
  onToggleLike,
}: CommentNodeProps) => (
  <div className="comment-card" data-depth={depth}>
    <div className="comment-main">
      <div className="comment-avatar">
        {comment.author.avatarUrl ? (
          <img
            alt={comment.author.name}
            decoding="async"
            loading="lazy"
            src={comment.author.avatarUrl}
          />
        ) : (
          <span>{getInitials(comment.author.name)}</span>
        )}
      </div>

      <div className="comment-body">
        <div className="comment-header">
          <div>
            <div className="comment-author">{comment.author.name}</div>
            <div className="comment-date">
              {new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(comment.createdAt))}
            </div>
          </div>
        </div>

        <div className="comment-content">{comment.content}</div>

        <div className="comment-actions">
          {onToggleLike ? (
            <div className="comment-like-group">
              <button
                aria-label={comment.likedByCurrentUser ? "Remover curtida" : "Curtir comentário"}
                className="comment-action-icon"
                data-liked={comment.likedByCurrentUser}
                onClick={() => onToggleLike(comment)}
                title={comment.likedByCurrentUser ? "Remover curtida" : "Curtir comentário"}
                type="button"
              >
                <HeartStraight size={18} weight={likePendingId === comment.id ? "fill" : "regular"} />
              </button>
              <span className="comment-like-count">
                {likePendingId === comment.id
                  ? "..."
                  : `${comment.likesCount} ${comment.likesCount === 1 ? "curtida" : "curtidas"}`}
              </span>
            </div>
          ) : null}

          {onReply ? (
            <button
              aria-label="Responder comentário"
              className="comment-action-icon"
              onClick={() => onReply(comment)}
              title="Responder comentário"
              type="button"
            >
              <ChatCircleDots size={18} weight="regular" />
            </button>
          ) : null}

          {comment.canDelete && onDelete ? (
            <button
              aria-label="Remover comentário"
              className="comment-action-icon"
              onClick={() => onDelete(comment.id)}
              title={isDeleting === comment.id ? "Removendo comentário" : "Remover comentário"}
              type="button"
            >
              <Trash size={18} weight={isDeleting === comment.id ? "fill" : "regular"} />
            </button>
          ) : null}
        </div>
      </div>
    </div>

    {comment.replies.length ? (
      <div className="comment-children">
        {comment.replies.map((reply) => (
          <CommentNode
            comment={reply}
            depth={depth + 1}
            isDeleting={isDeleting}
            key={reply.id}
            likePendingId={likePendingId}
            onDelete={onDelete}
            onReply={onReply}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>
    ) : null}
  </div>
);

const CommentNode = memo(CommentNodeBase);

export const CommentList = memo(
  ({
    comments,
    isDeleting,
    likePendingId,
    onDelete,
    onReply,
    onToggleLike,
  }: CommentListProps) => {
    if (!comments.length) {
      return (
        <EmptyState
          description="A conversa desta publicação começa quando o primeiro comentário é enviado."
          title="Sem comentários ainda"
        />
      );
    }

    return (
      <CommentListContainer>
        {comments.map((comment) => (
          <CommentNode
            comment={comment}
            isDeleting={isDeleting}
            key={comment.id}
            likePendingId={likePendingId}
            onDelete={onDelete}
            onReply={onReply}
            onToggleLike={onToggleLike}
          />
        ))}
      </CommentListContainer>
    );
  }
);
