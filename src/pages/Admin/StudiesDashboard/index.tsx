import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdminSectionTabs } from "../../../features/admin/components/AdminSectionTabs";
import { studiesApi } from "../../../features/studies/api/studiesApi";
import { AdminCommentsPanel } from "../../../features/studies/components/admin/AdminCommentsPanel";
import { AdminFiltersBar } from "../../../features/studies/components/admin/AdminFiltersBar";
import { AdminMetricsStrip } from "../../../features/studies/components/admin/AdminMetricsStrip";
import { StudiesTable } from "../../../features/studies/components/admin/StudiesTable";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { StudyComment, StudyDashboardData, StudySummary } from "../../../features/studies/types/study";
import {
  orbitalPanelCss,
  scrollableContentCss,
} from "../../../features/studies/utils/styleMixins";

const AdminStudiesDashboardContainer = styled.section`
    ${orbitalPanelCss};
    ${scrollableContentCss};

    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    height: 100%;
    padding: 2rem;
`;

const initialDashboard: StudyDashboardData = {
  metrics: {
    totalComments: 0,
    totalDraftPosts: 0,
    totalLikes: 0,
    totalPosts: 0,
    totalPublishedPosts: 0,
  },
  recentComments: [],
  recentPosts: [],
};

export const AdminStudiesDashboardPage = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<StudyDashboardData>(initialDashboard);
  const [studies, setStudies] = useState<StudySummary[]>([]);
  const [comments, setComments] = useState<StudyComment[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    status: "all" as "all" | "draft" | "published",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const [dashboardResponse, studiesResponse, commentsResponse] = await Promise.all([
        studiesApi.fetchAdminDashboard(),
        studiesApi.fetchAdminStudies(filters),
        studiesApi.fetchAdminComments(),
      ]);

      setDashboard(dashboardResponse);
      setStudies(studiesResponse);
      setComments(commentsResponse);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Nao foi possivel carregar o painel de estudos.");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadDashboardData();
  }, [loadDashboardData]);

  const categories = useMemo(
    () =>
      Array.from(new Set([...studies.map((study) => study.category), ...dashboard.recentPosts.map((study) => study.category)])).sort(),
    [dashboard.recentPosts, studies]
  );

  const handleDeleteStudy = async (postId: string) => {
    if (!window.confirm("Confirma a exclusao definitiva desta postagem?")) {
      return;
    }

    setPendingDeleteId(postId);

    try {
      await studiesApi.deleteStudy(postId);
      await loadDashboardData();
    } finally {
      setPendingDeleteId(null);
    }
  };

  const handleToggleStatus = async (study: StudySummary) => {
    setPendingStatusId(study.id);

    try {
      await studiesApi.setStudyStatus(
        study.id,
        study.status === "published" ? "draft" : "published"
      );
      await loadDashboardData();
    } finally {
      setPendingStatusId(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Remover este comentario do historico publico?")) {
      return;
    }

    setDeletingCommentId(commentId);

    try {
      await studiesApi.deleteComment(commentId, true);
      await loadDashboardData();
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <AdminStudiesDashboardContainer>
      <AdminSectionTabs />

      {isLoading ? (
        <FeedbackState description="Os dados do painel estao sendo agregados." title="Carregando painel" />
      ) : null}

      {!isLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha ao carregar o painel" variant="error" />
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <AdminMetricsStrip metrics={dashboard.metrics} />
          <AdminFiltersBar
            categories={categories}
            filters={filters}
            onChange={setFilters}
            onCreate={() => navigate("/admin/studies/new")}
          />
          <StudiesTable
            onDelete={(postId) => void handleDeleteStudy(postId)}
            onToggleStatus={(study) => void handleToggleStatus(study)}
            pendingDeleteId={pendingDeleteId}
            pendingStatusId={pendingStatusId}
            studies={studies}
          />
          <AdminCommentsPanel
            comments={comments}
            deletingCommentId={deletingCommentId}
            onDelete={(commentId) => void handleDeleteComment(commentId)}
          />
        </>
      ) : null}
    </AdminStudiesDashboardContainer>
  );
};