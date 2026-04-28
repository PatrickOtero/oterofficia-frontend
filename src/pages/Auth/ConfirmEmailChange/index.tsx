import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi } from "../../../features/auth/api/authApi";
import { AuthSceneShell } from "../../../features/auth/components/AuthSceneShell";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { getApiErrorMessage } from "../../../services/apiError";

export const ConfirmEmailChangePage = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Validando a troca de e-mail.");

  useEffect(() => {
    const confirm = async () => {
      if (!token) {
        setStatus("error");
        setMessage("O link de confirmação está incompleto.");
        return;
      }

      try {
        const response = await authApi.confirmEmailChange(token);
        await refreshUser();
        setStatus("success");
        setMessage(response.message);
      } catch (error) {
        setStatus("error");
        setMessage(getApiErrorMessage(error, "Não foi possível confirmar o novo e-mail."));
      }
    };

    void confirm();
  }, [refreshUser, token]);

  return (
    <AuthSceneShell>
        <FeedbackState
          description={message}
          title={status === "loading" ? "Atualizando e-mail" : status === "success" ? "E-mail atualizado" : "Falha na confirmação"}
          variant={status === "success" ? "success" : status === "error" ? "error" : "info"}
        />
        {status !== "loading" ? (
          <div style={{ marginTop: "1.4rem" }}>
            <Link to="/profile">Voltar ao perfil</Link>
          </div>
        ) : null}
    </AuthSceneShell>
  );
};
