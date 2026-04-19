import styled from "styled-components";
import { orbitalPanelCss } from "../../../studies/utils/styleMixins";

type AuthFormProps = {
  title: string;
  subtitle: string;
  fields: React.ReactNode;
  submitLabel: string;
  onSubmit: () => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  footer?: React.ReactNode;
};

const AuthFormContainer = styled.section`
    ${orbitalPanelCss};

    max-width: 56rem;
    margin: 0 auto;
    padding: 3rem;

    display: flex;
    flex-direction: column;
    gap: 1.8rem;

    .auth-form-header {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    h2 {
        color: rgba(var(--scene-title-rgb), 0.98);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(2.8rem, 4vw, 3.8rem);
        line-height: 1.05;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    p {
        color: rgba(var(--scene-accent-soft-rgb), 0.78);
        font-size: 1.6rem;
        line-height: 1.8;
    }

    .auth-form-grid {
        display: grid;
        gap: 1.2rem;
    }

    input {
        width: 100%;
        min-height: 5rem;
        padding: 0 1.6rem;
        font-size: 1.5rem;
    }

    .auth-form-error {
        color: rgba(255, 138, 138, 0.96);
        font-size: 1.35rem;
        line-height: 1.6;
    }

    .auth-form-submit {
        width: 100%;
    }

    .auth-form-footer {
        color: rgba(var(--scene-accent-soft-rgb), 0.7);
        font-size: 1.35rem;
        line-height: 1.7;
    }
`;

export const AuthForm = ({
  errorMessage,
  fields,
  footer,
  isSubmitting,
  onSubmit,
  submitLabel,
  subtitle,
  title,
}: AuthFormProps) => (
  <AuthFormContainer>
    <div className="auth-form-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>

    <div className="auth-form-grid">{fields}</div>
    {errorMessage ? <div className="auth-form-error">{errorMessage}</div> : null}

    <button className="auth-form-submit" onClick={onSubmit} type="button">
      {isSubmitting ? "Processando" : submitLabel}
    </button>

    {footer ? <div className="auth-form-footer">{footer}</div> : null}
  </AuthFormContainer>
);
