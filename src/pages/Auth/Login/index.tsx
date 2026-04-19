import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { AuthForm } from "../../../features/auth/components/AuthForm";
import { useAuth } from "../../../features/auth/hooks/useAuth";

const LoginPageContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: auto;
`;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const redirectPath = searchParams.get("redirect") || "/studies";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await login(form);
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Não foi possível concluir o login.");
    } finally {
      setIsSubmitting(false);
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
          </>
        }
        footer={
          <>
            Ainda não tem conta? <Link to={`/register?redirect=${encodeURIComponent(redirectPath)}`}>Criar cadastro</Link>
          </>
        }
        isSubmitting={isSubmitting}
        onSubmit={() => void handleSubmit()}
        submitLabel="Entrar"
        subtitle="Acesse sua sessão para comentar, curtir publicações e entrar na área administrativa quando houver permissão."
        title="Login"
      />
    </LoginPageContainer>
  );
};
