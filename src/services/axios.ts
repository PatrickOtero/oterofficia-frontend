import axios from "axios";
import { authStorage } from "../features/auth/utils/authStorage";
import { logApiErrorToConsole } from "./apiError";

const serverUrl = "https://p01--oterofficia-backend--rfp2dvf84z2n.code.run"

export const api = axios.create({ 
    baseURL: serverUrl,
});

export const formsubmitApi = axios.create({ 
    baseURL: serverUrl,
});

const createRequestId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const attachInterceptors = (client: typeof api, includeAuthToken: boolean) => {
    client.interceptors.request.use((config) => {
        const headers = config.headers ?? {};
        const requestId = createRequestId();

        headers["x-request-id"] = requestId;

        if (includeAuthToken) {
            const token = authStorage.getToken();

            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }

        config.headers = headers;
        return config;
    });

    client.interceptors.response.use(
        (response) => response,
        (error) => {
            logApiErrorToConsole(error);
            return Promise.reject(error);
        }
    );
};

attachInterceptors(api, true);
attachInterceptors(formsubmitApi, false);
