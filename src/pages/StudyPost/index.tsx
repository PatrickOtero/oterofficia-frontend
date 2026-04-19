import { useCallback, useEffect, useState } from "react";
import { HeartStraight, X } from "phosphor-react";
import { createPortal } from "react-dom";
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

    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    height: 100%;
    padding: 2rem;

    .post-cover {
        ${surfaceCardCss};
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 28rem;
        padding: 1.4rem;
        overflow: hidden;
        cursor: zoom-in;
    }

    .post-cover img {
        width: 100%;
        max-height: 46rem;
        object-fit: contain;
        border-radius: 1.8rem;
        background: rgba(2, 8, 12, 0.92);
    }

    .post-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(28rem, 34rem);
        gap: 1.6rem;
        align-items: start;
    }

    .post-header-card,
    .content-card,
    .interaction-card {
        ${surfaceCardCss};
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        padding: 2rem;
    }

    .content-card {
        padding: 2.4rem;
    }

    .post-header-top {
        display: flex;
        justify-content: space-between;
        gap: 1.6rem;
        align-items: flex-start;
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

    .meta-pill {
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

    .interaction-card-title {
        color: rgba(var(--scene-title-rgb), 0.95);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.2rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .post-like-cluster {
        display: inline-flex;
        align-items: center;
        gap: 0.9rem;
        flex-shrink: 0;
    }

    .post-like-button {
        width: 4.8rem;
        min-width: 0;
        height: 4.8rem;
        padding: 0;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .post-like-button svg {
        transition: transform 180ms ease;
    }

    .post-like-button:hover svg {
        transform: scale(1.08);
    }

    .post-like-button[data-liked="true"] svg {
        fill: rgba(var(--scene-accent-rgb), 0.3);
        color: rgba(var(--scene-title-rgb), 0.98);
    }

    .post-like-count {
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.16rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .interaction-card p {
        color: rgba(var(--scene-accent-soft-rgb), 0.74);
        font-size: 1.45rem;
        line-height: 1.7;
    }

    .post-sidebar {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        position: sticky;
        top: 0;
    }

    .interaction-note {
        color: rgba(var(--scene-accent-soft-rgb), 0.7);
        font-size: 1.25rem;
        line-height: 1.7;
    }

    @media (max-width: 1100px) {
        .post-hero-grid {
            grid-template-columns: 1fr;
        }

        .post-sidebar {
            position: static;
        }
    }

    @media (max-width: 900px) {
        padding: 1.6rem;

        .post-cover {
            min-height: 20rem;
            padding: 1rem;
        }

        .content-card,
        .interaction-card,
        .post-header-card {
            padding: 1.8rem;
        }

        .post-header-top {
            flex-direction: column;
            align-items: stretch;
        }

        .post-like-cluster {
            align-self: flex-start;
        }
    }
`;

const ImageLightboxPortalContainer = styled.div`
    position: fixed;
    inset: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background: rgba(3, 8, 14, 0.88);
    backdrop-filter: blur(6px);

    .image-lightbox-shell {
        position: relative;
        width: min(118rem, 100%);
        max-height: calc(100vh - 6rem);
        padding: 1.4rem;
        border-radius: 2.4rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.16);
        background: rgba(7, 16, 25, 0.9);
        box-shadow: 0 1.8rem 4rem rgba(0, 0, 0, 0.34);
    }

    .image-lightbox-close {
        position: absolute;
        top: 1.2rem;
        right: 1.2rem;
        z-index: 1;
        width: 4.2rem;
        min-width: 0;
        height: 4.2rem;
        padding: 0;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .image-lightbox-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    img {
        width: 100%;
        max-height: calc(100vh - 14rem);
        object-fit: contain;
        border-radius: 1.6rem;
        background: rgba(2, 8, 12, 0.94);
    }

    .image-lightbox-caption {
        color: rgba(var(--scene-accent-soft-rgb), 0.8);
        font-size: 1.35rem;
        line-height: 1.7;
        text-align: center;
    }

    @media (max-width: 900px) {
        padding: 1.6rem;

        .image-lightbox-shell {
            max-height: calc(100vh - 3.2rem);
        }
    }
`;

type ReplyTarget = {
  id: string;
  authorName: string;
};

type LightboxImage = {
  alt?: string;
  caption?: string;
  src: string;
};

type ImageLightboxPortalProps = {
  image: LightboxImage;
  onClose: () => void;
};

const ImageLightboxPortal = ({ image, onClose }: ImageLightboxPortalProps) => {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <ImageLightboxPortalContainer onClick={onClose}>
      <div className="image-lightbox-shell" onClick={(event) => event.stopPropagation()}>
        <button
          aria-label="Fechar visualizacao da imagem"
          className="image-lightbox-close"
          onClick={onClose}
          type="button"
        >
          <X size={18} weight="bold" />
        </button>
        <div className="image-lightbox-content">
          <img alt={image.alt || "Imagem ampliada"} src={image.src} />
          {image.caption ? <div className="image-lightbox-caption">{image.caption}</div> : null}
        </div>
      </div>
    </ImageLightboxPortalContainer>,
    document.body
  );
};

export const StudyPostPage = () => {
  const navigate = useNavigate();
  const { slug = "" } = useParams();
  const { isAuthenticated } = useAuth();
  const [study, setStudy] = useState<StudyDetail | null>(null);
  const [comments, setComments] = useState<StudyComment[]>([]);
  const [commentValue, setCommentValue] = useState<string>("");
  const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [isTogglingLike, setIsTogglingLike] = useState<boolean>(false);
  const [likePendingId, setLikePendingId] = useState<string | null>(null);
  const [commentFeedback, setCommentFeedback] = useState<string>("");
  const [likeFeedback, setLikeFeedback] = useState<string>("");
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  const redirectToAuth = useCallback(
    (targetSlug: string) => {
      navigate(`/login?redirect=${encodeURIComponent(`/studies/${targetSlug}`)}`);
    },
    [navigate]
  );

  const loadComments = useCallback(async (postId: string) => {
    const studyComments = await studiesApi.fetchComments(postId);
    setComments(studyComments);
  }, []);

  useEffect(() => {
    const loadStudy = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const post = await studiesApi.fetchStudyBySlug(slug);
        setStudy(post);
        await loadComments(post.id);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Nao foi possivel carregar esta leitura.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadStudy();
  }, [loadComments, slug]);

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  const handleToggleLike = async () => {
    if (!study) {
      return;
    }

    if (!isAuthenticated) {
      redirectToAuth(study.slug);
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
      setLikeFeedback(error.response?.data?.message || "Nao foi possivel atualizar a curtida agora.");
    } finally {
      setIsTogglingLike(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!study || !commentValue.trim()) {
      return;
    }

    if (!isAuthenticated) {
      redirectToAuth(study.slug);
      return;
    }

    setIsSubmittingComment(true);
    setCommentFeedback("");

    try {
      const response = await studiesApi.createComment(study.id, commentValue, replyTarget?.id ?? null);
      await loadComments(study.id);
      setCommentValue("");
      setReplyTarget(null);
      setStudy({
        ...study,
        commentsCount: response.commentsCount,
      });
    } catch (error: any) {
      setCommentFeedback(error.response?.data?.message || "Nao foi possivel publicar o comentario.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!study) {
      return;
    }

    setDeletingCommentId(commentId);
    setCommentFeedback("");

    try {
      const response = await studiesApi.deleteComment(commentId);
      await loadComments(study.id);
      setStudy({
        ...study,
        commentsCount: response.commentsCount,
      });

      if (replyTarget?.id === commentId) {
        setReplyTarget(null);
      }
    } catch (error: any) {
      setCommentFeedback(error.response?.data?.message || "Nao foi possivel remover o comentario.");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handleReply = (comment: StudyComment) => {
    if (!study) {
      return;
    }

    if (!isAuthenticated) {
      redirectToAuth(study.slug);
      return;
    }

    setCommentFeedback("");
    setReplyTarget({
      authorName: comment.author.name,
      id: comment.id,
    });
  };

  const handleToggleCommentLike = async (comment: StudyComment) => {
    if (!study) {
      return;
    }

    if (!isAuthenticated) {
      redirectToAuth(study.slug);
      return;
    }

    setLikePendingId(comment.id);
    setCommentFeedback("");

    try {
      if (comment.likedByCurrentUser) {
        await studiesApi.unlikeComment(comment.id);
      } else {
        await studiesApi.likeComment(comment.id);
      }

      await loadComments(study.id);
    } catch (error: any) {
      setCommentFeedback(error.response?.data?.message || "Nao foi possivel atualizar a curtida deste comentario.");
    } finally {
      setLikePendingId(null);
    }
  };

  if (isLoading) {
    return (
      <FeedbackState description="O conteudo detalhado esta sendo preparado." title="Carregando publicacao" />
    );
  }

  if (errorMessage || !study) {
    return (
      <FeedbackState
        description={errorMessage || "A publicacao solicitada nao esta disponivel."}
        title="Leitura indisponivel"
        variant="error"
      />
    );
  }

  return (
    <StudyPostPageContainer>
      {study.coverImage ? (
        <div
          className="post-cover"
          onClick={() =>
            setLightboxImage({
              alt: study.title,
              src: study.coverImage || "",
            })
          }
        >
          <img alt={study.title} decoding="async" loading="lazy" src={study.coverImage} />
        </div>
      ) : null}

      <div className="post-hero-grid">
        <div className="post-header-card">
          <div className="post-header-top">
            <div className="meta-strip">
              <span className="meta-pill">{study.category}</span>
              <span className="meta-pill">{study.readingTime} min de leitura</span>
              <span className="meta-pill">{study.commentsCount} comentarios</span>
            </div>

            <div className="post-like-cluster">
              <button
                aria-label={study.likedByCurrentUser ? "Remover curtida da publicacao" : "Curtir publicacao"}
                className="post-like-button"
                data-liked={study.likedByCurrentUser}
                onClick={() => void handleToggleLike()}
                title={study.likedByCurrentUser ? "Remover curtida" : "Curtir publicacao"}
                type="button"
              >
                <HeartStraight size={20} weight={isTogglingLike ? "fill" : "regular"} />
              </button>
              <span className="post-like-count">
                {isTogglingLike
                  ? "Atualizando"
                  : `${study.likesCount} ${study.likesCount === 1 ? "curtida" : "curtidas"}`}
              </span>
            </div>
          </div>
          <h1 className="post-title">{study.title}</h1>
          <p className="post-excerpt">{study.excerpt}</p>
          {likeFeedback ? <div className="interaction-note">{likeFeedback}</div> : null}
        </div>

        <aside className="post-sidebar">
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
      </div>

      <div className="content-card">
        <StudyBlockRenderer blocks={study.content} onImageOpen={setLightboxImage} />
      </div>

      <CommentComposer
        isAuthenticated={isAuthenticated}
        isSubmitting={isSubmittingComment}
        onCancelReply={() => setReplyTarget(null)}
        onChange={setCommentValue}
        onSubmit={() => void handleCommentSubmit()}
        redirectPath={`/studies/${study.slug}`}
        replyTargetName={replyTarget?.authorName ?? null}
        value={commentValue}
      />

      {commentFeedback ? (
        <FeedbackState description={commentFeedback} title="Interacao nao concluida" variant="error" />
      ) : null}

      <CommentList
        comments={comments}
        isDeleting={deletingCommentId}
        likePendingId={likePendingId}
        onDelete={(commentId) => void handleDeleteComment(commentId)}
        onReply={handleReply}
        onToggleLike={(comment) => void handleToggleCommentLike(comment)}
      />

      {lightboxImage ? (
        <ImageLightboxPortal image={lightboxImage} onClose={() => setLightboxImage(null)} />
      ) : null}
    </StudyPostPageContainer>
  );
};
