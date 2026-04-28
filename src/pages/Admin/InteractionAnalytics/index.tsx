import { useEffect, useState } from "react";
import { AdminSectionTabs } from "../../../features/admin/components/AdminSectionTabs";
import { studiesApi } from "../../../features/studies/api/studiesApi";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { AdminInteractionAnalyticsData } from "../../../features/studies/types/study";
import { getApiErrorMessage } from "../../../services/apiError";
import { AdminInteractionAnalyticsContainer } from "./InteractionAnalytics.style";
import { initialAnalytics } from "./InteractionAnalytics.utils";
import { AdminInteractionAnalyticsView } from "./InteractionAnalyticsView";

export const AdminInteractionAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<AdminInteractionAnalyticsData>(initialAnalytics);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await studiesApi.fetchAdminInteractionAnalytics();
        setAnalytics(response);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Não foi possível carregar a telemetria de interação."));
      } finally {
        setIsLoading(false);
      }
    };

    void loadAnalytics();
  }, []);

  return (
    <AdminInteractionAnalyticsContainer>
      <AdminSectionTabs />

      {isLoading ? (
        <FeedbackState
          description="Os sinais de leitura, comentários e curtidas estão sendo agregados."
          title="Carregando analíticos"
        />
      ) : null}

      {!isLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha ao carregar analíticos" variant="error" />
      ) : null}

      {!isLoading && !errorMessage ? <AdminInteractionAnalyticsView analytics={analytics} /> : null}
    </AdminInteractionAnalyticsContainer>
  );
};
