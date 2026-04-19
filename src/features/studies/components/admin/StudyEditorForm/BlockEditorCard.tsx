import { ImageUploadField } from "../../../../uploads/components/ImageUploadField";
import { StudyBlock, StudyFormValues } from "../../../types/study";
import { BlockCardContainer } from "./styles";

type BlockEditorCardProps = {
  block: StudyBlock;
  blockIndex: number;
  form: StudyFormValues;
  label: string;
  onChange: (nextForm: StudyFormValues) => void;
};

const updateBlock = (
  form: StudyFormValues,
  blockIndex: number,
  producer: (currentBlock: StudyBlock) => StudyBlock
) => ({
  ...form,
  content: form.content.map((block, index) => (index === blockIndex ? producer(block) : block)),
});

const updateBlockData = (
  form: StudyFormValues,
  blockIndex: number,
  key: string,
  value: unknown
) =>
  updateBlock(form, blockIndex, (block) => ({
    ...block,
    data: {
      ...block.data,
      [key]: value,
    },
  }));

const renderBlockFields = (
  block: StudyBlock,
  blockIndex: number,
  form: StudyFormValues,
  onChange: (nextForm: StudyFormValues) => void
) => {
  switch (block.type) {
    case "heading":
      return (
        <div className="block-inline-grid">
          <label>
            Nivel
            <select
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "level", event.target.value))}
              value={String(block.data.level || "2")}
            >
              <option value="1">H1</option>
              <option value="2">H2</option>
              <option value="3">H3</option>
              <option value="4">H4</option>
            </select>
          </label>
          <label>
            Texto
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "text", event.target.value))}
              value={String(block.data.text || "")}
            />
          </label>
        </div>
      );
    case "paragraph":
    case "quote":
    case "callout":
      return (
        <>
          {block.type !== "paragraph" ? (
            <div className="block-inline-grid">
              {block.type === "quote" ? (
                <label>
                  Autor
                  <input
                    onChange={(event) => onChange(updateBlockData(form, blockIndex, "author", event.target.value))}
                    value={String(block.data.author || "")}
                  />
                </label>
              ) : (
                <label>
                  Titulo
                  <input
                    onChange={(event) => onChange(updateBlockData(form, blockIndex, "title", event.target.value))}
                    value={String(block.data.title || "")}
                  />
                </label>
              )}
              {block.type === "callout" ? (
                <label>
                  Variante
                  <select
                    onChange={(event) => onChange(updateBlockData(form, blockIndex, "variant", event.target.value))}
                    value={String(block.data.variant || "note")}
                  >
                    <option value="note">Note</option>
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                  </select>
                </label>
              ) : null}
            </div>
          ) : null}
          <label>
            Conteudo
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "text", event.target.value))}
              value={String(block.data.text || "")}
            />
          </label>
        </>
      );
    case "image":
      return (
        <>
          <label>
            URL da imagem
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "url", event.target.value))}
              value={String(block.data.url || "")}
            />
          </label>

          <ImageUploadField
            buttonLabel="Upload da imagem"
            folder="study-content"
            onUploaded={(url) => onChange(updateBlockData(form, blockIndex, "url", url))}
          />

          <div className="block-inline-grid">
            <label>
              Texto alternativo
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "alt", event.target.value))}
                value={String(block.data.alt || "")}
              />
            </label>
            <label>
              Legenda
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "caption", event.target.value))}
                value={String(block.data.caption || "")}
              />
            </label>
          </div>
        </>
      );
    case "code":
      return (
        <>
          <div className="block-inline-grid">
            <label>
              Linguagem
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "language", event.target.value))}
                value={String(block.data.language || "")}
              />
            </label>
            <label>
              Legenda
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "caption", event.target.value))}
                value={String(block.data.caption || "")}
              />
            </label>
          </div>
          <label>
            Codigo
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "code", event.target.value))}
              value={String(block.data.code || "")}
            />
          </label>
        </>
      );
    case "list": {
      const items = Array.isArray(block.data.items) ? block.data.items : [];

      return (
        <>
          <label>
            Estilo
            <select
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "style", event.target.value))}
              value={String(block.data.style || "unordered")}
            >
              <option value="unordered">Nao ordenada</option>
              <option value="ordered">Ordenada</option>
            </select>
          </label>
          {items.map((item, itemIndex) => (
            <label key={`${block.type}-${itemIndex}`}>
              Item {itemIndex + 1}
              <input
                onChange={(event) => {
                  const nextItems = [...items];
                  nextItems[itemIndex] = event.target.value;
                  onChange(updateBlockData(form, blockIndex, "items", nextItems));
                }}
                value={String(item)}
              />
            </label>
          ))}
          <button
            className="block-add-button"
            onClick={() =>
              onChange(updateBlockData(form, blockIndex, "items", [...items, ""]))
            }
            type="button"
          >
            Adicionar item
          </button>
        </>
      );
    }
    case "divider":
      return (
        <label>
          Espacamento
          <select
            onChange={(event) => onChange(updateBlockData(form, blockIndex, "spacing", event.target.value))}
            value={String(block.data.spacing || "md")}
          >
            <option value="sm">Pequeno</option>
            <option value="md">Medio</option>
            <option value="lg">Grande</option>
          </select>
        </label>
      );
    case "references": {
      const links = Array.isArray(block.data.links) ? block.data.links : [];

      return (
        <>
          {links.map((link, linkIndex) => {
            const currentLink =
              link && typeof link === "object" ? (link as Record<string, unknown>) : {};

            return (
              <div className="reference-item" key={`reference-${linkIndex}`}>
                <label>
                  Rotulo
                  <input
                    onChange={(event) => {
                      const nextLinks = [...links];
                      nextLinks[linkIndex] = { ...currentLink, label: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "links", nextLinks));
                    }}
                    value={String(currentLink.label || "")}
                  />
                </label>
                <label>
                  URL
                  <input
                    onChange={(event) => {
                      const nextLinks = [...links];
                      nextLinks[linkIndex] = { ...currentLink, url: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "links", nextLinks));
                    }}
                    value={String(currentLink.url || "")}
                  />
                </label>
                <label>
                  Descricao
                  <input
                    onChange={(event) => {
                      const nextLinks = [...links];
                      nextLinks[linkIndex] = { ...currentLink, description: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "links", nextLinks));
                    }}
                    value={String(currentLink.description || "")}
                  />
                </label>
              </div>
            );
          })}
          <button
            className="block-add-button"
            onClick={() =>
              onChange(
                updateBlockData(form, blockIndex, "links", [
                  ...links,
                  { description: "", label: "", url: "" },
                ])
              )
            }
            type="button"
          >
            Adicionar referencia
          </button>
        </>
      );
    }
    default:
      return null;
  }
};

export const BlockEditorCard = ({
  block,
  blockIndex,
  form,
  label,
  onChange,
}: BlockEditorCardProps) => (
  <BlockCardContainer>
    <div className="block-card-header">
      <strong>{label}</strong>
      <div className="block-actions">
        <button
          onClick={() => {
            if (blockIndex === 0) {
              return;
            }

            const nextBlocks = [...form.content];
            [nextBlocks[blockIndex - 1], nextBlocks[blockIndex]] = [
              nextBlocks[blockIndex],
              nextBlocks[blockIndex - 1],
            ];
            onChange({ ...form, content: nextBlocks });
          }}
          type="button"
        >
          Subir
        </button>
        <button
          onClick={() => {
            if (blockIndex === form.content.length - 1) {
              return;
            }

            const nextBlocks = [...form.content];
            [nextBlocks[blockIndex], nextBlocks[blockIndex + 1]] = [
              nextBlocks[blockIndex + 1],
              nextBlocks[blockIndex],
            ];
            onChange({ ...form, content: nextBlocks });
          }}
          type="button"
        >
          Descer
        </button>
        <button
          onClick={() =>
            onChange({
              ...form,
              content: form.content.filter((_, index) => index !== blockIndex),
            })
          }
          type="button"
        >
          Remover
        </button>
      </div>
    </div>
    {renderBlockFields(block, blockIndex, form, onChange)}
  </BlockCardContainer>
);