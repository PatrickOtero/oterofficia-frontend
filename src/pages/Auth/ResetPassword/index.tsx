import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { authApi } from "../../../features/auth/api/authApi";
import { AuthForm } from "../../../features/auth/components/AuthForm";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";

const ResetPasswordPageContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    overflow: auto;
`;

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
      setErrorMessage("O link informado esta incompleto.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas informadas nao coincidem.");
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
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Nao foi possivel redefinir a senha.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResetPasswordPageContainer>
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
              Depois da redefinicao, voce pode <Link to="/login">voltar ao login</Link>.
            </div>
          </>
        }
        isSubmitting={isSubmitting}
        onSubmit={() => void handleSubmit()}
        submitLabel="Atualizar senha"
        subtitle="Defina sua nova senha."
        title="Nova senha"
      />
    </ResetPasswordPageContainer>
  );
};
