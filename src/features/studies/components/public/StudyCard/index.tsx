import { Link } from "react-router-dom";
import styled from "styled-components";
import { StudySummary } from "../../../types/study";
import { surfaceCardCss } from "../../../utils/styleMixins";

type StudyCardProps = {
  study: StudySummary;
};

const StudyCardLink = styled(Link)`
    ${surfaceCardCss};

    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow: hidden;
    text-decoration: none;
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;

    &:hover {
        transform: translate3d(0, -0.4rem, 0);
        border-color: rgba(var(--scene-accent-rgb), 0.22);
        box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.02),
            0 1.2rem 2rem rgba(0, 0, 0, 0.16);
    }

    .card-cover {
        position: relative;
        aspect-ratio: 16 / 9;
        background:
            linear-gradient(180deg, rgba(var(--scene-accent-rgb), 0.18) 0%, rgba(6, 16, 24, 0.2) 100%);
        background-size: cover;
        background-position: center;
        overflow: hidden;
    }

    .card-cover::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(180deg, rgba(4, 12, 18, 0.04) 0%, rgba(4, 12, 18, 0.5) 100%);
        transition: opacity 220ms ease;
    }

    &:hover .card-cover::after {
        opacity: 0.8;
    }

    .card-hover-label {
        position: absolute;
        right: 1.4rem;
        bottom: 1.4rem;
        z-index: 1;
        color: rgba(var(--scene-title-rgb), 0.94);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        opacity: 0;
        transform: translate3d(0, 0.4rem, 0);
        transition: opacity 220ms ease, transform 220ms ease;
    }

    &:hover .card-hover-label {
        opacity: 1;
        transform: translate3d(0, 0, 0);
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
`;

export const StudyCard = ({ study }: StudyCardProps) => (
  <StudyCardLink to={`/studies/${study.slug}`}>
    <div
      className="card-cover"
      style={
        study.coverImage
          ? {
              backgroundImage: `linear-gradient(180deg, rgba(6, 13, 22, 0.08), rgba(6, 13, 22, 0.54)), url(${study.coverImage})`,
            }
          : undefined
      }
    >
      <span className="card-hover-label">Ler publicação</span>
    </div>
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
      </div>
    </div>
  </StudyCardLink>
);
