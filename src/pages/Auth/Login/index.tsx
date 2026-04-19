import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { AuthForm } from "../../../features/auth/components/AuthForm";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { authApi } from "../../../features/auth/api/authApi";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";

const LoginPageContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    overflow: auto;
`;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, login } = useAuth();
  const redirectPath = useMemo(() => searchParams.get("redirect") || "/studies", [searchParams]);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isResendingVerification, setIsResendingVerification] = useState<boolean>(false);
  const [verificationMessage, setVerificationMessage] = useState<string>("");
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setVerificationMessage("");

    try {
      await login(form);
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      const nextMessage = error.response?.data?.message || "Nao foi possivel concluir o login.";
      const nextCode = error.response?.data?.code;

      setErrorMessage(nextMessage);

      if (nextCode === "email_not_verified") {
        setPendingVerificationEmail(form.email.trim().toLowerCase());
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    if (!pendingVerificationEmail) {
      return;
    }

    setIsResendingVerification(true);
    setVerificationMessage("");

    try {
      const response = await authApi.resendVerificationEmail(pendingVerificationEmail);
      setVerificationMessage(response.message);
    } catch (error: any) {
      setVerificationMessage(error.response?.data?.message || "Nao foi possivel reenviar a confirmacao.");
    } finally {
      setIsResendingVerification(false);
    }
  };

  return (
    <LoginPageContainer>
      <AuthForm
        errorMessage={errorMessage}
        fields={
          <>
            <input
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="E-mail"
              value={form.email}
            />
            <input
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Senha"
              type="password"
              value={form.password}
            />
            {pendingVerificationEmail ? (
              <button onClick={() => void handleResendVerification()} type="button">
                {isResendingVerification ? "Reenviando confirmacao" : "Reenviar confirmacao de e-mail"}
              </button>
            ) : null}
            {verificationMessage ? (
              <FeedbackState
                description={verificationMessage}
                title="Confirmacao de e-mail"
                variant="success"
              />
            ) : null}
          </>
        }
        footer={
          <>
            <div>
              Ainda nao tem conta?{" "}
              <Link to={`/register?redirect=${encodeURIComponent(redirectPath)}`}>Criar cadastro</Link>
            </div>
            <div>
              Esqueceu a senha?{" "}
              <Link to={`/forgot-password?redirect=${encodeURIComponent(redirectPath)}`}>Recuperar acesso</Link>
            </div>
          </>
        }
        isSubmitting={isSubmitting}
        onSubmit={() => void handleSubmit()}
        submitLabel="Entrar"
        subtitle="Entre para continuar."
        title="Login"
      />
    </LoginPageContainer>
  );
};
