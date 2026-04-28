import type { AboutBlock } from "../../../types/about";
import { AboutActionLink } from "./AboutActionLink";

type AboutHeroBlockProps = {
  block: AboutBlock;
  interactive: boolean;
};

export const AboutHeroBlock = ({ block, interactive }: AboutHeroBlockProps) => (
  <section className="hero-card">
    <div className="hero-copy">
      {block.data.eyebrow ? <span className="hero-eyebrow">{String(block.data.eyebrow)}</span> : null}
      <h1 className="hero-title">{String(block.data.title || "Sobre mim")}</h1>
      {block.data.subtitle ? <p className="hero-subtitle">{String(block.data.subtitle)}</p> : null}
      {block.data.summary ? <p className="hero-summary">{String(block.data.summary)}</p> : null}

      <div className="hero-meta">
        {block.data.location ? <span className="meta-pill">{String(block.data.location)}</span> : null}
        {block.data.availability ? <span className="meta-pill">{String(block.data.availability)}</span> : null}
      </div>

      {Array.isArray(block.data.highlights) && block.data.highlights.length ? (
        <div className="hero-highlights">
          {block.data.highlights.map((item, index) => (
            <span className="meta-pill" key={`highlight-${index}-${String(item)}`}>
              {String(item)}
            </span>
          ))}
        </div>
      ) : null}

      <div className="hero-actions">
        {block.data.primaryCtaLabel ? (
          <AboutActionLink
            className="hero-action"
            disabled={!interactive}
            url={String(block.data.primaryCtaUrl || "") || undefined}
          >
            {String(block.data.primaryCtaLabel)}
          </AboutActionLink>
        ) : null}
        {block.data.secondaryCtaLabel ? (
          <AboutActionLink
            className="hero-action"
            disabled={!interactive}
            url={String(block.data.secondaryCtaUrl || "") || undefined}
          >
            {String(block.data.secondaryCtaLabel)}
          </AboutActionLink>
        ) : null}
      </div>
    </div>

    <div className="hero-media">
      {block.data.imageUrl ? (
        <img alt={String(block.data.imageAlt || block.data.title || "Perfil")} src={String(block.data.imageUrl)} />
      ) : (
        <div className="hero-media-empty">Adicione uma imagem</div>
      )}
    </div>
  </section>
);
