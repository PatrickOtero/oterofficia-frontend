import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useBotSceneActions } from "../../../hooks/useBotSceneActions";
import { useAuth } from "../hooks/useAuth";
import { FeedbackState } from "../../studies/components/shared/FeedbackState";

const ProtectedRouteNotice = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

type ProtectedRouteProps = {
  requireAdmin?: boolean;
};

export const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAdmin, isAuthenticated, isLoading } = useAuth();
  const { openAuthScene } = useBotSceneActions();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      openAuthScene();
    }
  }, [isAuthenticated, isLoading, openAuthScene]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`}
      />
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <ProtectedRouteNotice>
        <FeedbackState
          description="Esta conta não tem permissão para acessar o painel administrativo."
          title="Acesso restrito"
          variant="error"
        />
      </ProtectedRouteNotice>
    );
  }

  return <Outlet />;
};
