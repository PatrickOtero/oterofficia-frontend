import { api } from "../../../services/axios";
import { AuthResponse, AuthUser } from "../types/auth";

export const authApi = {
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
    const response = await api.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },
};
