import styled from "styled-components";
import { AdminPageShell } from "../../../features/admin/styles/AdminPageShell.style";
import { surfaceCardCss } from "../../../features/studies/utils/styleMixins";

export const AdminInteractionAnalyticsContainer = styled(AdminPageShell)`
  .analytics-hero {
    ${surfaceCardCss};
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(26rem, 0.7fr);
    gap: 1.6rem;
    padding: 2rem;
    overflow: hidden;
  }

  .analytics-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .analytics-eyebrow,
  .analytics-kicker {
    color: rgba(var(--scene-accent-soft-rgb), 0.72);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .analytics-title {
    color: rgba(var(--scene-title-rgb), 0.98);
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(2.4rem, 4vw, 4rem);
    line-height: 1.04;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .analytics-description {
    color: rgba(var(--scene-accent-soft-rgb), 0.8);
    font-size: 1.32rem;
    line-height: 1.8;
    max-width: 62rem;
  }

  .analytics-hero-highlight {
    position: relative;
    border-radius: 2.2rem;
    padding: 1.8rem;
    background:
      radial-gradient(circle at top right, rgba(118, 206, 255, 0.16), transparent 42%),
      linear-gradient(180deg, rgba(9, 26, 38, 0.92) 0%, rgba(8, 18, 28, 0.86) 100%);
    border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    justify-content: space-between;
  }

  .analytics-hero-highlight strong {
    color: rgba(var(--scene-title-rgb), 0.98);
    font-family: "IBM Plex Mono", monospace;
    font-size: clamp(3.2rem, 6vw, 5rem);
    letter-spacing: 0.06em;
  }

  .analytics-hero-highlight p {
    color: rgba(var(--scene-accent-soft-rgb), 0.78);
    font-size: 1.18rem;
    line-height: 1.7;
  }

  .analytics-metrics-grid,
  .analytics-ranking-grid {
    display: grid;
    gap: 1.2rem;
  }

  .analytics-metrics-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .analytics-ranking-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .analytics-metric-card,
  .analytics-panel-card,
  .analytics-ranking-card {
    ${surfaceCardCss};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .analytics-metric-card strong {
    color: rgba(var(--scene-title-rgb), 0.98);
    font-family: "IBM Plex Mono", monospace;
    font-size: 2.2rem;
    letter-spacing: 0.06em;
  }

  .analytics-metric-card span {
    color: rgba(var(--scene-accent-soft-rgb), 0.74);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.96rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .analytics-metric-card p {
    color: rgba(var(--scene-accent-soft-rgb), 0.72);
    font-size: 1.02rem;
    line-height: 1.6;
  }

  .analytics-detail-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(24rem, 0.8fr);
    gap: 1.2rem;
    align-items: start;
  }

  .analytics-panel-card h3,
  .analytics-ranking-card h3 {
    color: rgba(var(--scene-title-rgb), 0.96);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.22rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .analytics-panel-card p,
  .analytics-ranking-card p {
    color: rgba(var(--scene-accent-soft-rgb), 0.72);
    font-size: 1.05rem;
    line-height: 1.65;
  }

  .series-chart {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    gap: 1rem;
    align-items: end;
    min-height: 24rem;
  }

  .series-column {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
  }

  .series-bars {
    width: 100%;
    min-height: 20rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 0.44rem;
  }

  .series-bar {
    width: 1.25rem;
    border-radius: 999px 999px 0 0;
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .series-column:hover .series-bar {
    transform: translateY(-0.18rem);
  }

  .series-bar.reads {
    background: linear-gradient(180deg, rgba(125, 218, 255, 0.96) 0%, rgba(72, 148, 255, 0.78) 100%);
    box-shadow: 0 0 1rem rgba(112, 206, 255, 0.18);
  }

  .series-bar.comments {
    background: linear-gradient(180deg, rgba(188, 148, 255, 0.96) 0%, rgba(132, 82, 255, 0.72) 100%);
  }

  .series-bar.likes {
    background: linear-gradient(180deg, rgba(128, 255, 220, 0.94) 0%, rgba(42, 184, 168, 0.72) 100%);
  }

  .series-meta {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: center;
  }

  .series-meta strong {
    color: rgba(var(--scene-title-rgb), 0.96);
    font-size: 1rem;
  }

  .series-meta span {
    color: rgba(var(--scene-accent-soft-rgb), 0.66);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.84rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .mix-list,
  .ranking-list,
  .recent-activity-list {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .mix-item,
  .ranking-item,
  .recent-activity-item {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 1rem 1.1rem;
    border-radius: 1.6rem;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.1);
    background: rgba(10, 24, 37, 0.7);
  }

  .mix-header,
  .ranking-item-header,
  .recent-activity-item-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
  }

  .mix-header strong,
  .ranking-item-header strong,
  .recent-activity-item-header strong {
    color: rgba(var(--scene-title-rgb), 0.94);
    font-size: 1.02rem;
    line-height: 1.5;
  }

  .mix-header span,
  .ranking-item-header span,
  .recent-activity-item-header span {
    color: rgba(var(--scene-accent-soft-rgb), 0.68);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.9rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .mix-bar-track,
  .ranking-bar-track {
    width: 100%;
    height: 0.72rem;
    border-radius: 999px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.06);
  }

  .mix-bar-fill,
  .ranking-bar-fill {
    height: 100%;
    border-radius: 999px;
  }

  .mix-bar-fill {
    background: linear-gradient(90deg, rgba(123, 214, 255, 0.9) 0%, rgba(154, 110, 255, 0.72) 100%);
  }

  .ranking-bar-fill {
    background: linear-gradient(90deg, rgba(126, 214, 255, 0.94) 0%, rgba(61, 159, 255, 0.72) 100%);
  }

  .ranking-item-body {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 1rem;
    align-items: center;
  }

  .ranking-avatar {
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(circle at 30% 30%, rgba(218, 245, 255, 0.2), transparent 30%),
      linear-gradient(180deg, rgba(35, 65, 98, 0.84) 0%, rgba(11, 23, 38, 0.96) 100%);
    color: rgba(var(--scene-title-rgb), 0.96);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .ranking-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ranking-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .ranking-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .ranking-stat-pill {
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
    border: 1px solid rgba(var(--scene-accent-rgb), 0.12);
    background: rgba(var(--scene-accent-rgb), 0.06);
    color: rgba(var(--scene-accent-soft-rgb), 0.76);
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.82rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .recent-activity-item p {
    color: rgba(var(--scene-accent-soft-rgb), 0.76);
    font-size: 1rem;
    line-height: 1.65;
  }

  @media (max-width: 1200px) {
    .analytics-hero,
    .analytics-detail-grid,
    .analytics-ranking-grid {
      grid-template-columns: 1fr;
    }

    .analytics-metrics-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 900px) {
    .analytics-hero,
    .analytics-panel-card,
    .analytics-ranking-card,
    .analytics-metric-card {
      padding: 1.3rem;
    }

    .analytics-metrics-grid {
      grid-template-columns: 1fr;
    }
  }
`;
