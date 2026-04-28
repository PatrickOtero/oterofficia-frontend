import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authApi } from "../../../features/auth/api/authApi";
import { AuthForm } from "../../../features/auth/components/AuthForm";
import { AuthSceneShell } from "../../../features/auth/components/AuthSceneShell";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { getApiErrorMessage } from "../../../services/apiError";

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!token) {
      setErrorMessage("O link informado está incompleto.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas informadas não coincidem.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await authApi.resetPassword({ password, token });
      setSuccessMessage(response.message);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Não foi possível redefinir a senha."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthSceneShell>
      <AuthForm
        errorMessage={errorMessage}
        fields={
          <>
            {successMessage ? (
              <FeedbackState description={successMessage} title="Senha atualizada" variant="success" />
            ) : null}
            <input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Nova senha"
              type="password"
              value={password}
            />
            <input
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirmar nova senha"
              type="password"
              value={confirmPassword}
            />
          </>
        }
        footer={
          <>
            <div>
              Depois da redefinição, você pode <Link to="/login">voltar ao login</Link>.
            </div>
          </>
        }
        isSubmitting={isSubmitting}
        onSubmit={() => void handleSubmit()}
        submitLabel="Atualizar senha"
        subtitle="Defina sua nova senha."
        title="Nova senha"
      />
    </AuthSceneShell>
  );
};
