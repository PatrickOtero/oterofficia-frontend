import styled from "styled-components";
import { surfaceCardCss } from "../../../utils/styleMixins";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

const EmptyStateContainer = styled.div`
    ${surfaceCardCss};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;

    padding: 2.4rem;

    h3 {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.8rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    p {
        max-width: 52rem;
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.5rem;
        line-height: 1.7;
    }
`;

export const EmptyState = ({ action, description, title }: EmptyStateProps) => (
  <EmptyStateContainer>
    <h3>{title}</h3>
    {description ? <p>{description}</p> : null}
    {action}
  </EmptyStateContainer>
);