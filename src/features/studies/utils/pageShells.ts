import { css } from "styled-components";
import { orbitalPanelCss, scrollableContentCss } from "./styleMixins";

export const contentPageShellCss = css`
  ${orbitalPanelCss};
  ${scrollableContentCss};

  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;

  @media (max-width: 900px) {
    padding: 1.6rem;
  }
`;
