import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { authApi } from "../../../features/auth/api/authApi";
import { AuthForm } from "../../../features/auth/components/AuthForm";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";

const ForgotPasswordPageContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    overflow: auto;
`;

export const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/studies";
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await authApi.requestPasswordReset(email);
      setSuccessMessage(response.message);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Nao foi possivel solicitar a redefinicao.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ForgotPasswordPageContainer>
      <AuthForm
        errorMessage={errorMessage}
        fields={
          <>
            {successMessage ? (
              <FeedbackState description={successMessage} title="Verifique seu e-mail" variant="success" />
            ) : null}
            <input onChange={(event) => setEmail(event.target.value)} placeholder="E-mail" value={email} />
          </>
        }
        footer={
          <>
            <div>
              Lembrou a senha? <Link to={`/login?redirect=${encodeURIComponent(redirectPath)}`}>Voltar ao login</Link>
            </div>
          </>
        }
        isSubmitting={isSubmitting}
        onSubmit={() => void handleSubmit()}
        submitLabel="Enviar link"
        subtitle="Receba um link por e-mail."
        title="Recuperar acesso"
      />
    </ForgotPasswordPageContainer>
  );
};
