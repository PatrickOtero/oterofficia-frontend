import { Link } from "react-router-dom";
import styled from "styled-components";
import { surfaceCardCss } from "../../../utils/styleMixins";

type CommentComposerProps = {
  value: string;
  onChange: (nextValue: string) => void;
  onSubmit: () => void;
  onCancelReply?: () => void;
  isSubmitting?: boolean;
  isAuthenticated: boolean;
  redirectPath: string;
  replyTargetName?: string | null;
};

const CommentComposerContainer = styled.div`
    ${surfaceCardCss};

    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: 2rem;

    .composer-title {
        color: rgba(var(--scene-title-rgb), 0.96);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.4rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .reply-badge {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
        padding: 1rem 1.2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        border-radius: 1.4rem;
        background: rgba(var(--scene-accent-rgb), 0.06);
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-size: 1.28rem;
    }

    .reply-badge button,
    .composer-action {
        width: auto;
        min-width: 0;
        height: 4.2rem;
        padding: 0 1.8rem;
        font-size: 1.08rem;
    }

    textarea {
        min-height: 16rem;
        padding: 1.6rem;
        font-size: 1.5rem;
        line-height: 1.8;
        resize: vertical;
    }

    .composer-footer {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .composer-auth-text {
        color: rgba(var(--scene-accent-soft-rgb), 0.72);
        font-size: 1.4rem;
        line-height: 1.7;
    }

    .composer-auth-links {
        display: inline-flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
`;

export const CommentComposer = ({
  isAuthenticated,
  isSubmitting,
  onCancelReply,
  onChange,
  onSubmit,
  redirectPath,
  replyTargetName,
  value,
}: CommentComposerProps) => (
  <CommentComposerContainer>
    <div className="composer-title">Comentarios</div>

    {isAuthenticated ? (
      <>
        {replyTargetName ? (
          <div className="reply-badge">
            <span>Respondendo {replyTargetName}</span>
            {onCancelReply ? (
              <button onClick={onCancelReply} type="button">
                Cancelar resposta
              </button>
            ) : null}
          </div>
        ) : null}

        <textarea
          onChange={(event) => onChange(event.target.value)}
          placeholder={
            replyTargetName
              ? "Escreva sua resposta para continuar a conversa."
              : "Compartilhe uma observacao, uma duvida ou uma leitura complementar."
          }
          value={value}
        />
        <div className="composer-footer">
          <span className="composer-auth-text">Seu comentario fica vinculado ao seu perfil.</span>
          <button className="composer-action" onClick={onSubmit} type="button">
            {isSubmitting
              ? "Enviando"
              : replyTargetName
                ? "Publicar resposta"
                : "Publicar comentario"}
          </button>
        </div>
      </>
    ) : (
      <div className="composer-footer">
        <span className="composer-auth-text">
          Entre com sua conta para curtir e participar da discussao desta publicacao.
        </span>
        <div className="composer-auth-links">
          <Link to={`/login?redirect=${encodeURIComponent(redirectPath)}`}>Entrar</Link>
          <Link to={`/register?redirect=${encodeURIComponent(redirectPath)}`}>Criar conta</Link>
        </div>
      </div>
    )}
  </CommentComposerContainer>
);
