import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthForm } from "../../../features/auth/components/AuthForm";
import { authApi } from "../../../features/auth/api/authApi";
import { AuthSceneShell } from "../../../features/auth/components/AuthSceneShell";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { getApiErrorInfo } from "../../../services/apiError";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, register } = useAuth();
  const redirectPath = useMemo(() => searchParams.get("redirect") || "/studies", [searchParams]);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showVerificationAction, setShowVerificationAction] = useState<boolean>(false);
  const [isResendingVerification, setIsResendingVerification] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    setShowVerificationAction(false);

    try {
      const response = await register(form);
      setSuccessMessage(response.message);
      setShowVerificationAction(response.requiresEmailVerification);
    } catch (error: any) {
      const errorInfo = getApiErrorInfo(error, "Nao foi possivel concluir o cadastro.");
      setErrorMessage(errorInfo.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResendingVerification(true);
    setErrorMessage("");

    try {
      const response = await authApi.resendVerificationEmail(form.email);
      setSuccessMessage(response.message);
    } catch (error: any) {
      const errorInfo = getApiErrorInfo(error, "Nao foi possivel reenviar a confirmacao.");
      setErrorMessage(errorInfo.message);
    } finally {
      setIsResendingVerification(false);
    }
  };

  return (
    <AuthSceneShell>
      <AuthForm
        fields={
          <>
            {successMessage ? (
              <FeedbackState
                description={successMessage}
                title="Cadastro concluido"
                variant="success"
              />
            ) : null}
            {errorMessage ? (
              <FeedbackState
                description={errorMessage}
                title="Nao foi possivel concluir o cadastro"
                variant="error"
              />
            ) : null}
            <input
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Nome"
              value={form.name}
            />
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
            {showVerificationAction ? (
              <button onClick={() => void handleResendVerification()} type="button">
                {isResendingVerification ? "Reenviando confirmacao" : "Reenviar confirmacao"}
              </button>
            ) : null}
          </>
        }
        footer={
          <>
            <div>
              Ja tem acesso?{" "}
              <Link to={`/login?redirect=${encodeURIComponent(redirectPath)}`}>Entrar</Link>
            </div>
            <div>
              Depois da confirmacao, voce pode voltar para{" "}
              <Link to={redirectPath}>continuar navegando</Link>.
            </div>
          </>
        }
        isSubmitting={isSubmitting}
        onSubmit={() => void handleSubmit()}
        submitLabel="Criar conta"
        subtitle="Crie sua conta."
        title="Cadastro"
      />
    </AuthSceneShell>
  );
};
