import { X } from "phosphor-react";
import { createPortal } from "react-dom";
import { StudyPostImageLightboxContainer } from "./StudyPostImageLightbox.style";

export type StudyPostLightboxImage = {
  alt?: string;
  caption?: string;
  src: string;
};

type StudyPostImageLightboxProps = {
  image: StudyPostLightboxImage;
  onClose: () => void;
};

export const StudyPostImageLightbox = ({
  image,
  onClose,
}: StudyPostImageLightboxProps) => {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <StudyPostImageLightboxContainer onClick={onClose}>
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
    </StudyPostImageLightboxContainer>,
    document.body
  );
};
