import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AdminSectionTabs } from "../../../features/admin/components/AdminSectionTabs";
import { studiesApi } from "../../../features/studies/api/studiesApi";
import { StudyEditorForm } from "../../../features/studies/components/admin/StudyEditorForm";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { StudyFormValues } from "../../../features/studies/types/study";
import {
  createEmptyStudyForm,
  mapStudyToFormValues,
} from "../../../features/studies/utils/studyEditor";
import {
  orbitalPanelCss,
  scrollableContentCss,
} from "../../../features/studies/utils/styleMixins";

const AdminStudyEditorContainer = styled.section`
    ${orbitalPanelCss};
    ${scrollableContentCss};

    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    height: 100%;
    padding: 2rem;
`;

export const AdminStudyEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [form, setForm] = useState<StudyFormValues>(createEmptyStudyForm());
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(id));
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [noticeMessage, setNoticeMessage] = useState<string>("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadStudy = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const study = await studiesApi.fetchAdminStudy(id);
        setForm(mapStudyToFormValues(study));
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Não foi possível carregar a postagem.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadStudy();
  }, [id]);

  const persistStudy = async (targetStatus: "draft" | "published") => {
    setErrorMessage("");
    setNoticeMessage("");

    const payload = {
      ...form,
      status: targetStatus,
    };

    if (targetStatus === "draft") {
      setIsSaving(true);
    } else {
      setIsPublishing(true);
    }

    try {
      const response = isEditing && id
        ? await studiesApi.updateStudy(id, payload)
        : await studiesApi.createStudy(payload);

      setForm(mapStudyToFormValues(response));
      setNoticeMessage(
        targetStatus === "published"
          ? "Publicação salva e publicada."
          : "Rascunho salvo com sucesso."
      );

      if (!isEditing) {
        navigate(`/admin/studies/${response.id}/edit`, { replace: true });
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Não foi possível salvar a postagem.");
    } finally {
      setIsSaving(false);
      setIsPublishing(false);
    }
  };

  return (
    <AdminStudyEditorContainer>
      <AdminSectionTabs />

      {isLoading ? (
        <FeedbackState description="O editor está carregando os dados salvos." title="Carregando editor" />
      ) : null}

      {!isLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha no editor" variant="error" />
      ) : null}

      {!isLoading && noticeMessage ? (
        <FeedbackState description={noticeMessage} title="Atualização concluída" variant="success" />
      ) : null}

      {!isLoading ? (
        <StudyEditorForm
          form={form}
          isPublishing={isPublishing}
          isSaving={isSaving}
          onChange={setForm}
          onPublish={() => void persistStudy("published")}
          onSaveDraft={() => void persistStudy("draft")}
        />
      ) : null}
    </AdminStudyEditorContainer>
  );
};
