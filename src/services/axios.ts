import axios from "axios";
import { authStorage } from "../features/auth/utils/authStorage";
import { logApiErrorToConsole } from "./apiError";
import { apiBaseUrl, createRequestId } from "./httpConfig";

export const api = axios.create({ 
    baseURL: apiBaseUrl,
});

export const formsubmitApi = axios.create({ 
    baseURL: apiBaseUrl,
});

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
