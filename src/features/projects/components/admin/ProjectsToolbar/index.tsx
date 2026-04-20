import styled from "styled-components";
import { surfaceCardCss } from "../../../../studies/utils/styleMixins";

type ProjectsToolbarProps = {
  onCreate: () => void;
  onStatusChange: (value: string) => void;
  onTrackChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  search: string;
  status: string;
  track: string;
};

const ProjectsToolbarContainer = styled.section`
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

export const ProjectsToolbar = ({
  onCreate,
  onStatusChange,
  onTrackChange,
  onSearchChange,
  search,
  status,
  track,
}: ProjectsToolbarProps) => (
  <ProjectsToolbarContainer>
    <input
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Buscar projeto"
      value={search}
    />
    <select onChange={(event) => onStatusChange(event.target.value)} value={status}>
      <option value="all">Todos os status</option>
      <option value="completed">Concluídos</option>
      <option value="in_progress">Em progresso</option>
    </select>
    <select onChange={(event) => onTrackChange(event.target.value)} value={track}>
      <option value="all">Todas as trilhas</option>
      <option value="personal">Autorais</option>
      <option value="soujunior">SouJunior</option>
    </select>
    <button onClick={onCreate} type="button">
      Novo projeto
    </button>
  </ProjectsToolbarContainer>
);
