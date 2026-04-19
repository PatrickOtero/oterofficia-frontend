import { ImageUploadField } from "../../../../uploads/components/ImageUploadField";
import { StudyBlockRenderer } from "../../public/StudyBlockRenderer";
import { StudyFormValues } from "../../../types/study";
import { createEmptyBlock, formatTagsInput, parseTagsInput } from "../../../utils/studyEditor";
import { BlockEditorCard } from "./BlockEditorCard";
import { EditorContainer } from "./styles";

type StudyEditorFormProps = {
  form: StudyFormValues;
  onChange: (nextForm: StudyFormValues) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isSaving?: boolean;
  isPublishing?: boolean;
};

const availableBlockTypes = [
  { label: "Heading", type: "heading" },
  { label: "Paragrafo", type: "paragraph" },
  { label: "Imagem", type: "image" },
  { label: "Codigo", type: "code" },
  { label: "Citacao", type: "quote" },
  { label: "Lista", type: "list" },
  { label: "Divisor", type: "divider" },
  { label: "Callout", type: "callout" },
  { label: "Referencias", type: "references" },
] as const;

export const StudyEditorForm = ({
  form,
  isPublishing,
  isSaving,
  onChange,
  onPublish,
  onSaveDraft,
}: StudyEditorFormProps) => (
  <EditorContainer>
    <div className="editor-column">
      <div className="editor-section">
        <div className="editor-section-title">Metadados</div>
        <div className="editor-grid">
          <label>
            Titulo
            <input
              onChange={(event) => onChange({ ...form, title: event.target.value })}
              value={form.title}
            />
          </label>
          <label>
            Slug
            <input
              onChange={(event) => onChange({ ...form, slug: event.target.value })}
              value={form.slug}
            />
          </label>
          <label>
            Categoria
            <input
              onChange={(event) => onChange({ ...form, category: event.target.value })}
              value={form.category}
            />
          </label>
          <label>
            Status
            <select
              onChange={(event) =>
                onChange({ ...form, status: event.target.value as StudyFormValues["status"] })
              }
              value={form.status}
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </label>
        </div>
        <label>
          Resumo
          <textarea
            onChange={(event) => onChange({ ...form, excerpt: event.target.value })}
            value={form.excerpt}
          />
        </label>
        <label>
          URL da capa
          <input
            onChange={(event) => onChange({ ...form, coverImage: event.target.value })}
            value={form.coverImage}
          />
        </label>

        <ImageUploadField
          buttonLabel="Upload da capa"
          folder="study-covers"
          onUploaded={(url) => onChange({ ...form, coverImage: url })}
        />

        <label>
          Tags
          <input
            onChange={(event) => onChange({ ...form, tags: parseTagsInput(event.target.value) })}
            value={formatTagsInput(form.tags)}
          />
        </label>
      </div>

      <div className="editor-section">
        <div className="editor-section-title">SEO</div>
        <label>
          Titulo de SEO
          <input
            onChange={(event) => onChange({ ...form, seoTitle: event.target.value })}
            value={form.seoTitle}
          />
        </label>
        <label>
          Descricao de SEO
          <textarea
            onChange={(event) => onChange({ ...form, seoDescription: event.target.value })}
            value={form.seoDescription}
          />
        </label>
      </div>

      <div className="editor-section">
        <div className="editor-section-title">Blocos</div>
        <div className="editor-toolbar">
          {availableBlockTypes.map((blockType) => (
            <button
              key={blockType.type}
              onClick={() => onChange({ ...form, content: [...form.content, createEmptyBlock(blockType.type)] })}
              type="button"
            >
              {blockType.label}
            </button>
          ))}
        </div>

        {form.content.map((block, blockIndex) => (
          <BlockEditorCard
            block={block}
            blockIndex={blockIndex}
            form={form}
            key={`${block.type}-${blockIndex}`}
            label={availableBlockTypes.find((item) => item.type === block.type)?.label || block.type}
            onChange={onChange}
          />
        ))}
      </div>

      <div className="editor-footer">
        <button onClick={onSaveDraft} type="button">
          {isSaving ? "Salvando" : "Salvar rascunho"}
        </button>
        <button onClick={onPublish} type="button">
          {isPublishing ? "Publicando" : "Salvar e publicar"}
        </button>
      </div>
    </div>

    <div className="editor-column">
      <div className="editor-preview">
        <div className="preview-header">
          <h2>{form.title || "Titulo da postagem"}</h2>
          <p>{form.excerpt || "Resumo vazio."}</p>
        </div>
        <div className="preview-meta">
          {form.category ? <span className="preview-pill">{form.category}</span> : null}
          {form.tags.map((tag) => (
            <span className="preview-pill" key={tag}>
              {tag}
            </span>
          ))}
          {form.readingTime ? <span className="preview-pill">{form.readingTime} min</span> : null}
        </div>
        <StudyBlockRenderer blocks={form.content} />
      </div>
    </div>
  </EditorContainer>
);