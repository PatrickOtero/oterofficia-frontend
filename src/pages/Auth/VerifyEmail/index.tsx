import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi } from "../../../features/auth/api/authApi";
import { AuthSceneShell } from "../../../features/auth/components/AuthSceneShell";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { getApiErrorMessage } from "../../../services/apiError";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Validando o link de confirmação.");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("O link de confirmação está incompleto.");
        return;
      }

      try {
        const response = await authApi.verifyEmail(token);
        setStatus("success");
        setMessage(response.message);
      } catch (error) {
        setStatus("error");
        setMessage(getApiErrorMessage(error, "Não foi possível confirmar o e-mail."));
      }
    };

    void verify();
  }, [token]);

  return (
    <AuthSceneShell>
        <FeedbackState
          description={message}
          title={status === "loading" ? "Confirmando e-mail" : status === "success" ? "E-mail confirmado" : "Falha na confirmação"}
          variant={status === "success" ? "success" : status === "error" ? "error" : "info"}
        />
        {status !== "loading" ? (
          <div style={{ marginTop: "1.4rem" }}>
            <Link to="/login">Ir para o login</Link>
          </div>
        ) : null}
    </AuthSceneShell>
  );
};
