import type { AboutBlock } from "../../../types/about";
import { AboutActionLink } from "./AboutActionLink";
import { AboutContactForm } from "./AboutContactForm";
import { asRecord, initialsFromLabel } from "./aboutPageRenderer.utils";

type AboutContentBlockProps = {
  block: AboutBlock;
  interactive: boolean;
};

export const AboutContentBlock = ({ block, interactive }: AboutContentBlockProps) => {
  switch (block.type) {
    case "text":
      return (
        <section className={`about-text-grid ${String(block.data.variant || "default")}`}>
          {block.data.title ? <h2 className="about-card-title">{String(block.data.title)}</h2> : null}
          <p className="about-text-body">{String(block.data.body || "")}</p>
        </section>
      );
    case "image":
      return (
        <figure className={`about-image-card ${String(block.data.layout || "wide")}`}>
          {block.data.title ? <div className="about-image-caption">{String(block.data.title)}</div> : null}
          {block.data.url ? (
            <img alt={String(block.data.alt || "Imagem")} src={String(block.data.url)} />
          ) : (
            <div className="about-image-empty">Adicione uma imagem</div>
          )}
          {block.data.caption ? <figcaption className="about-image-caption">{String(block.data.caption)}</figcaption> : null}
        </figure>
      );
    case "stack":
      return (
        <section className="stack-grid">
          {block.data.title ? <span className="about-section-title">{String(block.data.title)}</span> : null}
          {block.data.description ? <p className="stack-description">{String(block.data.description)}</p> : null}
          <div className="stack-groups">
            {Array.isArray(block.data.groups)
              ? block.data.groups.map((group, index) => {
                  const currentGroup = asRecord(group);

                  return (
                    <div className="stack-group" key={`${block.id}-group-${index}`}>
                      <span className="stack-group-title">{String(currentGroup.title || "")}</span>
                      <div className="stack-items">
                        {Array.isArray(currentGroup.items)
                          ? currentGroup.items.map((item, itemIndex) => (
                              <span className="stack-pill" key={`${block.id}-${index}-${itemIndex}`}>
                                {String(item)}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </section>
      );
    case "social":
      return (
        <section className="social-section">
          {block.data.title ? <span className="about-section-title">{String(block.data.title)}</span> : null}
          {block.data.description ? <p className="social-description">{String(block.data.description)}</p> : null}
          <div className="social-grid">
            {Array.isArray(block.data.items)
              ? block.data.items.map((item, index) => {
                  const currentItem = asRecord(item);
                  const label = String(currentItem.label || "Rede");

                  return (
                    <AboutActionLink
                      className="social-card"
                      disabled={!interactive}
                      key={`${block.id}-social-${index}`}
                      url={String(currentItem.url || "") || undefined}
                    >
                      <span className="social-icon">
                        {currentItem.iconUrl ? (
                          <img alt={label} src={String(currentItem.iconUrl)} />
                        ) : (
                          initialsFromLabel(label)
                        )}
                      </span>
                      <span className="social-copy">
                        <strong className="social-label">{label}</strong>
                        {currentItem.handle ? <span className="social-handle">{String(currentItem.handle)}</span> : null}
                      </span>
                    </AboutActionLink>
                  );
                })
              : null}
          </div>
        </section>
      );
    case "contact":
      return (
        <section className="contact-section">
          {block.data.title ? <span className="about-section-title">{String(block.data.title)}</span> : null}
          {block.data.description ? <p className="contact-description">{String(block.data.description)}</p> : null}
          <div className="contact-grid">
            {Array.isArray(block.data.items)
              ? block.data.items.map((item, index) => {
                  const currentItem = asRecord(item);

                  return (
                    <AboutActionLink
                      className="contact-item"
                      disabled={!interactive}
                      key={`${block.id}-contact-${index}`}
                      url={String(currentItem.url || "") || undefined}
                    >
                      <span className="contact-copy">
                        <strong className="contact-label">{String(currentItem.label || "")}</strong>
                        <span className="contact-value">{String(currentItem.value || "")}</span>
                        {currentItem.note ? <span className="contact-note">{String(currentItem.note)}</span> : null}
                      </span>
                    </AboutActionLink>
                  );
                })
              : null}
          </div>
        </section>
      );
    case "contact-form":
      return <AboutContactForm block={block} interactive={interactive} />;
    default:
      return null;
  }
};
