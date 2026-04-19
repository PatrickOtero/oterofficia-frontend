import styled from "styled-components";
import { StudySummary } from "../../../types/study";
import { orbitalPanelCss, subtleButtonCss, surfaceCardCss } from "../../../utils/styleMixins";
import { Link } from "react-router-dom";

type StudiesHeroProps = {
  featuredPost?: StudySummary | null;
  summary: {
    totalCategories: number;
    totalPosts: number;
    totalTags: number;
  };
};

const StudiesHeroContainer = styled.section`
    ${orbitalPanelCss};

    position: relative;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 2.4rem;
    padding: 3rem;

    .hero-copy {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
    }

    .hero-kicker {
        color: rgba(var(--scene-accent-soft-rgb), 0.68);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
    }

    h2 {
        max-width: 62rem;
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(3rem, 4vw, 4.8rem);
        line-height: 1.02;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .hero-summary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .hero-side {
        ${surfaceCardCss};
        padding: 2.2rem;
        min-height: 28rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2rem;
        background:
            linear-gradient(180deg, rgba(13, 25, 39, 0.82) 0%, rgba(8, 17, 27, 0.76) 100%);
    }

    .hero-featured-label {
        color: rgba(var(--scene-accent-soft-rgb), 0.66);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.98rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .hero-featured-title {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-size: 2.2rem;
        font-weight: 700;
        line-height: 1.3;
    }

    .hero-featured-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .hero-featured-pill {
        padding: 0.7rem 1.1rem;
        border-radius: 999px;
        background: rgba(var(--scene-accent-rgb), 0.08);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        color: rgba(var(--scene-accent-soft-rgb), 0.82);
        font-size: 1.1rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    .hero-action {
        ${subtleButtonCss};
    }

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        padding: 2.2rem;
    }
`;

export const StudiesHero = ({ featuredPost, summary }: StudiesHeroProps) => (
  <StudiesHeroContainer>
    <div className="hero-copy">
      <span className="hero-kicker">Estudos</span>
      <h2>Arquivo tecnico</h2>
      <div className="hero-summary">
        <span className="hero-featured-pill">{summary.totalPosts} itens</span>
        <span className="hero-featured-pill">{summary.totalCategories} categorias</span>
        <span className="hero-featured-pill">{summary.totalTags} tags</span>
      </div>
    </div>

    <div className="hero-side">
      {featuredPost ? (
        <>
          <div>
            <span className="hero-featured-label">Em destaque</span>
            <h3 className="hero-featured-title">{featuredPost.title}</h3>
          </div>
          <div className="hero-featured-meta">
            <span className="hero-featured-pill">{featuredPost.category}</span>
            <span className="hero-featured-pill">{featuredPost.readingTime} min</span>
            <span className="hero-featured-pill">{featuredPost.likesCount} curtidas</span>
          </div>
          <Link to={`/studies/${featuredPost.slug}`}>
            <button className="hero-action" type="button">
              Abrir
            </button>
          </Link>
        </>
      ) : (
        <>
          <span className="hero-featured-label">Status</span>
          <h3 className="hero-featured-title">Arquivo vazio</h3>
          <div className="hero-featured-meta">
            <span className="hero-featured-pill">0 itens</span>
          </div>
        </>
      )}
    </div>
  </StudiesHeroContainer>
);