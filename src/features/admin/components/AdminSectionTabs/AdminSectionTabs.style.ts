import styled from "styled-components";
import { surfaceCardCss } from "../../../studies/utils/styleMixins";

export const AdminSectionTabsContainer = styled.nav`
  ${surfaceCardCss};

  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  width: fit-content;

  .admin-tab-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 4rem;
    padding: 0 1.4rem;
    border-radius: 1.4rem;
    border: 1px solid transparent;
    color: rgba(var(--scene-accent-soft-rgb), 0.82);
    font-family: "IBM Plex Mono", monospace;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .admin-tab-link.active {
    border-color: rgba(var(--scene-accent-rgb), 0.18);
    background: rgba(var(--scene-accent-rgb), 0.08);
    color: rgba(var(--scene-title-rgb), 0.96);
  }

  @media (max-width: 900px) {
    width: 100%;
    justify-content: stretch;

    .admin-tab-link {
      flex: 1;
    }
  }
`;
