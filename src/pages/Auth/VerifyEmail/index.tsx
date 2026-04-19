import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { authApi } from "../../../features/auth/api/authApi";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";

const VerifyEmailPageContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    overflow: auto;
`;

const VerifyEmailPanel = styled.div`
    width: min(56rem, 100%);
`;

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Validando o link de confirmacao.");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("O link de confirmacao esta incompleto.");
        return;
      }

      try {
        const response = await authApi.verifyEmail(token);
        setStatus("success");
        setMessage(response.message);
      } catch (error: any) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Nao foi possivel confirmar o e-mail.");
      }
    };

    void verify();
  }, [token]);

  return (
    <VerifyEmailPageContainer>
      <VerifyEmailPanel>
        <FeedbackState
          description={message}
          title={status === "loading" ? "Confirmando e-mail" : status === "success" ? "E-mail confirmado" : "Falha na confirmacao"}
          variant={status === "success" ? "success" : status === "error" ? "error" : "info"}
        />
        {status !== "loading" ? (
          <div style={{ marginTop: "1.4rem" }}>
            <Link to="/login">Ir para o login</Link>
          </div>
        ) : null}
      </VerifyEmailPanel>
    </VerifyEmailPageContainer>
  );
};
