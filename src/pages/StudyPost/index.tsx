import { useCallback, useEffect, useRef, useState } from "react";
import { HeartStraight, X } from "phosphor-react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { studiesApi } from "../../features/studies/api/studiesApi";
import { CommentComposer } from "../../features/studies/components/public/CommentComposer";
import { CommentList } from "../../features/studies/components/public/CommentList";
import { StudyBlockRenderer } from "../../features/studies/components/public/StudyBlockRenderer";
import { FeedbackState } from "../../features/studies/components/shared/FeedbackState";
import { StudyComment, StudyDetail } from "../../features/studies/types/study";
import { useBotSceneActions } from "../../hooks/useBotSceneActions";
import { recordRobotStudyContext } from "../../features/robotConversation/utils/robotConversationContext";
import { getApiErrorMessage } from "../../services/apiError";
import { StudyPostImageLightboxContainer as ImageLightboxPortalContainer } from "./StudyPostImageLightbox.style";
import { StudyPostPageContainer } from "./StudyPost.style";

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
          aria-label="Fechar visualização da imagem"
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
  const { openAuthScene } = useBotSceneActions();
  const containerRef = useRef<HTMLElement | null>(null);
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
      openAuthScene();
      navigate(`/login?redirect=${encodeURIComponent(`/studies/${targetSlug}`)}`);
    },
    [navigate, openAuthScene]
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
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Não foi possível carregar esta leitura."));
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
    } catch (error) {
      setLikeFeedback(getApiErrorMessage(error, "Não foi possível atualizar a curtida agora."));
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
    } catch (error) {
      setCommentFeedback(getApiErrorMessage(error, "Não foi possível publicar o comentário."));
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
    } catch (error) {
      setCommentFeedback(getApiErrorMessage(error, "Não foi possível remover o comentário."));
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
    } catch (error) {
      setCommentFeedback(getApiErrorMessage(error, "Não foi possível atualizar a curtida deste comentário."));
    } finally {
      setLikePendingId(null);
    }
  };

  useEffect(() => {
    if (!study) {
      return;
    }

    const container = containerRef.current;
    const persistContext = () => {
      const scrollRange = container ? container.scrollHeight - container.clientHeight : 0;
      const progress = scrollRange > 0 && container ? (container.scrollTop / scrollRange) * 100 : 0;

      recordRobotStudyContext({
        path: `/studies/${study.slug}`,
        progress,
        study,
      });
    };

    persistContext();

    if (!container) {
      return;
    }

    let timeoutId: number | null = null;
    const handleScroll = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        persistContext();
      }, 120);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", persistContext);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      persistContext();
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", persistContext);
    };
  }, [study]);

  if (isLoading) {
    return (
      <FeedbackState description="O conteúdo detalhado está sendo preparado." title="Carregando publicação" />
    );
  }

  if (errorMessage || !study) {
    return (
      <FeedbackState
        description={errorMessage || "A publicação solicitada não está disponível."}
        title="Leitura indisponivel"
        variant="error"
      />
    );
  }

  return (
    <StudyPostPageContainer ref={containerRef}>
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
              <span className="meta-pill">{study.commentsCount} comentários</span>
            </div>

            <div className="post-like-cluster">
              <button
                aria-label={study.likedByCurrentUser ? "Remover curtida da publicação" : "Curtir publicação"}
                className="post-like-button"
                data-liked={study.likedByCurrentUser}
                onClick={() => void handleToggleLike()}
                title={study.likedByCurrentUser ? "Remover curtida" : "Curtir publicação"}
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
        <FeedbackState description={commentFeedback} title="Interação não concluída" variant="error" />
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
