import styled from "styled-components";
import { surfaceCardCss } from "../../../utils/styleMixins";

export const AdminMetricsStripContainer = styled.section`
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
