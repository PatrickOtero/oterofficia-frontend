import styled from "styled-components";
import { StudyComment } from "../../../types/study";
import { EmptyState } from "../../shared/EmptyState";
import { surfaceCardCss } from "../../../utils/styleMixins";

type CommentListProps = {
  comments: StudyComment[];
  onDelete?: (commentId: string) => void;
  isDeleting?: string | null;
};

const CommentListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    .comment-card {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        padding: 1.8rem 2rem;
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        gap: 1.2rem;
        align-items: center;
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

    .comment-delete-button {
        width: auto;
        min-width: 0;
        height: 3.8rem;
        padding: 0 1.4rem;
        font-size: 1rem;
    }
`;

export const CommentList = ({ comments, isDeleting, onDelete }: CommentListProps) => {
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
        <div className="comment-card" key={comment.id}>
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
            {comment.canDelete && onDelete ? (
              <button
                className="comment-delete-button"
                onClick={() => onDelete(comment.id)}
                type="button"
              >
                {isDeleting === comment.id ? "Removendo" : "Remover"}
              </button>
            ) : null}
          </div>
          <div className="comment-content">{comment.content}</div>
        </div>
      ))}
    </CommentListContainer>
  );
};
