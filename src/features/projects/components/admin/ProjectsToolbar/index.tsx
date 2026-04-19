import styled from "styled-components";
import { surfaceCardCss } from "../../../../studies/utils/styleMixins";

type ProjectsToolbarProps = {
  onCreate: () => void;
  onSearchChange: (value: string) => void;
  search: string;
};

const ProjectsToolbarContainer = styled.section`
    ${surfaceCardCss};

    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.2rem;
    padding: 1.8rem;

    input {
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

export const ProjectsToolbar = ({
  onCreate,
  onSearchChange,
  search,
}: ProjectsToolbarProps) => (
  <ProjectsToolbarContainer>
    <input
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Buscar projeto"
      value={search}
    />
    <button onClick={onCreate} type="button">
      Novo projeto
    </button>
  </ProjectsToolbarContainer>
);