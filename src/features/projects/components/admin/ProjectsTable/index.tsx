import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProjectRecord } from "../../../types/project";
import { EmptyState } from "../../../../studies/components/shared/EmptyState";
import { surfaceCardCss } from "../../../../studies/utils/styleMixins";

type ProjectsTableProps = {
  onDelete: (projectId: string) => void;
  pendingDeleteId?: string | null;
  projects: ProjectRecord[];
};

const ProjectsTableContainer = styled.section`
    ${surfaceCardCss};

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.8rem;

    .table-header,
    .table-row {
        display: grid;
        grid-template-columns: 2.4fr 1fr 1fr auto;
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
        display: grid;
        grid-template-columns: 8.4rem 1fr;
        gap: 1.2rem;
        align-items: center;
    }

    .title-image {
        width: 8.4rem;
        height: 5.8rem;
        border-radius: 1.2rem;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: rgba(13, 28, 41, 0.72);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
    }

    .title-stack {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .title-stack strong {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-size: 1.55rem;
    }

    .title-stack span,
    .table-cell {
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-size: 1.28rem;
        line-height: 1.55;
    }

    .link-chip-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .link-chip {
        padding: 0.6rem 0.9rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
        font-size: 0.94rem;
        text-transform: uppercase;
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

    @media (max-width: 720px) {
        .title-cell {
            grid-template-columns: 1fr;
        }

        .title-image {
            width: 100%;
            height: 18rem;
        }
    }
`;

const compactProjectDescription = (description: string) => {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= 110) {
    return normalized;
  }

  return `${normalized.slice(0, 107)}...`;
};

export const ProjectsTable = ({
  onDelete,
  pendingDeleteId,
  projects,
}: ProjectsTableProps) => {
  if (!projects.length) {
    return <EmptyState title="Sem projetos" />;
  }

  return (
    <ProjectsTableContainer>
      <div className="table-header">
        <span>Projeto</span>
        <span>Links</span>
        <span>Video</span>
        <span>Acoes</span>
      </div>

      {projects.map((project) => (
        <div className="table-row" key={project.id}>
          <div className="title-cell">
            <div
              aria-hidden="true"
              className="title-image"
              style={{ backgroundImage: `url(${project.image_url})` }}
            />
            <div className="title-stack">
              <strong>{project.project_name}</strong>
              <span>{compactProjectDescription(project.project_desc)}</span>
            </div>
          </div>

          <div className="table-cell">
            <div className="link-chip-list">
              {project.frontend_url ? <span className="link-chip">Front</span> : null}
              {project.backend_url ? <span className="link-chip">Back</span> : null}
            </div>
          </div>

          <div className="table-cell">{project.video_url ? "Disponivel" : "--"}</div>

          <div className="actions-cell">
            <Link className="edit-link" to={`/admin/projects/${project.id}/edit`}>
              Editar
            </Link>
            <button onClick={() => onDelete(String(project.id))} type="button">
              {pendingDeleteId === String(project.id) ? "Removendo" : "Excluir"}
            </button>
          </div>
        </div>
      ))}
    </ProjectsTableContainer>
  );
};