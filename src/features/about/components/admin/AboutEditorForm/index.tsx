import { AboutPageRenderer } from "../../public/AboutPageRenderer";
import { EditorContainer } from "../../../../studies/components/admin/StudyEditorForm/styles";
import { AboutFormValues } from "../../../types/about";
import { createEmptyAboutBlock } from "../../../utils/aboutEditor";
import { AboutBlockEditorCard } from "./BlockEditorCard";

type AboutEditorFormProps = {
  form: AboutFormValues;
  isSaving?: boolean;
  onChange: (nextForm: AboutFormValues) => void;
  onSave: () => void;
};

const availableBlockTypes = [
  { label: "Hero", type: "hero" },
  { label: "Texto", type: "text" },
  { label: "Imagem", type: "image" },
  { label: "Stacks", type: "stack" },
  { label: "Redes", type: "social" },
  { label: "Contatos", type: "contact" },
  { label: "Formulário", type: "contact-form" },
] as const;

export const AboutEditorForm = ({
  form,
  isSaving,
  onChange,
  onSave,
}: AboutEditorFormProps) => (
  <EditorContainer>
    <div className="editor-column">
      <div className="editor-section">
        <div className="editor-section-title">SEO</div>
        <label>
          Título de SEO
          <input
            onChange={(event) => onChange({ ...form, seoTitle: event.target.value })}
            value={form.seoTitle}
          />
        </label>
        <label>
          Descrição de SEO
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
              onClick={() =>
                onChange({ ...form, blocks: [...form.blocks, createEmptyAboutBlock(blockType.type)] })
              }
              type="button"
            >
              {blockType.label}
            </button>
          ))}
        </div>

        {form.blocks.map((block, blockIndex) => (
          <AboutBlockEditorCard
            block={block}
            blockIndex={blockIndex}
            form={form}
            key={block.id}
            label={availableBlockTypes.find((item) => item.type === block.type)?.label || block.type}
            onChange={onChange}
          />
        ))}
      </div>

      <div className="editor-footer">
        <button onClick={onSave} type="button">
          {isSaving ? "Salvando" : "Salvar página"}
        </button>
      </div>
    </div>

    <div className="editor-column">
      <div className="editor-preview">
        <AboutPageRenderer
          interactive={false}
          page={{
            blocks: form.blocks,
            createdAt: "",
            id: "preview",
            seoDescription: form.seoDescription || null,
            seoTitle: form.seoTitle || null,
            updatedAt: "",
          }}
        />
      </div>
    </div>
  </EditorContainer>
);
