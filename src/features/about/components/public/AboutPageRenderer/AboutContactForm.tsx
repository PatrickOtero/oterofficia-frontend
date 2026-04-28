import { FormEvent, useState } from "react";
import { getApiErrorMessage } from "../../../../../services/apiError";
import { api } from "../../../../../services/axios";
import type { AboutBlock } from "../../../types/about";

type AboutContactFormProps = {
  block: AboutBlock;
  interactive: boolean;
};

export const AboutContactForm = ({ block, interactive }: AboutContactFormProps) => {
  const [formState, setFormState] = useState({
    email: "",
    message: "",
    name: "",
    subject: "",
  });
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<"error" | "success">("success");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const labels = {
    description: String(block.data.description || ""),
    emailLabel: String(block.data.emailLabel || "Seu e-mail"),
    messageLabel: String(block.data.messageLabel || "Mensagem"),
    nameLabel: String(block.data.nameLabel || "Seu nome"),
    subjectLabel: String(block.data.subjectLabel || "Assunto"),
    submitLabel: String(block.data.submitLabel || "Enviar mensagem"),
    successMessage: String(block.data.successMessage || "Mensagem enviada com sucesso."),
    title: String(block.data.title || "Mensagem direta"),
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!interactive) {
      return;
    }

    setFeedback("");
    setIsSubmitting(true);

    try {
      await api.post("/receiveEmail", {
        email: formState.email,
        emailContent: formState.message,
        name: formState.name,
        subject: formState.subject,
      });

      setFeedback(labels.successMessage);
      setFeedbackType("success");
      setFormState({
        email: "",
        message: "",
        name: "",
        subject: "",
      });
    } catch (error) {
      setFeedback(getApiErrorMessage(error, "Não foi possível enviar a mensagem."));
      setFeedbackType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={(event) => void handleSubmit(event)}>
      {labels.title ? <span className="about-section-title">{labels.title}</span> : null}
      {labels.description ? <p className="contact-form-description">{labels.description}</p> : null}
      <div className="contact-form-grid">
        <label>
          {labels.nameLabel}
          <input
            disabled={!interactive || isSubmitting}
            onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
            value={formState.name}
          />
        </label>
        <label>
          {labels.emailLabel}
          <input
            disabled={!interactive || isSubmitting}
            onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
            type="email"
            value={formState.email}
          />
        </label>
        <label className="contact-form-full">
          {labels.subjectLabel}
          <input
            disabled={!interactive || isSubmitting}
            onChange={(event) => setFormState((current) => ({ ...current, subject: event.target.value }))}
            value={formState.subject}
          />
        </label>
        <label className="contact-form-full">
          {labels.messageLabel}
          <textarea
            disabled={!interactive || isSubmitting}
            onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
            value={formState.message}
          />
        </label>
      </div>
      {feedback ? <span className={`contact-feedback ${feedbackType}`}>{feedback}</span> : null}
      <button disabled={!interactive || isSubmitting} type="submit">
        {interactive ? (isSubmitting ? "Enviando" : labels.submitLabel) : "Prévia do formulário"}
      </button>
    </form>
  );
};
