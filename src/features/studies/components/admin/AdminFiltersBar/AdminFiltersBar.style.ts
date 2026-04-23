import styled from "styled-components";
import { surfaceCardCss } from "../../../utils/styleMixins";

export const AdminFiltersBarContainer = styled.section`
  ${surfaceCardCss};

  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
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
    font-size: 1.08rem;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;
