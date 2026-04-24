import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { studiesApi } from "../../features/studies/api/studiesApi";
import { StudyCard } from "../../features/studies/components/public/StudyCard";
import { StudyFiltersBar } from "../../features/studies/components/public/StudyFiltersBar";
import { StudiesHero } from "../../features/studies/components/public/StudiesHero";
import { EmptyState } from "../../features/studies/components/shared/EmptyState";
import { FeedbackState } from "../../features/studies/components/shared/FeedbackState";
import { PublicStudiesResponse } from "../../features/studies/types/study";
import {
  orbitalPanelCss,
  scrollableContentCss,
} from "../../features/studies/utils/styleMixins";

const StudiesPageContainer = styled.section`
    ${orbitalPanelCss};
    ${scrollableContentCss};

    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    height: 100%;
    padding: 2rem;

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

const initialResponse: PublicStudiesResponse = {
  filters: {
    categories: [],
    tags: [],
  },
  posts: [],
};

export const StudiesPage = () => {
  const [data, setData] = useState<PublicStudiesResponse>(initialResponse);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    tag: "",
  });
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { category, tag } = filters;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 140);

    return () => window.clearTimeout(timeout);
  }, [filters.search]);

  useEffect(() => {
    const loadStudies = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await studiesApi.fetchPublicStudies({
          category,
          search: debouncedSearch,
          tag,
        });
        setData(response);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Não foi possível carregar os estudos.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadStudies();
  }, [category, debouncedSearch, tag]);

  const featuredPost = data.posts[0] || null;
  const listPosts = useMemo(
    () => (data.posts.length <= 1 ? data.posts : data.posts.slice(1)),
    [data.posts]
  );
  const summary = useMemo(
    () => ({
      totalCategories: data.filters.categories.length,
      totalPosts: data.posts.length,
      totalTags: data.filters.tags.length,
    }),
    [data]
  );

  return (
    <StudiesPageContainer>
      <StudiesHero featuredPost={featuredPost} summary={summary} />
      <StudyFiltersBar filters={filters} onChange={setFilters} options={data.filters} />

      {isLoading ? <FeedbackState title="Carregando" /> : null}

      {!isLoading && errorMessage ? (
        <FeedbackState
          description={errorMessage}
          title="Falha ao carregar"
          variant="error"
        />
      ) : null}

      {!isLoading && !errorMessage && !data.posts.length ? (
        <EmptyState title="Sem resultados" />
      ) : null}

      {!isLoading && !errorMessage && listPosts.length ? (
        <div className="studies-grid">
          {listPosts.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      ) : null}
    </StudiesPageContainer>
  );
};
