import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSectionTabs } from "../../../features/admin/components/AdminSectionTabs";
import { AdminPageShell } from "../../../features/admin/styles/AdminPageShell.style";
import { studiesApi } from "../../../features/studies/api/studiesApi";
import { AdminCommentsPanel } from "../../../features/studies/components/admin/AdminCommentsPanel";
import { AdminFiltersBar } from "../../../features/studies/components/admin/AdminFiltersBar";
import { AdminMetricsStrip } from "../../../features/studies/components/admin/AdminMetricsStrip";
import { StudiesTable } from "../../../features/studies/components/admin/StudiesTable";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { StudyComment, StudyDashboardData, StudySummary } from "../../../features/studies/types/study";
import { getApiErrorMessage } from "../../../services/apiError";

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
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isStudiesLoading, setIsStudiesLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const { category, status } = filters;

  const loadOverview = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const [dashboardResponse, commentsResponse] = await Promise.all([
        studiesApi.fetchAdminDashboard(),
        studiesApi.fetchAdminComments(),
      ]);

      setDashboard(dashboardResponse);
      setComments(commentsResponse);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Não foi possível carregar o painel de estudos."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 140);

    return () => window.clearTimeout(timeout);
  }, [filters.search]);

  const loadStudies = useCallback(async () => {
    setIsStudiesLoading(true);
    setErrorMessage("");

    try {
      const studiesResponse = await studiesApi.fetchAdminStudies({
        category,
        search: debouncedSearch,
        status,
      });
      setStudies(studiesResponse);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Não foi possível carregar a lista de estudos."));
    } finally {
      setIsStudiesLoading(false);
    }
  }, [category, debouncedSearch, status]);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    void loadStudies();
  }, [loadStudies]);

  const categories = useMemo(
    () =>
      Array.from(new Set([...studies.map((study) => study.category), ...dashboard.recentPosts.map((study) => study.category)])).sort(),
    [dashboard.recentPosts, studies]
  );

  const handleDeleteStudy = async (postId: string) => {
    if (!window.confirm("Confirma a exclusão definitiva desta postagem?")) {
      return;
    }

    setPendingDeleteId(postId);

    try {
      await studiesApi.deleteStudy(postId);
      await Promise.all([loadStudies(), loadOverview()]);
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
      await Promise.all([loadStudies(), loadOverview()]);
    } finally {
      setPendingStatusId(null);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Remover este comentário do histórico público?")) {
      return;
    }

    setDeletingCommentId(commentId);

    try {
      await studiesApi.deleteComment(commentId, true);
      await loadOverview();
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <AdminPageShell>
      <AdminSectionTabs />

      {(isLoading || isStudiesLoading) ? (
        <FeedbackState description="Os dados do painel estão sendo agregados." title="Carregando painel" />
      ) : null}

      {!isLoading && !isStudiesLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha ao carregar o painel" variant="error" />
      ) : null}

      {!isLoading && !isStudiesLoading && !errorMessage ? (
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
    </AdminPageShell>
  );
};
