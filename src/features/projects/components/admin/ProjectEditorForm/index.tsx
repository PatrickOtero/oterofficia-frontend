import { ImageUploadField } from "../../../../uploads/components/ImageUploadField";
import { ProjectFormValues } from "../../../types/project";
import { formatProjectTagsInput, parseProjectTagsInput } from "../../../utils/projectEditor";
import { ProjectEditorContainer } from "./styles";

type ProjectEditorFormProps = {
  form: ProjectFormValues;
  isEditing?: boolean;
  isSaving?: boolean;
  onBack: () => void;
  onChange: (nextForm: ProjectFormValues) => void;
  onSave: () => void;
};

export const ProjectEditorForm = ({
  form,
  isEditing,
  isSaving,
  onBack,
  onChange,
  onSave,
}: ProjectEditorFormProps) => (
  <ProjectEditorContainer>
    <div className="editor-column">
      <div className="editor-section">
        <div className="editor-section-title">Projeto</div>
        <div className="editor-grid">
          <label>
            Nome
            <input
              onChange={(event) => onChange({ ...form, projectName: event.target.value })}
              value={form.projectName}
            />
          </label>
          <label>
            Imagem
            <input
              onChange={(event) => onChange({ ...form, imageUrl: event.target.value })}
              value={form.imageUrl}
            />
          </label>
          <label>
            Status
            <select
              onChange={(event) =>
                onChange({ ...form, projectStatus: event.target.value as ProjectFormValues["projectStatus"] })
              }
              value={form.projectStatus}
            >
              <option value="completed">Concluído</option>
              <option value="in_progress">Em progresso</option>
            </select>
          </label>
          <label>
            Trilha
            <select
              onChange={(event) =>
                onChange({
                  ...form,
                  organizationName:
                    event.target.value === "soujunior" && !form.organizationName ? "SouJunior" : form.organizationName,
                  projectTrack: event.target.value as ProjectFormValues["projectTrack"],
                })
              }
              value={form.projectTrack}
            >
              <option value="personal">Autoral</option>
              <option value="soujunior">SouJunior</option>
            </select>
          </label>
          <label>
            Front-end
            <input
              onChange={(event) => onChange({ ...form, frontendUrl: event.target.value })}
              value={form.frontendUrl}
            />
          </label>
          <label>
            Back-end
            <input
              onChange={(event) => onChange({ ...form, backendUrl: event.target.value })}
              value={form.backendUrl}
            />
          </label>
          <label className="editor-wide">
            Vídeo
            <input
              onChange={(event) => onChange({ ...form, videoUrl: event.target.value })}
              value={form.videoUrl}
            />
          </label>
          <label>
            Organização
            <input
              onChange={(event) => onChange({ ...form, organizationName: event.target.value })}
              value={form.organizationName}
            />
          </label>
          <label>
            Papel
            <input
              onChange={(event) => onChange({ ...form, projectRole: event.target.value })}
              value={form.projectRole}
            />
          </label>
          <label className="editor-wide">
            Destaque curto
            <input
              onChange={(event) => onChange({ ...form, projectHighlight: event.target.value })}
              value={form.projectHighlight}
            />
          </label>
          <label className="editor-wide">
            Tags
            <input
              onChange={(event) => onChange({ ...form, projectTags: parseProjectTagsInput(event.target.value) })}
              value={formatProjectTagsInput(form.projectTags)}
            />
          </label>
        </div>

        <ImageUploadField
          buttonLabel="Upload da imagem"
          folder="projects"
          onUploaded={(url) => onChange({ ...form, imageUrl: url })}
        />

        <label>
          Descricao
          <textarea
            onChange={(event) => onChange({ ...form, projectDescription: event.target.value })}
            value={form.projectDescription}
          />
        </label>
      </div>

      <div className="editor-footer">
        <button onClick={onBack} type="button">
          Voltar
        </button>
        <button onClick={onSave} type="button">
          {isSaving ? "Salvando" : isEditing ? "Salvar alteracoes" : "Criar projeto"}
        </button>
      </div>
    </div>

    <div className="editor-column">
      <div className="preview-panel">
        <div className="preview-meta">
          <span className="preview-badge">{form.projectTrack === "soujunior" ? "SouJunior" : "Autoral"}</span>
          <span className="preview-badge">
            {form.projectStatus === "completed" ? "Concluído" : "Em progresso"}
          </span>
          {form.organizationName ? <span className="preview-badge">{form.organizationName}</span> : null}
        </div>

        <div className="preview-media">
          {form.imageUrl ? (
            <img alt={form.projectName || "Projeto"} src={form.imageUrl} />
          ) : (
            <div className="preview-empty-media">Sem imagem</div>
          )}
        </div>

        <div className="preview-copy">
          <h2>{form.projectName || "Novo projeto"}</h2>
          {form.projectHighlight ? <strong>{form.projectHighlight}</strong> : null}
          {form.projectRole ? <span>{form.projectRole}</span> : null}
          <p>{form.projectDescription || "Sem descricao."}</p>
        </div>

        {form.projectTags.length ? (
          <div className="preview-tags">
            {form.projectTags.map((tag) => (
              <span className="preview-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="preview-links">
          {form.frontendUrl ? (
            <a className="preview-link" href={form.frontendUrl} rel="noreferrer" target="_blank">
              Front-end
            </a>
          ) : null}
          {form.backendUrl ? (
            <a className="preview-link" href={form.backendUrl} rel="noreferrer" target="_blank">
              Back-end
            </a>
          ) : null}
          {form.videoUrl ? (
            <a className="preview-link" href={form.videoUrl} rel="noreferrer" target="_blank">
              Video
            </a>
          ) : null}
          {!form.frontendUrl && !form.backendUrl && !form.videoUrl ? (
            <span className="preview-link preview-link--empty">Sem links</span>
          ) : null}
        </div>
      </div>
    </div>
  </ProjectEditorContainer>
);
