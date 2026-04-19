import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { studiesApi } from "../../features/studies/api/studiesApi";
import { CommentComposer } from "../../features/studies/components/public/CommentComposer";
import { CommentList } from "../../features/studies/components/public/CommentList";
import { StudyBlockRenderer } from "../../features/studies/components/public/StudyBlockRenderer";
import { FeedbackState } from "../../features/studies/components/shared/FeedbackState";
import { StudyComment, StudyDetail } from "../../features/studies/types/study";
import {
  orbitalPanelCss,
  scrollableContentCss,
  surfaceCardCss,
} from "../../features/studies/utils/styleMixins";

const StudyPostPageContainer = styled.section`
    ${orbitalPanelCss};
    ${scrollableContentCss};

    display: grid;
    grid-template-columns: 1.35fr 0.65fr;
    gap: 1.6rem;
    height: 100%;
    padding: 2rem;

    .post-main,
    .post-sidebar {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
    }

    .post-cover {
        ${surfaceCardCss};
        overflow: hidden;
    }

    .post-cover img {
        width: 100%;
        max-height: 44rem;
        object-fit: cover;
    }

    .post-header {
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
    }

    .post-title {
        color: rgba(var(--scene-title-rgb), 0.99);
        font-family: "IBM Plex Mono", monospace;
        font-size: clamp(3rem, 4vw, 4.8rem);
        line-height: 1.05;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .post-excerpt {
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-size: 1.75rem;
        line-height: 1.9;
    }

    .meta-strip {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .meta-pill,
    .interaction-card button {
        font-size: 1.08rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .meta-pill {
        padding: 0.8rem 1.1rem;
        border-radius: 999px;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.14);
        background: rgba(var(--scene-accent-rgb), 0.08);
        color: rgba(var(--scene-accent-soft-rgb), 0.84);
    }

    .content-card,
    .interaction-card {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        padding: 1.8rem;
    }

    .interaction-card-title {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.2rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .interaction-card p {
        color: rgba(var(--scene-accent-soft-rgb), 0.74);
        font-size: 1.45rem;
        line-height: 1.7;
    }

    .interaction-card button {
        width: 100%;
        min-width: 0;
        height: 4.4rem;
    }

    .interaction-note {
        color: rgba(var(--scene-accent-soft-rgb), 0.7);
        font-size: 1.25rem;
        line-height: 1.7;
    }

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const StudyPostPage = () => {
  const navigate = useNavigate();
  const { slug = "" } = useParams();
  const { isAuthenticated } = useAuth();
  const [study, setStudy] = useState<StudyDetail | null>(null);
  const [comments, setComments] = useState<StudyComment[]>([]);
  const [commentValue, setCommentValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [isTogglingLike, setIsTogglingLike] = useState<boolean>(false);
  const [commentFeedback, setCommentFeedback] = useState<string>("");
  const [likeFeedback, setLikeFeedback] = useState<string>("");

  useEffect(() => {
    const loadStudy = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const post = await studiesApi.fetchStudyBySlug(slug);
        setStudy(post);

        const studyComments = await studiesApi.fetchComments(post.id);
        setComments(studyComments);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Não foi possível carregar esta leitura.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadStudy();
  }, [slug]);

  const handleToggleLike = async () => {
    if (!study) {
      return;
    }

    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(`/studies/${study.slug}`)}`);
      return;
    }

    setIsTogglingLike(true);
    setLikeFeedback("");

    try {
      const response = study.likedByCurrentUser
        ? await studiesApi.unlikeStudy(study.id)
        : await studiesApi.likeStudy(study.id);

      setStudy({
        ...study,
        likedByCurrentUser: response.likedByCurrentUser,
        likesCount: response.likesCount,
      });
    } catch (error: any) {
      setLikeFeedback(error.response?.data?.message || "Não foi possível atualizar a curtida agora.");
    } finally {
      setIsTogglingLike(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!study || !commentValue.trim()) {
      return;
    }

    setIsSubmittingComment(true);
    setCommentFeedback("");

    try {
      const response = await studiesApi.createComment(study.id, commentValue);
      setComments((currentComments) => [...currentComments, response.comment]);
      setCommentValue("");
      setStudy({
        ...study,
        commentsCount: response.commentsCount,
      });
    } catch (error: any) {
      setCommentFeedback(error.response?.data?.message || "Não foi possível publicar o comentário.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!study) {
      return;
    }

    setDeletingCommentId(commentId);

    try {
      const response = await studiesApi.deleteComment(commentId);
      setComments((currentComments) => currentComments.filter((comment) => comment.id !== commentId));
      setStudy({
        ...study,
        commentsCount: response.commentsCount,
      });
    } finally {
      setDeletingCommentId(null);
    }
  };

  if (isLoading) {
    return (
      <FeedbackState description="O conteúdo detalhado está sendo preparado." title="Carregando publicação" />
    );
  }

  if (errorMessage || !study) {
    return (
      <FeedbackState
        description={errorMessage || "A publicação solicitada não está disponível."}
        title="Leitura indisponível"
        variant="error"
      />
    );
  }

  return (
    <StudyPostPageContainer>
      <div className="post-main">
        {study.coverImage ? (
          <div className="post-cover">
            <img alt={study.title} src={study.coverImage} />
          </div>
        ) : null}

        <div className="post-header">
          <div className="meta-strip">
            <span className="meta-pill">{study.category}</span>
            <span className="meta-pill">{study.readingTime} min de leitura</span>
            <span className="meta-pill">{study.commentsCount} comentários</span>
          </div>
          <h1 className="post-title">{study.title}</h1>
          <p className="post-excerpt">{study.excerpt}</p>
        </div>

        <div className="content-card">
          <StudyBlockRenderer blocks={study.content} />
        </div>

        <CommentComposer
          isAuthenticated={isAuthenticated}
          isSubmitting={isSubmittingComment}
          onChange={setCommentValue}
          onSubmit={() => void handleCommentSubmit()}
          redirectPath={`/studies/${study.slug}`}
          value={commentValue}
        />
        {commentFeedback ? (
          <FeedbackState
            description={commentFeedback}
            title="Comentário não enviado"
            variant="error"
          />
        ) : null}

        <CommentList
          comments={comments}
          isDeleting={deletingCommentId}
          onDelete={(commentId) => void handleDeleteComment(commentId)}
        />
      </div>

      <aside className="post-sidebar">
        <div className="interaction-card">
          <span className="interaction-card-title">Interações</span>
          <p>{study.likesCount} curtidas registradas nesta publicação.</p>
          <button onClick={() => void handleToggleLike()} type="button">
            {isTogglingLike
              ? "Atualizando"
              : study.likedByCurrentUser
              ? "Remover curtida"
              : "Curtir publicação"}
          </button>
          {likeFeedback ? <div className="interaction-note">{likeFeedback}</div> : null}
          {!isAuthenticated ? (
            <div className="interaction-note">
              Entre na sua conta para curtir e comentar sem sair da leitura.
            </div>
          ) : null}
        </div>

        <div className="interaction-card">
          <span className="interaction-card-title">Contexto</span>
          <div className="meta-strip">
            {study.tags.map((tag) => (
              <span className="meta-pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </StudyPostPageContainer>
  );
};
