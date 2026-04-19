import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authApi } from "../../features/auth/api/authApi";
import { AuthContextValue, AuthUser } from "../../features/auth/types/auth";
import { authStorage } from "../../features/auth/utils/authStorage";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = useCallback(async () => {
    const storedToken = authStorage.getToken();

    if (!storedToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const profile = await authApi.getProfile();
      setUser(profile);
    } catch (_error) {
      authStorage.clearToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const register = useCallback(async (payload: { name: string; email: string; password: string }) => {
    const response = await authApi.register(payload);

    return response;
  }, []);

  const login = useCallback(async (payload: { email: string; password: string }) => {
    const response = await authApi.login(payload);

    authStorage.setToken(response.token);
    setUser(response.user);

    return response.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      authStorage.clearToken();
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAdmin: user?.role === "admin",
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      refreshUser,
      register,
      user,
    }),
    [isLoading, login, logout, refreshUser, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
