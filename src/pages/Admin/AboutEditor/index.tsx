import { useEffect, useState } from "react";
import { AdminSectionTabs } from "../../../features/admin/components/AdminSectionTabs";
import { AdminPageShell } from "../../../features/admin/styles/AdminPageShell.style";
import { aboutApi } from "../../../features/about/api/aboutApi";
import { AboutEditorForm } from "../../../features/about/components/admin/AboutEditorForm";
import { AboutFormValues } from "../../../features/about/types/about";
import { createEmptyAboutForm, mapAboutToFormValues } from "../../../features/about/utils/aboutEditor";
import { FeedbackState } from "../../../features/studies/components/shared/FeedbackState";
import { getApiErrorMessage } from "../../../services/apiError";

export const AdminAboutEditorPage = () => {
  const [form, setForm] = useState<AboutFormValues>(createEmptyAboutForm());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [noticeMessage, setNoticeMessage] = useState<string>("");

  useEffect(() => {
    const loadPage = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const page = await aboutApi.fetchAdminPage();
        setForm(mapAboutToFormValues(page));
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error, "Não foi possível carregar a página."));
      } finally {
        setIsLoading(false);
      }
    };

    void loadPage();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage("");
    setNoticeMessage("");

    try {
      const response = await aboutApi.updatePage(form);
      setForm(mapAboutToFormValues(response));
      setNoticeMessage("Página Sobre Mim atualizada.");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Não foi possível salvar a página."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminPageShell $gap="1.4rem">
      <AdminSectionTabs />

      {isLoading ? (
        <FeedbackState description="Carregando a configuração atual da página." title="Carregando editor" />
      ) : null}

      {!isLoading && errorMessage ? (
        <FeedbackState description={errorMessage} title="Falha no editor" variant="error" />
      ) : null}

      {!isLoading && noticeMessage ? (
        <FeedbackState description={noticeMessage} title="Atualização concluída" variant="success" />
      ) : null}

      {!isLoading ? (
        <AboutEditorForm form={form} isSaving={isSaving} onChange={setForm} onSave={() => void handleSave()} />
      ) : null}
    </AdminPageShell>
  );
};
