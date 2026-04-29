import { ImageUploadField } from "../../../../uploads/components/ImageUploadField";
import {
  moveItem,
  removeItem,
  toRecordArray,
  updateBlockData as updateBlockDataInList,
} from "../../../../adminBlockEditor/blockEditorForm.utils";
import { AboutBlock, AboutFormValues } from "../../../types/about";
import { BlockCardContainer } from "../../../../studies/components/admin/StudyEditorForm/styles";

type BlockEditorCardProps = {
  block: AboutBlock;
  blockIndex: number;
  form: AboutFormValues;
  label: string;
  onChange: (nextForm: AboutFormValues) => void;
};

const updateBlockData = (
  form: AboutFormValues,
  blockIndex: number,
  key: string,
  value: unknown
): AboutFormValues => ({
  ...form,
  blocks: updateBlockDataInList(form.blocks, blockIndex, key, value),
});

const updateStackGroups = (
  form: AboutFormValues,
  blockIndex: number,
  producer: (groups: Array<Record<string, unknown>>) => Array<Record<string, unknown>>
) => {
  const currentBlock = form.blocks[blockIndex];
  const currentGroups = toRecordArray(currentBlock?.data.groups).map((group) => ({ ...group }));

  return updateBlockData(form, blockIndex, "groups", producer(currentGroups));
};

const renderItemsAsTextarea = (
  items: unknown,
  onChange: (nextItems: string[]) => void
) => (
  <label>
    Itens
    <textarea
      onChange={(event) =>
        onChange(
          event.target.value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        )
      }
      value={Array.isArray(items) ? items.map((item) => String(item)).join("\n") : ""}
    />
  </label>
);

const renderBlockFields = (
  block: AboutBlock,
  blockIndex: number,
  form: AboutFormValues,
  onChange: (nextForm: AboutFormValues) => void
) => {
  switch (block.type) {
    case "hero":
      return (
        <>
          <div className="block-inline-grid">
            <label>
              Eyebrow
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "eyebrow", event.target.value))}
                value={String(block.data.eyebrow || "")}
              />
            </label>
            <label>
              Nome / título
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "title", event.target.value))}
                value={String(block.data.title || "")}
              />
            </label>
          </div>

          <label>
            Subtítulo
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "subtitle", event.target.value))}
              value={String(block.data.subtitle || "")}
            />
          </label>

          <label>
            Resumo
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "summary", event.target.value))}
              value={String(block.data.summary || "")}
            />
          </label>

          <div className="block-inline-grid">
            <label>
              Localizacao
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "location", event.target.value))}
                value={String(block.data.location || "")}
              />
            </label>
            <label>
              Disponibilidade
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "availability", event.target.value))}
                value={String(block.data.availability || "")}
              />
            </label>
          </div>

          <label>
            URL da imagem
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "imageUrl", event.target.value))}
              value={String(block.data.imageUrl || "")}
            />
          </label>

          <ImageUploadField
            buttonLabel="Upload da imagem principal"
            folder="about"
            onUploaded={(url) => onChange(updateBlockData(form, blockIndex, "imageUrl", url))}
          />

          <label>
            Texto alternativo da imagem
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "imageAlt", event.target.value))}
              value={String(block.data.imageAlt || "")}
            />
          </label>

          <div className="block-inline-grid">
            <label>
              CTA principal
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "primaryCtaLabel", event.target.value))}
                value={String(block.data.primaryCtaLabel || "")}
              />
            </label>
            <label>
              URL CTA principal
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "primaryCtaUrl", event.target.value))}
                value={String(block.data.primaryCtaUrl || "")}
              />
            </label>
          </div>

          <div className="block-inline-grid">
            <label>
              CTA secundário
              <input
                onChange={(event) =>
                  onChange(updateBlockData(form, blockIndex, "secondaryCtaLabel", event.target.value))
                }
                value={String(block.data.secondaryCtaLabel || "")}
              />
            </label>
            <label>
              URL CTA secundário
              <input
                onChange={(event) =>
                  onChange(updateBlockData(form, blockIndex, "secondaryCtaUrl", event.target.value))
                }
                value={String(block.data.secondaryCtaUrl || "")}
              />
            </label>
          </div>

          {renderItemsAsTextarea(block.data.highlights, (nextItems) =>
            onChange(updateBlockData(form, blockIndex, "highlights", nextItems))
          )}
        </>
      );
    case "text":
      return (
        <>
          <div className="block-inline-grid">
            <label>
              Título
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "title", event.target.value))}
                value={String(block.data.title || "")}
              />
            </label>
            <label>
              Variante
              <select
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "variant", event.target.value))}
                value={String(block.data.variant || "default")}
              >
                <option value="default">Default</option>
                <option value="spotlight">Spotlight</option>
              </select>
            </label>
          </div>
          <label>
            Conteúdo
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "body", event.target.value))}
              value={String(block.data.body || "")}
            />
          </label>
        </>
      );
    case "image":
      return (
        <>
          <div className="block-inline-grid">
            <label>
              Título
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "title", event.target.value))}
                value={String(block.data.title || "")}
              />
            </label>
            <label>
              Layout
              <select
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "layout", event.target.value))}
                value={String(block.data.layout || "wide")}
              >
                <option value="wide">Wide</option>
                <option value="banner">Banner</option>
                <option value="portrait">Portrait</option>
              </select>
            </label>
          </div>
          <label>
            URL da imagem
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "url", event.target.value))}
              value={String(block.data.url || "")}
            />
          </label>
          <ImageUploadField
            buttonLabel="Upload da imagem"
            folder="about"
            onUploaded={(url) => onChange(updateBlockData(form, blockIndex, "url", url))}
          />
          <div className="block-inline-grid">
            <label>
              Alt
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
    case "stack": {
      const groups = toRecordArray(block.data.groups);

      return (
        <>
          <label>
            Título
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "title", event.target.value))}
              value={String(block.data.title || "")}
            />
          </label>
          <label>
            Descrição
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "description", event.target.value))}
              value={String(block.data.description || "")}
            />
          </label>
          {groups.map((group, groupIndex) => {
            const currentGroup = group;
            const items = Array.isArray(currentGroup.items)
              ? currentGroup.items.map((item) => String(item))
              : [];

            return (
              <div className="reference-item" key={`${block.id}-stack-group-${groupIndex}`}>
                <div className="block-card-header">
                  <strong>Grupo {groupIndex + 1}</strong>
                  <div className="block-actions">
                    <button
                      onClick={() =>
                        onChange(
                          updateStackGroups(form, blockIndex, (currentGroups) =>
                            currentGroups.filter((_, currentIndex) => currentIndex !== groupIndex)
                          )
                        )
                      }
                      type="button"
                    >
                      Remover grupo
                    </button>
                  </div>
                </div>
                <label>
                  Título do grupo
                  <input
                    onChange={(event) =>
                      onChange(
                        updateStackGroups(form, blockIndex, (currentGroups) =>
                          currentGroups.map((current, currentIndex) =>
                            currentIndex === groupIndex
                              ? { ...current, title: event.target.value }
                              : current
                          )
                        )
                      )
                    }
                    value={String(currentGroup.title || "")}
                  />
                </label>
                {items.map((item, itemIndex) => (
                  <div className="block-inline-grid" key={`${block.id}-stack-item-${groupIndex}-${itemIndex}`}>
                    <label>
                      Item {itemIndex + 1}
                      <input
                        onChange={(event) =>
                          onChange(
                            updateStackGroups(form, blockIndex, (currentGroups) =>
                              currentGroups.map((current, currentIndex) => {
                                if (currentIndex !== groupIndex) {
                                  return current;
                                }

                                const nextItems = Array.isArray(current.items)
                                  ? current.items.map((currentItem) => String(currentItem))
                                  : [];
                                nextItems[itemIndex] = event.target.value;

                                return { ...current, items: nextItems };
                              })
                            )
                          )
                        }
                        value={item}
                      />
                    </label>
                    <div className="block-actions">
                      <button
                        onClick={() =>
                          onChange(
                            updateStackGroups(form, blockIndex, (currentGroups) =>
                              currentGroups.map((current, currentIndex) => {
                                if (currentIndex !== groupIndex) {
                                  return current;
                                }

                                const nextItems = Array.isArray(current.items)
                                  ? current.items.map((currentItem) => String(currentItem))
                                  : [];

                                return {
                                  ...current,
                                  items: nextItems.filter((_, currentItemIndex) => currentItemIndex !== itemIndex),
                                };
                              })
                            )
                          )
                        }
                        type="button"
                      >
                        Remover item
                      </button>
                    </div>
                  </div>
                ))}
                <div className="block-actions">
                  <button
                    className="block-add-button"
                    onClick={() =>
                      onChange(
                        updateStackGroups(form, blockIndex, (currentGroups) =>
                          currentGroups.map((current, currentIndex) => {
                            if (currentIndex !== groupIndex) {
                              return current;
                            }

                            const nextItems = Array.isArray(current.items)
                              ? current.items.map((currentItem) => String(currentItem))
                              : [];

                            return { ...current, items: [...nextItems, ""] };
                          })
                        )
                      )
                    }
                    type="button"
                  >
                    Adicionar item
                  </button>
                </div>
              </div>
            );
          })}
          <button
            className="block-add-button"
            onClick={() =>
              onChange(
                updateStackGroups(form, blockIndex, (currentGroups) => [
                  ...currentGroups,
                  { items: [""], title: "" },
                ])
              )
            }
            type="button"
          >
            Adicionar grupo
          </button>
        </>
      );
    }
    case "social": {
      const items = Array.isArray(block.data.items) ? block.data.items : [];

      return (
        <>
          <label>
            Título
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "title", event.target.value))}
              value={String(block.data.title || "")}
            />
          </label>
          <label>
            Descrição
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "description", event.target.value))}
              value={String(block.data.description || "")}
            />
          </label>
          {items.map((item, itemIndex) => {
            const currentItem =
              item && typeof item === "object" ? (item as Record<string, unknown>) : {};

            return (
              <div className="reference-item" key={`${block.id}-social-item-${itemIndex}`}>
                <label>
                  Rótulo
                  <input
                    onChange={(event) => {
                      const nextItems = [...items];
                      nextItems[itemIndex] = { ...currentItem, label: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "items", nextItems));
                    }}
                    value={String(currentItem.label || "")}
                  />
                </label>
                <label>
                  Handle
                  <input
                    onChange={(event) => {
                      const nextItems = [...items];
                      nextItems[itemIndex] = { ...currentItem, handle: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "items", nextItems));
                    }}
                    value={String(currentItem.handle || "")}
                  />
                </label>
                <label>
                  URL
                  <input
                    onChange={(event) => {
                      const nextItems = [...items];
                      nextItems[itemIndex] = { ...currentItem, url: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "items", nextItems));
                    }}
                    value={String(currentItem.url || "")}
                  />
                </label>
                <label>
                  Ícone
                  <input
                    onChange={(event) => {
                      const nextItems = [...items];
                      nextItems[itemIndex] = { ...currentItem, iconUrl: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "items", nextItems));
                    }}
                    value={String(currentItem.iconUrl || "")}
                  />
                </label>
                <ImageUploadField
                  buttonLabel="Upload do icone"
                  folder="about"
                  onUploaded={(url) => {
                    const nextItems = [...items];
                    nextItems[itemIndex] = { ...currentItem, iconUrl: url };
                    onChange(updateBlockData(form, blockIndex, "items", nextItems));
                  }}
                />
              </div>
            );
          })}
          <button
            className="block-add-button"
            onClick={() =>
              onChange(
                updateBlockData(form, blockIndex, "items", [
                  ...items,
                  { handle: "", iconUrl: "", label: "", url: "" },
                ])
              )
            }
            type="button"
          >
            Adicionar rede
          </button>
        </>
      );
    }
    case "contact": {
      const items = Array.isArray(block.data.items) ? block.data.items : [];

      return (
        <>
          <label>
            Título
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "title", event.target.value))}
              value={String(block.data.title || "")}
            />
          </label>
          <label>
            Descrição
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "description", event.target.value))}
              value={String(block.data.description || "")}
            />
          </label>
          {items.map((item, itemIndex) => {
            const currentItem =
              item && typeof item === "object" ? (item as Record<string, unknown>) : {};

            return (
              <div className="reference-item" key={`${block.id}-contact-item-${itemIndex}`}>
                <label>
                  Rótulo
                  <input
                    onChange={(event) => {
                      const nextItems = [...items];
                      nextItems[itemIndex] = { ...currentItem, label: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "items", nextItems));
                    }}
                    value={String(currentItem.label || "")}
                  />
                </label>
                <label>
                  Valor
                  <input
                    onChange={(event) => {
                      const nextItems = [...items];
                      nextItems[itemIndex] = { ...currentItem, value: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "items", nextItems));
                    }}
                    value={String(currentItem.value || "")}
                  />
                </label>
                <label>
                  URL
                  <input
                    onChange={(event) => {
                      const nextItems = [...items];
                      nextItems[itemIndex] = { ...currentItem, url: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "items", nextItems));
                    }}
                    value={String(currentItem.url || "")}
                  />
                </label>
                <label>
                  Observação
                  <input
                    onChange={(event) => {
                      const nextItems = [...items];
                      nextItems[itemIndex] = { ...currentItem, note: event.target.value };
                      onChange(updateBlockData(form, blockIndex, "items", nextItems));
                    }}
                    value={String(currentItem.note || "")}
                  />
                </label>
              </div>
            );
          })}
          <button
            className="block-add-button"
            onClick={() =>
              onChange(
                updateBlockData(form, blockIndex, "items", [
                  ...items,
                  { label: "", note: "", url: "", value: "" },
                ])
              )
            }
            type="button"
          >
            Adicionar contato
          </button>
        </>
      );
    }
    case "contact-form":
      return (
        <>
          <label>
            Título
            <input
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "title", event.target.value))}
              value={String(block.data.title || "")}
            />
          </label>
          <label>
            Descrição
            <textarea
              onChange={(event) => onChange(updateBlockData(form, blockIndex, "description", event.target.value))}
              value={String(block.data.description || "")}
            />
          </label>
          <div className="block-inline-grid">
            <label>
              Rótulo nome
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "nameLabel", event.target.value))}
                value={String(block.data.nameLabel || "")}
              />
            </label>
            <label>
              Rótulo e-mail
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "emailLabel", event.target.value))}
                value={String(block.data.emailLabel || "")}
              />
            </label>
            <label>
              Rótulo assunto
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "subjectLabel", event.target.value))}
                value={String(block.data.subjectLabel || "")}
              />
            </label>
            <label>
              Rótulo mensagem
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "messageLabel", event.target.value))}
                value={String(block.data.messageLabel || "")}
              />
            </label>
            <label>
              Rótulo botão
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "submitLabel", event.target.value))}
                value={String(block.data.submitLabel || "")}
              />
            </label>
            <label>
              Mensagem de sucesso
              <input
                onChange={(event) => onChange(updateBlockData(form, blockIndex, "successMessage", event.target.value))}
                value={String(block.data.successMessage || "")}
              />
            </label>
          </div>
        </>
      );
    default:
      return null;
  }
};

export const AboutBlockEditorCard = ({
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
          onClick={() => onChange({ ...form, blocks: moveItem(form.blocks, blockIndex, -1) })}
          type="button"
        >
          Subir
        </button>
        <button
          onClick={() => onChange({ ...form, blocks: moveItem(form.blocks, blockIndex, 1) })}
          type="button"
        >
          Descer
        </button>
        <button
          onClick={() => onChange({ ...form, blocks: removeItem(form.blocks, blockIndex) })}
          type="button"
        >
          Remover
        </button>
      </div>
    </div>
    {renderBlockFields(block, blockIndex, form, onChange)}
  </BlockCardContainer>
);
