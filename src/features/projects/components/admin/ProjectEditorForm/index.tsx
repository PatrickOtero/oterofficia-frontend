import { ImageUploadField } from "../../../../uploads/components/ImageUploadField";
import { ProjectFormValues } from "../../../types/project";
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
            Video
            <input
              onChange={(event) => onChange({ ...form, videoUrl: event.target.value })}
              value={form.videoUrl}
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
        <div className="preview-media">
          {form.imageUrl ? (
            <img alt={form.projectName || "Projeto"} src={form.imageUrl} />
          ) : (
            <div className="preview-empty-media">Sem imagem</div>
          )}
        </div>

        <div className="preview-copy">
          <h2>{form.projectName || "Novo projeto"}</h2>
          <p>{form.projectDescription || "Sem descricao."}</p>
        </div>

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