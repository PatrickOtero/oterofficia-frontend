import { api } from "../../../services/axios";
import {
  AuthResponse,
  AuthUser,
  ProfileMutationResponse,
  RegisterResponse,
} from "../types/auth";

type MessageResponse = {
  message: string;
};

export const authApi = {
  async changePassword(payload: { currentPassword: string; newPassword: string }) {
    const response = await api.patch<MessageResponse>("/auth/profile/password", payload);
    return response.data;
  },

  async confirmAccountDeletion(token: string) {
    const response = await api.post<MessageResponse>("/auth/confirm-account-deletion", { token });
    return response.data;
  },

  async confirmEmailChange(token: string) {
    const response = await api.post<MessageResponse>("/auth/confirm-email-change", { token });
    return response.data;
  },

  async getProfile() {
    const response = await api.get<{ user: AuthUser }>("/auth/me");
    return response.data.user;
  },

  async login(payload: { email: string; password: string }) {
    const response = await api.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  async logout() {
    await api.post("/auth/logout");
  },

  async register(payload: { name: string; email: string; password: string }) {
    const response = await api.post<RegisterResponse>("/auth/register", payload);
    return response.data;
  },

  async requestAccountDeletion(password: string) {
    const response = await api.post<MessageResponse>("/auth/profile/account-deletion", { password });
    return response.data;
  },

  async requestEmailChange(nextEmail: string) {
    const response = await api.post<MessageResponse>("/auth/profile/email-change", { nextEmail });
    return response.data;
  },

  async requestPasswordReset(email: string) {
    const response = await api.post<MessageResponse>("/auth/forgot-password", { email });
    return response.data;
  },

  async resendVerificationEmail(email: string) {
    const response = await api.post<MessageResponse>("/auth/resend-verification", { email });
    return response.data;
  },

  async resetPassword(payload: { password: string; token: string }) {
    const response = await api.post<MessageResponse>("/auth/reset-password", payload);
    return response.data;
  },

  async updateProfile(payload: { avatarUrl?: string | null; birthDate?: string | null; name?: string }) {
    const response = await api.patch<ProfileMutationResponse>("/auth/profile", payload);
    return response.data;
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<ProfileMutationResponse>("/auth/profile/avatar", formData);
    return response.data;
  },

  async verifyEmail(token: string) {
    const response = await api.post<MessageResponse>("/auth/verify-email", { token });
    return response.data;
  },
};
