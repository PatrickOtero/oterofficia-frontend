import styled from "styled-components";
import { surfaceCardCss } from "../../../utils/styleMixins";

export const AdminCommentsPanelContainer = styled.section`
  ${surfaceCardCss};

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.8rem;

  .panel-title {
    color: rgba(var(--scene-title-rgb), 0.96);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.3rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .comment-row {
    padding: 1.4rem;
    border-radius: 1.8rem;
    background: rgba(11, 22, 35, 0.52);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .comment-header strong {
    color: rgba(var(--scene-title-rgb), 0.95);
    font-size: 1.4rem;
  }

  .comment-header span,
  .comment-body {
    color: rgba(var(--scene-accent-soft-rgb), 0.76);
    font-size: 1.3rem;
    line-height: 1.7;
  }

  .comment-row button {
    width: fit-content;
    min-width: 0;
    height: 3.8rem;
    padding: 0 1.2rem;
    font-size: 0.94rem;
  }
`;
