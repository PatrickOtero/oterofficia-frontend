import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi } from "../../../features/auth/api/authApi";
import { AuthSceneShell } from "../../../features/auth/components/AuthSceneShell";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";

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
        setMessage("O link de confirmacao esta incompleto.");
        return;
      }

      try {
        const response = await authApi.confirmEmailChange(token);
        await refreshUser();
        setStatus("success");
        setMessage(response.message);
      } catch (error: any) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Nao foi possivel confirmar o novo e-mail.");
      }
    };

    void confirm();
  }, [refreshUser, token]);

  return (
    <AuthSceneShell>
        <FeedbackState
          description={message}
          title={status === "loading" ? "Atualizando e-mail" : status === "success" ? "E-mail atualizado" : "Falha na confirmacao"}
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
