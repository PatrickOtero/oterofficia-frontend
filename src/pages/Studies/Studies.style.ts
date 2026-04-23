import styled from "styled-components";
import { contentPageShellCss } from "../../features/studies/utils/pageShells";

export const StudiesPageContainer = styled.section`
  ${contentPageShellCss};
  gap: 1.6rem;

  .studies-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.4rem;
  }

  @media (max-width: 960px) {
    .studies-grid {
      grid-template-columns: 1fr;
    }
  }
`;
