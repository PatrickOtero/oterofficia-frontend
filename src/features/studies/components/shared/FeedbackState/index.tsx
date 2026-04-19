import styled from "styled-components";
import { surfaceCardCss } from "../../../utils/styleMixins";

type FeedbackStateProps = {
  title: string;
  description?: string;
  variant?: "error" | "info" | "success";
};

const accentByVariant = {
  error: "255, 110, 110",
  info: "122, 210, 222",
  success: "116, 221, 178",
} as const;

const FeedbackStateContainer = styled.div<{ $variant: keyof typeof accentByVariant }>`
    ${surfaceCardCss};

    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 2rem 2.2rem;
    border-color: rgba(${(props) => accentByVariant[props.$variant]}, 0.22);

    h3 {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.5rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    p {
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.4rem;
        line-height: 1.6;
    }
`;

export const FeedbackState = ({
  description,
  title,
  variant = "info",
}: FeedbackStateProps) => (
  <FeedbackStateContainer $variant={variant}>
    <h3>{title}</h3>
    {description ? <p>{description}</p> : null}
  </FeedbackStateContainer>
);
