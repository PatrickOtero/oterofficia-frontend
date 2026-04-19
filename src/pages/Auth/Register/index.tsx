import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { AuthForm } from "../../../features/auth/components/AuthForm";
import { useAuth } from "../../../features/auth/hooks/useAuth";

const RegisterPageContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: auto;
`;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, register } = useAuth();
  const [form, setForm] = useState({
    email: "",
    name: "",
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
      await register(form);
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Não foi possível concluir o cadastro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterPageContainer>
      <AuthForm
        errorMessage={errorMessage}
        fields={
          <>
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
          </>
        }
        footer={
          <>
            Já possui acesso? <Link to={`/login?redirect=${encodeURIComponent(redirectPath)}`}>Entrar</Link>
          </>
        }
        isSubmitting={isSubmitting}
        onSubmit={() => void handleSubmit()}
        submitLabel="Criar conta"
        subtitle="Seu cadastro habilita curtidas, comentários persistidos e as áreas protegidas compatíveis com o seu perfil."
        title="Cadastro"
      />
    </RegisterPageContainer>
  );
};
