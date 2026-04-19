import styled from "styled-components";
import { StudyComment } from "../../../types/study";
import { EmptyState } from "../../shared/EmptyState";
import { surfaceCardCss } from "../../../utils/styleMixins";

type AdminCommentsPanelProps = {
  comments: StudyComment[];
  onDelete: (commentId: string) => void;
  deletingCommentId?: string | null;
};

const AdminCommentsPanelContainer = styled.section`
    ${surfaceCardCss};

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.8rem;

    .panel-title {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.3rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .comment-row {
        padding: 1.4rem;
        border-radius: 1.8rem;
        background: rgba(11, 22, 35, 0.52);
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .comment-header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .comment-header strong {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-size: 1.4rem;
    }

    .comment-header span,
    .comment-body {
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-size: 1.3rem;
        line-height: 1.7;
    }

    .comment-row button {
        width: fit-content;
        min-width: 0;
        height: 3.8rem;
        padding: 0 1.2rem;
        font-size: 0.94rem;
    }
`;

export const AdminCommentsPanel = ({
  comments,
  deletingCommentId,
  onDelete,
}: AdminCommentsPanelProps) => (
  <AdminCommentsPanelContainer>
    <div className="panel-title">Comentários recentes</div>
    {comments.length ? (
      comments.map((comment) => (
        <div className="comment-row" key={comment.id}>
          <div className="comment-header">
            <div>
              <strong>{comment.postTitle || "Estudo"}</strong>
              <span>{comment.author.name}</span>
            </div>
            <span>
              {new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(comment.createdAt))}
            </span>
          </div>
          <div className="comment-body">{comment.content}</div>
          <button onClick={() => onDelete(comment.id)} type="button">
            {deletingCommentId === comment.id ? "Removendo" : "Excluir comentário"}
          </button>
        </div>
      ))
    ) : (
      <EmptyState
        description="Os comentários publicados aparecerão aqui para acompanhamento e moderação."
        title="Sem comentários na fila"
      />
    )}
  </AdminCommentsPanelContainer>
);
