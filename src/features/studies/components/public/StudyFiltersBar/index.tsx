import styled from "styled-components";
import { StudyFilterOptions } from "../../../types/study";
import { surfaceCardCss } from "../../../utils/styleMixins";

type StudyFiltersBarProps = {
  filters: {
    search: string;
    category: string;
    tag: string;
  };
  options: StudyFilterOptions;
  onChange: (nextFilters: { search: string; category: string; tag: string }) => void;
};

const StudyFiltersBarContainer = styled.section`
    ${surfaceCardCss};

    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1.2rem;
    padding: 1.8rem;

    input,
    select {
        width: 100%;
        min-height: 4.8rem;
        padding: 0 1.6rem;
        font-size: 1.4rem;
    }

    select {
        appearance: none;
        background:
            linear-gradient(180deg, rgba(18, 36, 49, 0.7) 0%, rgba(10, 19, 29, 0.72) 100%);
    }

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const StudyFiltersBar = ({ filters, options, onChange }: StudyFiltersBarProps) => (
  <StudyFiltersBarContainer>
    <input
      onChange={(event) => onChange({ ...filters, search: event.target.value })}
      placeholder="Buscar por título ou slug"
      value={filters.search}
    />

    <select
      onChange={(event) => onChange({ ...filters, category: event.target.value })}
      value={filters.category}
    >
      <option value="">Todas as categorias</option>
      {options.categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>

    <select
      onChange={(event) => onChange({ ...filters, tag: event.target.value })}
      value={filters.tag}
    >
      <option value="">Todas as tags</option>
      {options.tags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  </StudyFiltersBarContainer>
);
