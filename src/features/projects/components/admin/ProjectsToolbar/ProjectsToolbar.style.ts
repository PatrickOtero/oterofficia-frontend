import styled from "styled-components";
import { surfaceCardCss } from "../../../../studies/utils/styleMixins";

export const ProjectsToolbarContainer = styled.section`
  ${surfaceCardCss};

  display: grid;
  grid-template-columns: 1fr 18rem 18rem auto;
  gap: 1.2rem;
  padding: 1.8rem;

  input,
  select {
    width: 100%;
    min-height: 4.8rem;
    padding: 0 1.6rem;
    font-size: 1.4rem;
  }

  button {
    width: auto;
    min-width: 0;
    min-height: 4.8rem;
    padding: 0 1.8rem;
    font-size: 1.02rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
