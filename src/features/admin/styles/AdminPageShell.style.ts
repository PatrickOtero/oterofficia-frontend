import styled from "styled-components";
import { contentPageShellCss } from "../../studies/utils/pageShells";

type AdminPageShellProps = {
  $gap?: string;
};

export const AdminPageShell = styled.section<AdminPageShellProps>`
  ${contentPageShellCss};
  gap: ${({ $gap = "1.6rem" }) => $gap};

  @media (max-width: 900px) {
    padding: 1.4rem;
  }
`;
