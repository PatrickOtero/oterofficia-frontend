import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdminSectionTabs } from "../../../features/admin/components/AdminSectionTabs";
import { projectsApi } from "../../../features/projects/api/projectsApi";
import { ProjectRecord } from "../../../features/projects/types/project";
import { ProjectsTable } from "../../../features/projects/components/admin/ProjectsTable";
import { ProjectsToolbar } from "../../../features/projects/components/admin/ProjectsToolbar";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import {
  orbitalPanelCss,
  scrollableContentCss,
} from "../../../features/studies/utils/styleMixins";

const AdminProjectsDashboardContainer = styled.section`
    ${orbitalPanelCss};
    ${scrollableContentCss};

    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    height: 100%;
    padding: 2rem;
`;

export const AdminProjectsDashboardPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    track: "all",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await projectsApi.fetchProjects();
      setProjects(response);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setProjects([]);
      } else {
        setErrorMessage(error.response?.data?.message || "Nao foi possivel carregar os projetos.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !normalizedSearch.length ||
        `${project.project_name} ${project.project_desc} ${project.project_highlight || ""} ${
          project.organization_name || ""
        } ${project.project_role || ""} ${project.project_tags.join(" ")}`
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        filters.status === "all" || project.project_status === filters.status;

      const matchesTrack =
        filters.track === "all" || project.project_track === filters.track;

      return matchesSearch && matchesStatus && matchesTrack;
    });
  }, [filters, projects]);

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm("Excluir este projeto do portfolio?")) {
      return;
    }

    setPendingDeleteId(projectId);

    try {
      await projectsApi.deleteProject(projectId);
      await loadProjects();
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <AdminProjectsDashboardContainer>
      <AdminSectionTabs />

      {isLoading ? <FeedbackState title="Carregando painel" /> : null}

      {!isLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha ao carregar" variant="error" />
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <ProjectsToolbar
            onCreate={() => navigate("/admin/projects/new")}
            onSearchChange={(value) => setFilters((current) => ({ ...current, search: value }))}
            onStatusChange={(value) => setFilters((current) => ({ ...current, status: value }))}
            onTrackChange={(value) => setFilters((current) => ({ ...current, track: value }))}
            search={filters.search}
            status={filters.status}
            track={filters.track}
          />
          <ProjectsTable
            onDelete={(projectId) => void handleDeleteProject(projectId)}
            pendingDeleteId={pendingDeleteId}
            projects={filteredProjects}
          />
        </>
      ) : null}
    </AdminProjectsDashboardContainer>
  );
};
