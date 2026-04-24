import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AdminSectionTabs } from "../../../features/admin/components/AdminSectionTabs";
import { projectsApi } from "../../../features/projects/api/projectsApi";
import { ProjectEditorForm } from "../../../features/projects/components/admin/ProjectEditorForm";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { ProjectFormValues } from "../../../features/projects/types/project";
import {
  createEmptyProjectForm,
  mapProjectToFormValues,
} from "../../../features/projects/utils/projectEditor";
import {
  orbitalPanelCss,
  scrollableContentCss,
} from "../../../features/studies/utils/styleMixins";

const AdminProjectEditorContainer = styled.section`
    ${orbitalPanelCss};
    ${scrollableContentCss};

    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    height: 100%;
    padding: 2rem;
`;

export const AdminProjectEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [form, setForm] = useState<ProjectFormValues>(createEmptyProjectForm());
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(id));
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [noticeMessage, setNoticeMessage] = useState<string>("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadProject = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const project = await projectsApi.fetchProjectById(id);
        setForm(mapProjectToFormValues(project));
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Não foi possível carregar o projeto.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProject();
  }, [id]);

  const handleSaveProject = async () => {
    setErrorMessage("");
    setNoticeMessage("");

    if (!form.projectName.trim() || !form.imageUrl.trim() || !form.projectDescription.trim()) {
      setErrorMessage("Preencha nome, imagem e descrição.");
      return;
    }

    setIsSaving(true);

    try {
      const response = isEditing && id
        ? await projectsApi.updateProject(id, form)
        : await projectsApi.createProject(form);

      setForm(mapProjectToFormValues(response));
      setNoticeMessage(isEditing ? "Projeto atualizado." : "Projeto criado.");

      if (!isEditing) {
        navigate(`/admin/projects/${response.id}/edit`, { replace: true });
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Não foi possível salvar o projeto.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminProjectEditorContainer>
      <AdminSectionTabs />

      {isLoading ? <FeedbackState title="Carregando editor" /> : null}

      {!isLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha no editor" variant="error" />
      ) : null}

      {!isLoading && noticeMessage ? (
        <FeedbackState description={noticeMessage} title="Atualização concluída" variant="success" />
      ) : null}

      {!isLoading ? (
        <ProjectEditorForm
          form={form}
          isEditing={isEditing}
          isSaving={isSaving}
          onBack={() => navigate("/admin/projects")}
          onChange={setForm}
          onSave={() => void handleSaveProject()}
        />
      ) : null}
    </AdminProjectEditorContainer>
  );
};
