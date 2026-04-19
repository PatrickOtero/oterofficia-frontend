import { Link } from "react-router-dom";
import styled from "styled-components";
import { StudySummary } from "../../../types/study";
import { EmptyState } from "../../shared/EmptyState";
import { surfaceCardCss } from "../../../utils/styleMixins";

type StudiesTableProps = {
  studies: StudySummary[];
  onDelete: (postId: string) => void;
  onToggleStatus: (study: StudySummary) => void;
  pendingDeleteId?: string | null;
  pendingStatusId?: string | null;
};

const StudiesTableContainer = styled.section`
    ${surfaceCardCss};

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.8rem;

    .table-header,
    .table-row {
        display: grid;
        grid-template-columns: 2.2fr 1fr 1fr 1fr 1fr auto;
        gap: 1rem;
        align-items: center;
    }

    .table-header {
        padding: 0 1rem 1rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.62);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.98rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    .table-row {
        padding: 1.2rem 1rem;
        border-radius: 1.8rem;
        background: rgba(11, 22, 35, 0.46);
    }

    .title-cell {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .title-cell strong {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-size: 1.55rem;
    }

    .title-cell span,
    .table-cell {
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-size: 1.32rem;
        line-height: 1.6;
    }

    .actions-cell {
        display: flex;
        gap: 0.8rem;
        justify-content: flex-end;
        flex-wrap: wrap;
    }

    .actions-cell button {
        width: auto;
        min-width: 0;
        height: 3.8rem;
        padding: 0 1.2rem;
        font-size: 0.94rem;
    }

    .edit-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 3.8rem;
        padding: 0 1.2rem;
        border-radius: 1.2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.2);
        background: rgba(14, 26, 39, 0.6);
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
        font-size: 0.94rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    @media (max-width: 1180px) {
        .table-header {
            display: none;
        }

        .table-row {
            grid-template-columns: 1fr;
            gap: 1.2rem;
        }

        .actions-cell {
            justify-content: flex-start;
        }
    }
`;

export const StudiesTable = ({
  onDelete,
  onToggleStatus,
  pendingDeleteId,
  pendingStatusId,
  studies,
}: StudiesTableProps) => {
  if (!studies.length) {
    return (
      <EmptyState
        description="Os filtros atuais não retornaram estudos. Ajuste a busca ou crie uma nova publicação."
        title="Nenhum estudo nesta seleção"
      />
    );
  }

  return (
    <StudiesTableContainer>
      <div className="table-header">
        <span>Estudo</span>
        <span>Status</span>
        <span>Categoria</span>
        <span>Curtidas</span>
        <span>Comentários</span>
        <span>Ações</span>
      </div>

      {studies.map((study) => (
        <div className="table-row" key={study.id}>
          <div className="title-cell">
            <strong>{study.title}</strong>
            <span>{study.slug}</span>
          </div>
          <div className="table-cell">{study.status === "published" ? "Publicado" : "Rascunho"}</div>
          <div className="table-cell">{study.category}</div>
          <div className="table-cell">{study.likesCount}</div>
          <div className="table-cell">{study.commentsCount}</div>
          <div className="actions-cell">
            <Link className="edit-link" to={`/admin/studies/${study.id}/edit`}>
              Editar
            </Link>
            <button onClick={() => onToggleStatus(study)} type="button">
              {pendingStatusId === study.id
                ? "Atualizando"
                : study.status === "published"
                ? "Despublicar"
                : "Publicar"}
            </button>
            <button onClick={() => onDelete(study.id)} type="button">
              {pendingDeleteId === study.id ? "Removendo" : "Excluir"}
            </button>
          </div>
        </div>
      ))}
    </StudiesTableContainer>
  );
};
