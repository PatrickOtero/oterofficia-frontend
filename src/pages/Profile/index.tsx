import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { authApi } from "../../features/auth/api/authApi";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { FeedbackState } from "../../features/studies/components/shared/FeedbackState";
import { getApiErrorMessage } from "../../services/apiError";
import { ProfilePageContainer } from "./Profile.style";

export const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [profileForm, setProfileForm] = useState({
    birthDate: "",
    name: "",
  });
  const [emailChange, setEmailChange] = useState<string>("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [deletionPassword, setDeletionPassword] = useState<string>("");
  const [feedback, setFeedback] = useState<{ message: string; variant: "error" | "success" } | null>(null);
  const [pendingAction, setPendingAction] = useState<string>("");

  useEffect(() => {
    if (!user) {
      return;
    }

    setProfileForm({
      birthDate: user.birthDate ? user.birthDate.slice(0, 10) : "",
      name: user.name,
    });
    setEmailChange(user.email);
  }, [user]);

  const initials = useMemo(() => {
    if (!user?.name) {
      return "PO";
    }

    return user.name
      .split(" ")
      .slice(0, 2)
      .map((chunk) => chunk[0]?.toUpperCase() || "")
      .join("");
  }, [user?.name]);

  const setSuccess = (message: string) => setFeedback({ message, variant: "success" });
  const setError = (message: string) => setFeedback({ message, variant: "error" });

  const handleProfileSave = async () => {
    setPendingAction("profile");
    setFeedback(null);

    try {
      const response = await authApi.updateProfile({
        birthDate: profileForm.birthDate || null,
        name: profileForm.name,
      });
      await refreshUser();
      setProfileForm({
        birthDate: response.user.birthDate ? response.user.birthDate.slice(0, 10) : "",
        name: response.user.name,
      });
      setSuccess(response.message);
    } catch (error) {
      setError(getApiErrorMessage(error, "Não foi possível atualizar o perfil."));
    } finally {
      setPendingAction("");
    }
  };

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPendingAction("avatar");
    setFeedback(null);

    try {
      const response = await authApi.uploadAvatar(file);
      await refreshUser();
      setSuccess(response.message);
    } catch (error) {
      setError(getApiErrorMessage(error, "Não foi possível atualizar a imagem."));
    } finally {
      event.target.value = "";
      setPendingAction("");
    }
  };

  const handleRemoveAvatar = async () => {
    setPendingAction("avatar-remove");
    setFeedback(null);

    try {
      const response = await authApi.updateProfile({ avatarUrl: null });
      await refreshUser();
      setSuccess(response.message);
    } catch (error) {
      setError(getApiErrorMessage(error, "Não foi possível remover a imagem."));
    } finally {
      setPendingAction("");
    }
  };

  const handlePasswordChange = async () => {
    setPendingAction("password");
    setFeedback(null);

    try {
      const response = await authApi.changePassword(passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setSuccess(response.message);
    } catch (error) {
      setError(getApiErrorMessage(error, "Não foi possível atualizar a senha."));
    } finally {
      setPendingAction("");
    }
  };

  const handleEmailChangeRequest = async () => {
    setPendingAction("email");
    setFeedback(null);

    try {
      const response = await authApi.requestEmailChange(emailChange);
      setSuccess(response.message);
    } catch (error) {
      setError(getApiErrorMessage(error, "Não foi possível solicitar a troca do e-mail."));
    } finally {
      setPendingAction("");
    }
  };

  const handleResendVerification = async () => {
    if (!user) {
      return;
    }

    setPendingAction("verification");
    setFeedback(null);

    try {
      const response = await authApi.resendVerificationEmail(user.email);
      setSuccess(response.message);
    } catch (error) {
      setError(getApiErrorMessage(error, "Não foi possível reenviar a confirmação."));
    } finally {
      setPendingAction("");
    }
  };

  const handleAccountDeletionRequest = async () => {
    setPendingAction("deletion");
    setFeedback(null);

    try {
      const response = await authApi.requestAccountDeletion(deletionPassword);
      setDeletionPassword("");
      setSuccess(response.message);
    } catch (error) {
      setError(getApiErrorMessage(error, "Não foi possível solicitar a exclusão da conta."));
    } finally {
      setPendingAction("");
    }
  };

  if (!user) {
    return (
      <FeedbackState
        description="Não foi possível carregar os dados do seu perfil."
        title="Perfil indisponivel"
        variant="error"
      />
    );
  }

  return (
    <ProfilePageContainer>
      <div className="profile-header">
        {user.avatarUrl ? (
          <img alt={user.name} className="profile-avatar" src={user.avatarUrl} />
        ) : (
          <div className="profile-avatar profile-avatar-fallback">{initials}</div>
        )}

        <div className="profile-stack">
          <div className="profile-title">{user.name}</div>
          <div className="profile-meta">
            <span className="profile-pill">{user.email}</span>
            <span className="profile-pill">
              {user.emailVerifiedAt ? "E-mail confirmado" : "Aguardando confirmação"}
            </span>
          </div>
          <div className="profile-actions">
            <input
              ref={avatarInputRef}
              hidden
              onChange={handleAvatarUpload}
              type="file"
              accept="image/*"
            />
            <button
              onClick={() => avatarInputRef.current?.click()}
              type="button"
            >
              {pendingAction === "avatar" ? "Enviando" : "Enviar imagem"}
            </button>
            {user.avatarUrl ? (
              <button onClick={() => void handleRemoveAvatar()} type="button">
                {pendingAction === "avatar-remove" ? "Removendo" : "Remover imagem"}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {feedback ? (
        <FeedbackState
          description={feedback.message}
          title={feedback.variant === "success" ? "Atualização concluída" : "Falha na atualização"}
          variant={feedback.variant}
        />
      ) : null}

      <div className="profile-section">
        <div className="profile-section-title">Dados principais</div>
        <div className="profile-grid">
          <label>
            Nome
            <input
              onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })}
              value={profileForm.name}
            />
          </label>
          <label>
            Data de nascimento
            <input
              onChange={(event) => setProfileForm({ ...profileForm, birthDate: event.target.value })}
              type="date"
              value={profileForm.birthDate}
            />
          </label>
        </div>
        <div className="profile-actions">
          <button onClick={() => void handleProfileSave()} type="button">
            {pendingAction === "profile" ? "Salvando" : "Salvar perfil"}
          </button>
        </div>
      </div>

      {!user.emailVerifiedAt ? (
        <div className="profile-section">
          <div className="profile-section-title">Confirmação de e-mail</div>
          <div className="profile-actions">
            <button onClick={() => void handleResendVerification()} type="button">
              {pendingAction === "verification" ? "Enviando" : "Reenviar confirmação"}
            </button>
          </div>
        </div>
      ) : null}

      <div className="profile-section">
        <div className="profile-section-title">Alterar e-mail</div>
        <label>
          Novo e-mail
          <input onChange={(event) => setEmailChange(event.target.value)} value={emailChange} />
        </label>
        <div className="profile-actions">
          <button onClick={() => void handleEmailChangeRequest()} type="button">
            {pendingAction === "email" ? "Enviando" : "Confirmar novo e-mail"}
          </button>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-title">Atualizar senha</div>
        <div className="profile-grid">
          <label>
            Senha atual
            <input
              onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
              type="password"
              value={passwordForm.currentPassword}
            />
          </label>
          <label>
            Nova senha
            <input
              onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
              type="password"
              value={passwordForm.newPassword}
            />
          </label>
        </div>
        <div className="profile-actions">
          <button onClick={() => void handlePasswordChange()} type="button">
            {pendingAction === "password" ? "Atualizando" : "Atualizar senha"}
          </button>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-title">Encerrar conta</div>
        <label>
          Confirme sua senha
          <input
            onChange={(event) => setDeletionPassword(event.target.value)}
            type="password"
            value={deletionPassword}
          />
        </label>
        <div className="profile-actions">
          <button onClick={() => void handleAccountDeletionRequest()} type="button">
            {pendingAction === "deletion" ? "Enviando" : "Solicitar exclusão"}
          </button>
        </div>
      </div>
    </ProfilePageContainer>
  );
};
