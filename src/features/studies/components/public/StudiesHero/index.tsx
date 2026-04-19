import { Link } from "react-router-dom";
import styled from "styled-components";
import { StudySummary } from "../../../types/study";
import { orbitalPanelCss, surfaceCardCss } from "../../../utils/styleMixins";

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
        min-height: 28rem;
        display: grid;
        grid-template-rows: minmax(15rem, 18rem) auto;
        overflow: hidden;
        text-decoration: none;
        transition: transform 220ms ease, border-color 220ms ease;
    }

    .hero-side:hover {
        transform: translate3d(0, -0.35rem, 0);
        border-color: rgba(var(--scene-accent-rgb), 0.22);
    }

    .hero-side-cover {
        position: relative;
        background:
            linear-gradient(180deg, rgba(8, 14, 22, 0.12) 0%, rgba(8, 14, 22, 0.62) 100%);
        background-position: center;
        background-size: cover;
    }

    .hero-side-cover::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(180deg, rgba(10, 18, 28, 0.02) 0%, rgba(10, 18, 28, 0.7) 100%);
    }

    .hero-side-content {
        padding: 2.2rem;
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

    .hero-featured-hint {
        color: rgba(var(--scene-title-rgb), 0.92);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
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

    {featuredPost ? (
      <Link className="hero-side" to={`/studies/${featuredPost.slug}`}>
        <div
          className="hero-side-cover"
          style={
            featuredPost.coverImage
              ? { backgroundImage: `url(${featuredPost.coverImage})` }
              : undefined
          }
        />
        <div className="hero-side-content">
          <div>
            <span className="hero-featured-label">Em destaque</span>
            <h3 className="hero-featured-title">{featuredPost.title}</h3>
          </div>
          <div className="hero-featured-meta">
            <span className="hero-featured-pill">{featuredPost.category}</span>
            <span className="hero-featured-pill">{featuredPost.readingTime} min</span>
            <span className="hero-featured-pill">{featuredPost.likesCount} curtidas</span>
          </div>
          <span className="hero-featured-hint">Clique para ler</span>
        </div>
      </Link>
    ) : (
      <div className="hero-side">
        <div className="hero-side-content">
          <span className="hero-featured-label">Status</span>
          <h3 className="hero-featured-title">Arquivo vazio</h3>
          <div className="hero-featured-meta">
            <span className="hero-featured-pill">0 itens</span>
          </div>
        </div>
      </div>
    )}
  </StudiesHeroContainer>
);
