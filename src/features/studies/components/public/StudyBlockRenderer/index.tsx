import styled from "styled-components";
import { StudyBlock } from "../../../types/study";
import { surfaceCardCss } from "../../../utils/styleMixins";

type StudyBlockRendererProps = {
  blocks: StudyBlock[];
};

const BlockRendererContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .block-heading {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        line-height: 1.2;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .block-heading.level-1 {
        font-size: 3.8rem;
    }

    .block-heading.level-2 {
        font-size: 3rem;
    }

    .block-heading.level-3 {
        font-size: 2.4rem;
    }

    .block-heading.level-4 {
        font-size: 2rem;
    }

    .block-paragraph,
    .block-quote-text,
    .block-callout-text,
    .block-reference-description {
        color: rgba(var(--scene-accent-soft-rgb), 0.86);
        font-size: 1.75rem;
        line-height: 1.9;
        white-space: pre-wrap;
    }

    .block-image {
        ${surfaceCardCss};
        overflow: hidden;
    }

    .block-image img {
        width: 100%;
        max-height: 52rem;
        object-fit: cover;
    }

    .block-image figcaption {
        padding: 1.4rem 1.6rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.66);
        font-size: 1.35rem;
        line-height: 1.6;
    }

    .block-code {
        ${surfaceCardCss};
        padding: 1.8rem;
    }

    .block-code pre {
        overflow-x: auto;
        color: rgba(215, 244, 255, 0.9);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.35rem;
        line-height: 1.7;
    }

    .block-code-label {
        display: inline-flex;
        margin-bottom: 1.2rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.62);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .block-quote,
    .block-callout {
        ${surfaceCardCss};
        padding: 2rem 2.2rem;
    }

    .block-quote {
        border-left: 0.3rem solid rgba(var(--scene-accent-rgb), 0.34);
    }

    .block-callout-title,
    .block-quote-author,
    .block-reference-label {
        color: rgba(var(--scene-title-rgb), 0.94);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.18rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .block-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-left: 2rem;
    }

    .block-list li {
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
        font-size: 1.7rem;
        line-height: 1.8;
    }

    .block-divider {
        height: 0.1rem;
        border-radius: 999px;
        background: linear-gradient(
            90deg,
            rgba(var(--scene-accent-rgb), 0) 0%,
            rgba(var(--scene-accent-rgb), 0.42) 50%,
            rgba(var(--scene-accent-rgb), 0) 100%
        );
    }

    .block-divider.spacing-sm {
        margin: 0.8rem 0;
    }

    .block-divider.spacing-md {
        margin: 2rem 0;
    }

    .block-divider.spacing-lg {
        margin: 3.6rem 0;
    }

    .block-references {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    .block-reference-item {
        ${surfaceCardCss};
        padding: 1.6rem 1.8rem;
    }

    .block-reference-link {
        display: inline-flex;
        margin-top: 0.8rem;
        font-size: 1.3rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    @media (max-width: 900px) {
        .block-heading.level-1 {
            font-size: 2.9rem;
        }

        .block-heading.level-2 {
            font-size: 2.4rem;
        }

        .block-heading.level-3 {
            font-size: 2rem;
        }

        .block-paragraph,
        .block-quote-text,
        .block-callout-text,
        .block-reference-description,
        .block-list li {
            font-size: 1.55rem;
        }
    }
`;

const renderHeading = (block: StudyBlock) => {
  const level = String(block.data.level || "2");
  const text = String(block.data.text || "");

  return (
    <div className={`block-heading level-${level}`}>
      {text}
    </div>
  );
};

const renderList = (block: StudyBlock) => {
  const items = Array.isArray(block.data.items) ? block.data.items : [];
  const style = String(block.data.style || "unordered");
  const ListTag = style === "ordered" ? "ol" : "ul";

  return (
    <ListTag className="block-list">
      {items.map((item) => (
        <li key={`${block.id}-${String(item)}`}>{String(item)}</li>
      ))}
    </ListTag>
  );
};

export const StudyBlockRenderer = ({ blocks }: StudyBlockRendererProps) => (
  <BlockRendererContainer>
    {blocks.map((block, index) => {
      const blockKey = block.id || `${block.type}-${index}`;

      switch (block.type) {
        case "heading":
          return <div key={blockKey}>{renderHeading(block)}</div>;
        case "paragraph":
          return (
            <p className="block-paragraph" key={blockKey}>
              {String(block.data.text || "")}
            </p>
          );
        case "image":
          return (
            <figure className="block-image" key={blockKey}>
              <img alt={String(block.data.alt || "")} src={String(block.data.url || "")} />
              {block.data.caption ? <figcaption>{String(block.data.caption)}</figcaption> : null}
            </figure>
          );
        case "code":
          return (
            <div className="block-code" key={blockKey}>
              <span className="block-code-label">{String(block.data.language || "text")}</span>
              <pre>
                <code>{String(block.data.code || "")}</code>
              </pre>
            </div>
          );
        case "quote":
          return (
            <blockquote className="block-quote" key={blockKey}>
              <p className="block-quote-text">{String(block.data.text || "")}</p>
              {block.data.author ? (
                <span className="block-quote-author">{String(block.data.author)}</span>
              ) : null}
            </blockquote>
          );
        case "list":
          return <div key={blockKey}>{renderList(block)}</div>;
        case "divider":
          return (
            <div className={`block-divider spacing-${String(block.data.spacing || "md")}`} key={blockKey} />
          );
        case "callout":
          return (
            <div className="block-callout" key={blockKey}>
              {block.data.title ? (
                <span className="block-callout-title">{String(block.data.title)}</span>
              ) : null}
              <p className="block-callout-text">{String(block.data.text || "")}</p>
            </div>
          );
        case "references":
          return (
            <div className="block-references" key={blockKey}>
              {Array.isArray(block.data.links)
                ? block.data.links.map((link, referenceIndex) => {
                    const currentLink =
                      link && typeof link === "object" ? (link as Record<string, unknown>) : {};

                    return (
                      <div
                        className="block-reference-item"
                        key={`${blockKey}-${String(currentLink.label)}-${referenceIndex}`}
                      >
                        <div className="block-reference-label">{String(currentLink.label || "")}</div>
                        {currentLink.description ? (
                          <p className="block-reference-description">
                            {String(currentLink.description)}
                          </p>
                        ) : null}
                        <a
                          className="block-reference-link"
                          href={String(currentLink.url || "")}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Abrir referência
                        </a>
                      </div>
                    );
                  })
                : null}
            </div>
          );
        default:
          return null;
      }
    })}
  </BlockRendererContainer>
);
