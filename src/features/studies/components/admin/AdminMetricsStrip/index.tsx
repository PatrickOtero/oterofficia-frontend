import styled from "styled-components";
import { StudyDashboardMetric } from "../../../types/study";
import { surfaceCardCss } from "../../../utils/styleMixins";

type AdminMetricsStripProps = {
  metrics: StudyDashboardMetric;
};

const AdminMetricsStripContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.2rem;

    .metric-card {
        ${surfaceCardCss};
        padding: 1.8rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .metric-label {
        color: rgba(var(--scene-accent-soft-rgb), 0.68);
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.98rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    .metric-value {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-size: 2.8rem;
        font-weight: 700;
    }

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const metricItems = [
  { key: "totalPosts", label: "Total de posts" },
  { key: "totalPublishedPosts", label: "Publicados" },
  { key: "totalDraftPosts", label: "Rascunhos" },
  { key: "totalLikes", label: "Curtidas" },
  { key: "totalComments", label: "Comentários" },
] as const;

export const AdminMetricsStrip = ({ metrics }: AdminMetricsStripProps) => (
  <AdminMetricsStripContainer>
    {metricItems.map((item) => (
      <div className="metric-card" key={item.key}>
        <span className="metric-label">{item.label}</span>
        <span className="metric-value">{metrics[item.key]}</span>
      </div>
    ))}
  </AdminMetricsStripContainer>
);
