import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../../../../services/axios";
import { AboutBlock, AboutPage } from "../../../types/about";
import { orbitalPanelCss, surfaceCardCss } from "../../../../studies/utils/styleMixins";

type AboutPageRendererProps = {
  interactive?: boolean;
  page: AboutPage;
};

type ActionLinkProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  url?: string;
};

const AboutRendererContainer = styled.div<{ $preview: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .about-grid {
        display: grid;
        gap: 2rem;
    }

    .about-card {
        ${surfaceCardCss};
        padding: 2.2rem;
    }

    .about-card-title,
    .about-section-title,
    .hero-eyebrow,
    .contact-feedback {
        font-family: "IBM Plex Mono", monospace;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .hero-card {
        ${orbitalPanelCss};
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(24rem, 0.7fr);
        gap: 2rem;
        padding: 2.8rem;
    }

    .hero-copy {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
    }

    .hero-eyebrow,
    .about-section-title {
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-size: 1rem;
    }

    .hero-title {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(3.4rem, 5vw, 5.8rem);
        line-height: 1;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .hero-subtitle,
    .hero-summary,
    .about-text-body,
    .stack-description,
    .social-description,
    .contact-description,
    .contact-form-description {
        color: rgba(var(--scene-accent-soft-rgb), 0.82);
        font-size: 1.65rem;
        line-height: 1.8;
        white-space: pre-wrap;
    }

    .hero-meta,
    .hero-highlights,
    .stack-items,
    .social-grid,
    .contact-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.9rem;
    }

    .meta-pill,
    .stack-pill {
        padding: 0.75rem 1.1rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
        font-size: 1.04rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 0.6rem;
    }

    .hero-action,
    .social-card,
    .contact-item,
    .contact-form button {
        min-height: 4.6rem;
        border-radius: 1.6rem;
    }

    .hero-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 1.8rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        color: rgba(var(--scene-title-rgb), 0.94);
        background: rgba(10, 20, 32, 0.54);
        font-size: 1.1rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        cursor: pointer;
        transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
        pointer-events: ${(props) => (props.$preview ? "none" : "auto")};
    }

    .hero-action:hover,
    .social-card:hover,
    .contact-item:hover {
        transform: translateY(-0.18rem);
        border-color: rgba(var(--scene-accent-rgb), 0.26);
        background: rgba(var(--scene-accent-rgb), 0.08);
    }

    .hero-media {
        ${surfaceCardCss};
        overflow: hidden;
        min-height: 30rem;
    }

    .hero-media img,
    .about-image-card img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hero-media-empty,
    .about-image-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: inherit;
        color: rgba(var(--scene-accent-soft-rgb), 0.56);
        font-size: 1.25rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .about-text-grid,
    .stack-grid,
    .social-section,
    .contact-section,
    .contact-form {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        padding: 2.2rem;
    }

    .about-text-grid.spotlight {
        ${orbitalPanelCss};
    }

    .about-card-title {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-size: clamp(2rem, 3vw, 3rem);
        line-height: 1.15;
    }

    .about-image-card {
        ${surfaceCardCss};
        overflow: hidden;
    }

    .about-image-card.banner img {
        max-height: 34rem;
    }

    .about-image-card.wide img {
        max-height: 46rem;
    }

    .about-image-card.portrait img {
        max-height: 60rem;
        object-fit: contain;
        background: rgba(5, 12, 20, 0.8);
    }

    .about-image-caption {
        padding: 1.4rem 1.8rem 1.8rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.7);
        font-size: 1.35rem;
        line-height: 1.65;
    }

    .stack-groups {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        gap: 1.2rem;
    }

    .stack-group {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        padding: 1.8rem;
    }

    .stack-group-title,
    .social-label,
    .contact-label {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.05rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .social-grid,
    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        gap: 1rem;
    }

    .social-card,
    .contact-item {
        ${surfaceCardCss};
        display: flex;
        align-items: center;
        gap: 1.2rem;
        padding: 1.4rem 1.6rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
        transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
        pointer-events: ${(props) => (props.$preview ? "none" : "auto")};
    }

    .social-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 1.4rem;
        overflow: hidden;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-title-rgb), 0.92);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.2rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .social-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .social-copy,
    .contact-copy {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        min-width: 0;
    }

    .social-handle,
    .contact-note {
        color: rgba(var(--scene-accent-soft-rgb), 0.66);
        font-size: 1.2rem;
        line-height: 1.5;
    }

    .contact-value {
        color: rgba(var(--scene-title-rgb), 0.92);
        font-size: 1.5rem;
        line-height: 1.55;
        word-break: break-word;
    }

    .contact-form-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }

    .contact-form label {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.76);
        font-size: 1.12rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .contact-form input,
    .contact-form textarea {
        width: 100%;
        min-height: 4.8rem;
        padding: 1.4rem 1.5rem;
    }

    .contact-form textarea {
        min-height: 16rem;
        resize: vertical;
    }

    .contact-form .contact-form-full {
        grid-column: 1 / -1;
    }

    .contact-form button {
        width: fit-content;
        min-width: 18rem;
        padding: 0 1.8rem;
    }

    .contact-feedback {
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-size: 1rem;
    }

    .contact-feedback.error {
        color: rgba(255, 138, 138, 0.92);
    }

    .contact-feedback.success {
        color: rgba(140, 228, 184, 0.92);
    }

    @media (max-width: 1100px) {
        .hero-card,
        .contact-form-grid {
            grid-template-columns: 1fr;
        }

        .hero-media {
            min-height: 24rem;
        }
    }
`;

const initialsFromLabel = (label: string) =>
  label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const ActionLink = ({ children, className, disabled, url }: ActionLinkProps) => {
  if (!url || disabled) {
    return <span className={className}>{children}</span>;
  }

  if (url.startsWith("/")) {
    return (
      <Link className={className} to={url}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={url} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
};

const AboutContactForm = ({
  block,
  interactive,
}: {
  block: AboutBlock;
  interactive: boolean;
}) => {
  const [formState, setFormState] = useState({
    email: "",
    message: "",
    name: "",
    subject: "",
  });
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<"error" | "success">("success");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const labels = {
    description: String(block.data.description || ""),
    emailLabel: String(block.data.emailLabel || "Seu e-mail"),
    messageLabel: String(block.data.messageLabel || "Mensagem"),
    nameLabel: String(block.data.nameLabel || "Seu nome"),
    subjectLabel: String(block.data.subjectLabel || "Assunto"),
    submitLabel: String(block.data.submitLabel || "Enviar mensagem"),
    successMessage: String(block.data.successMessage || "Mensagem enviada com sucesso."),
    title: String(block.data.title || "Mensagem direta"),
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!interactive) {
      return;
    }

    setFeedback("");
    setIsSubmitting(true);

    try {
      await api.post("/receiveEmail", {
        email: formState.email,
        emailContent: formState.message,
        name: formState.name,
        subject: formState.subject,
      });

      setFeedback(labels.successMessage);
      setFeedbackType("success");
      setFormState({
        email: "",
        message: "",
        name: "",
        subject: "",
      });
    } catch (error: any) {
      setFeedback(error.response?.data?.message || "Não foi possível enviar a mensagem.");
      setFeedbackType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={(event) => void handleSubmit(event)}>
      {labels.title ? <span className="about-section-title">{labels.title}</span> : null}
      {labels.description ? <p className="contact-form-description">{labels.description}</p> : null}
      <div className="contact-form-grid">
        <label>
          {labels.nameLabel}
          <input
            disabled={!interactive || isSubmitting}
            onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
            value={formState.name}
          />
        </label>
        <label>
          {labels.emailLabel}
          <input
            disabled={!interactive || isSubmitting}
            onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
            type="email"
            value={formState.email}
          />
        </label>
        <label className="contact-form-full">
          {labels.subjectLabel}
          <input
            disabled={!interactive || isSubmitting}
            onChange={(event) => setFormState((current) => ({ ...current, subject: event.target.value }))}
            value={formState.subject}
          />
        </label>
        <label className="contact-form-full">
          {labels.messageLabel}
          <textarea
            disabled={!interactive || isSubmitting}
            onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
            value={formState.message}
          />
        </label>
      </div>
      {feedback ? <span className={`contact-feedback ${feedbackType}`}>{feedback}</span> : null}
      <button disabled={!interactive || isSubmitting} type="submit">
        {interactive ? (isSubmitting ? "Enviando" : labels.submitLabel) : "Prévia do formulário"}
      </button>
    </form>
  );
};

export const AboutPageRenderer = ({
  interactive = true,
  page,
}: AboutPageRendererProps) => {
  const heroBlock = page.blocks.find((block) => block.type === "hero");
  const orderedBlocks = useMemo(
    () => page.blocks.filter((block) => block.type !== "hero"),
    [page.blocks]
  );

  return (
    <AboutRendererContainer $preview={!interactive}>
      {heroBlock ? (
        <section className="hero-card">
          <div className="hero-copy">
            {heroBlock.data.eyebrow ? <span className="hero-eyebrow">{String(heroBlock.data.eyebrow)}</span> : null}
            <h1 className="hero-title">{String(heroBlock.data.title || "Sobre mim")}</h1>
            {heroBlock.data.subtitle ? <p className="hero-subtitle">{String(heroBlock.data.subtitle)}</p> : null}
            {heroBlock.data.summary ? <p className="hero-summary">{String(heroBlock.data.summary)}</p> : null}

            <div className="hero-meta">
              {heroBlock.data.location ? <span className="meta-pill">{String(heroBlock.data.location)}</span> : null}
              {heroBlock.data.availability ? (
                <span className="meta-pill">{String(heroBlock.data.availability)}</span>
              ) : null}
            </div>

            {Array.isArray(heroBlock.data.highlights) && heroBlock.data.highlights.length ? (
              <div className="hero-highlights">
                {heroBlock.data.highlights.map((item, index) => (
                  <span className="meta-pill" key={`highlight-${index}-${String(item)}`}>
                    {String(item)}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="hero-actions">
              {heroBlock.data.primaryCtaLabel ? (
                <ActionLink
                  className="hero-action"
                  disabled={!interactive}
                  url={String(heroBlock.data.primaryCtaUrl || "") || undefined}
                >
                  {String(heroBlock.data.primaryCtaLabel)}
                </ActionLink>
              ) : null}
              {heroBlock.data.secondaryCtaLabel ? (
                <ActionLink
                  className="hero-action"
                  disabled={!interactive}
                  url={String(heroBlock.data.secondaryCtaUrl || "") || undefined}
                >
                  {String(heroBlock.data.secondaryCtaLabel)}
                </ActionLink>
              ) : null}
            </div>
          </div>

          <div className="hero-media">
            {heroBlock.data.imageUrl ? (
              <img alt={String(heroBlock.data.imageAlt || heroBlock.data.title || "Perfil")} src={String(heroBlock.data.imageUrl)} />
            ) : (
              <div className="hero-media-empty">Adicione uma imagem</div>
            )}
          </div>
        </section>
      ) : null}

      <div className="about-grid">
        {orderedBlocks.map((block) => {
          switch (block.type) {
            case "text":
              return (
                <section
                  className={`about-text-grid ${String(block.data.variant || "default")}`}
                  key={block.id}
                >
                  {block.data.title ? <h2 className="about-card-title">{String(block.data.title)}</h2> : null}
                  <p className="about-text-body">{String(block.data.body || "")}</p>
                </section>
              );
            case "image":
              return (
                <figure className={`about-image-card ${String(block.data.layout || "wide")}`} key={block.id}>
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
                <section className="stack-grid" key={block.id}>
                  {block.data.title ? <span className="about-section-title">{String(block.data.title)}</span> : null}
                  {block.data.description ? (
                    <p className="stack-description">{String(block.data.description)}</p>
                  ) : null}
                  <div className="stack-groups">
                    {Array.isArray(block.data.groups)
                      ? block.data.groups.map((group, index) => {
                          const currentGroup =
                            group && typeof group === "object" ? (group as Record<string, unknown>) : {};

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
                <section className="social-section" key={block.id}>
                  {block.data.title ? <span className="about-section-title">{String(block.data.title)}</span> : null}
                  {block.data.description ? (
                    <p className="social-description">{String(block.data.description)}</p>
                  ) : null}
                  <div className="social-grid">
                    {Array.isArray(block.data.items)
                      ? block.data.items.map((item, index) => {
                          const currentItem =
                            item && typeof item === "object" ? (item as Record<string, unknown>) : {};
                          const label = String(currentItem.label || "Rede");

                          return (
                            <ActionLink
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
                                {currentItem.handle ? (
                                  <span className="social-handle">{String(currentItem.handle)}</span>
                                ) : null}
                              </span>
                            </ActionLink>
                          );
                        })
                      : null}
                  </div>
                </section>
              );
            case "contact":
              return (
                <section className="contact-section" key={block.id}>
                  {block.data.title ? <span className="about-section-title">{String(block.data.title)}</span> : null}
                  {block.data.description ? (
                    <p className="contact-description">{String(block.data.description)}</p>
                  ) : null}
                  <div className="contact-grid">
                    {Array.isArray(block.data.items)
                      ? block.data.items.map((item, index) => {
                          const currentItem =
                            item && typeof item === "object" ? (item as Record<string, unknown>) : {};

                          return (
                            <ActionLink
                              className="contact-item"
                              disabled={!interactive}
                              key={`${block.id}-contact-${index}`}
                              url={String(currentItem.url || "") || undefined}
                            >
                              <span className="contact-copy">
                                <strong className="contact-label">{String(currentItem.label || "")}</strong>
                                <span className="contact-value">{String(currentItem.value || "")}</span>
                                {currentItem.note ? (
                                  <span className="contact-note">{String(currentItem.note)}</span>
                                ) : null}
                              </span>
                            </ActionLink>
                          );
                        })
                      : null}
                  </div>
                </section>
              );
            case "contact-form":
              return <AboutContactForm block={block} interactive={interactive} key={block.id} />;
            default:
              return null;
          }
        })}
      </div>
    </AboutRendererContainer>
  );
};
