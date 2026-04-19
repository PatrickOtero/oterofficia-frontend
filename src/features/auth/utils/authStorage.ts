const authTokenKey = "oterofficia_auth_token";

export const authStorage = {
  clearToken() {
    localStorage.removeItem(authTokenKey);
  },

  getToken() {
    return localStorage.getItem(authTokenKey);
  },

  setToken(token: string) {
    localStorage.setItem(authTokenKey, token);
  },
};
