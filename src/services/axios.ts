import axios from "axios";
import { authStorage } from "../features/auth/utils/authStorage";

const serverUrl = "https://p01--oterofficia-backend--rfp2dvf84z2n.code.run"

const localServerUrl = "http://localhost:3002"

export const api = axios.create({ 
    baseURL: serverUrl,
});

export const formsubmitApi = axios.create({ 
    baseURL: serverUrl,
});

api.interceptors.request.use((config) => {
    const token = authStorage.getToken();

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
