import { useRef, useState } from "react";
import styled from "styled-components";
import { UploadFolder, uploadsApi } from "../../api/uploadsApi";

type ImageUploadFieldProps = {
  buttonLabel?: string;
  folder: UploadFolder;
  onUploaded: (url: string) => void;
};

const ImageUploadFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    .upload-row {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        flex-wrap: wrap;
    }

    .upload-trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 3.8rem;
        padding: 0 1.2rem;
        border-radius: 1.2rem;
        border: 1px solid rgba(var(--scene-accent-rgb), 0.18);
        background: rgba(14, 26, 39, 0.58);
        color: rgba(var(--scene-accent-soft-rgb), 0.88);
        font-size: 0.94rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
    }

    .upload-status,
    .upload-error {
        font-size: 1.08rem;
        line-height: 1.55;
    }

    .upload-status {
        color: rgba(var(--scene-accent-soft-rgb), 0.74);
    }

    .upload-error {
        color: rgba(255, 142, 142, 0.92);
    }
`;

export const ImageUploadField = ({
  buttonLabel = "Enviar imagem",
  folder,
  onUploaded,
}: ImageUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      const response = await uploadsApi.uploadImage(file, folder);

      onUploaded(response.url);
      setStatusMessage(
        response.fallbackUsed
          ? "Upload concluído com fallback local."
          : response.source === "cloudflare"
          ? "Upload concluído na Cloudflare."
          : "Upload local concluído."
      );
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Não foi possível concluir o upload.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <ImageUploadFieldContainer>
      <div className="upload-row">
        <button
          className="upload-trigger"
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          {isUploading ? "Enviando" : buttonLabel}
        </button>

        <input
          accept="image/*"
          hidden
          onChange={(event) => void handleUploadFile(event)}
          ref={inputRef}
          type="file"
        />

        {statusMessage ? <span className="upload-status">{statusMessage}</span> : null}
      </div>

      {errorMessage ? <span className="upload-error">{errorMessage}</span> : null}
    </ImageUploadFieldContainer>
  );
};
