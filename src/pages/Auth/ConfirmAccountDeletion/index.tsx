import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { authApi } from "../../../features/auth/api/authApi";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { authStorage } from "../../../features/auth/utils/authStorage";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";

const ConfirmAccountDeletionPageContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    overflow: auto;
`;

const ConfirmAccountDeletionPanel = styled.div`
    width: min(56rem, 100%);
`;

export const ConfirmAccountDeletionPage = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Confirmando a exclusao da conta.");

  useEffect(() => {
    const confirm = async () => {
      if (!token) {
        setStatus("error");
        setMessage("O link de confirmacao esta incompleto.");
        return;
      }

      try {
        const response = await authApi.confirmAccountDeletion(token);
        authStorage.clearToken();
        await refreshUser();
        setStatus("success");
        setMessage(response.message);
      } catch (error: any) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Nao foi possivel confirmar a exclusao.");
      }
    };

    void confirm();
  }, [refreshUser, token]);

  return (
    <ConfirmAccountDeletionPageContainer>
      <ConfirmAccountDeletionPanel>
        <FeedbackState
          description={message}
          title={status === "loading" ? "Excluindo conta" : status === "success" ? "Conta removida" : "Falha na exclusao"}
          variant={status === "success" ? "success" : status === "error" ? "error" : "info"}
        />
        {status !== "loading" ? (
          <div style={{ marginTop: "1.4rem" }}>
            <Link to="/">Voltar ao inicio</Link>
          </div>
        ) : null}
      </ConfirmAccountDeletionPanel>
    </ConfirmAccountDeletionPageContainer>
  );
};
