import styled from "styled-components";
import { surfaceCardCss } from "../../../utils/styleMixins";

type AdminFiltersBarProps = {
  filters: {
    search: string;
    status: "all" | "draft" | "published";
    category: string;
  };
  categories: string[];
  onChange: (nextFilters: { search: string; status: "all" | "draft" | "published"; category: string }) => void;
  onCreate: () => void;
};

const AdminFiltersBarContainer = styled.section`
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

export const AdminFiltersBar = ({
  categories,
  filters,
  onChange,
  onCreate,
}: AdminFiltersBarProps) => (
  <AdminFiltersBarContainer>
    <input
      onChange={(event) => onChange({ ...filters, search: event.target.value })}
      placeholder="Buscar por título ou slug"
      value={filters.search}
    />
    <select
      onChange={(event) =>
        onChange({
          ...filters,
          status: event.target.value as "all" | "draft" | "published",
        })
      }
      value={filters.status}
    >
      <option value="all">Todos os status</option>
      <option value="draft">Rascunhos</option>
      <option value="published">Publicados</option>
    </select>
    <select
      onChange={(event) => onChange({ ...filters, category: event.target.value })}
      value={filters.category}
    >
      <option value="">Todas as categorias</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
    <button onClick={onCreate} type="button">
      Novo estudo
    </button>
  </AdminFiltersBarContainer>
);
