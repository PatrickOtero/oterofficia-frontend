import { Link } from "react-router-dom";
import styled from "styled-components";
import { StudySummary } from "../../../types/study";
import { surfaceCardCss } from "../../../utils/styleMixins";

type StudyCardProps = {
  study: StudySummary;
};

const StudyCardContainer = styled.article`
    ${surfaceCardCss};

    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;

    .card-cover {
        aspect-ratio: 16 / 9;
        background:
            linear-gradient(180deg, rgba(var(--scene-accent-rgb), 0.18) 0%, rgba(6, 16, 24, 0.2) 100%);
        background-size: cover;
        background-position: center;
    }

    .card-body {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 1.4rem;
        padding: 2rem;
    }

    .card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .card-pill {
        padding: 0.6rem 1rem;
        border-radius: 999px;
        background: rgba(var(--scene-accent-rgb), 0.08);
        border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.05rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    h3 {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-size: 2.2rem;
        line-height: 1.3;
    }

    p {
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.5rem;
        line-height: 1.7;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-top: auto;
    }

    .card-link {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.15rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }
`;

export const StudyCard = ({ study }: StudyCardProps) => (
  <StudyCardContainer>
    <div
      className="card-cover"
      style={
        study.coverImage
          ? {
              backgroundImage: `linear-gradient(180deg, rgba(6, 13, 22, 0.1), rgba(6, 13, 22, 0.6)), url(${study.coverImage})`,
            }
          : undefined
      }
    />
    <div className="card-body">
      <div className="card-meta">
        <span className="card-pill">{study.category}</span>
        <span className="card-pill">{study.readingTime} min</span>
        <span className="card-pill">{study.commentsCount} comentários</span>
      </div>
      <h3>{study.title}</h3>
      <p>{study.excerpt}</p>
      <div className="card-footer">
        <div className="card-meta">
          {study.tags.slice(0, 3).map((tag) => (
            <span className="card-pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <Link className="card-link" to={`/studies/${study.slug}`}>
          Abrir
        </Link>
      </div>
    </div>
  </StudyCardContainer>
);
