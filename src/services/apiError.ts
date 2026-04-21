import axios from "axios";

type ApiErrorDetails = {
  hint?: string;
  reason?: string;
  [key: string]: unknown;
};

type ApiErrorPayload = {
  code?: string;
  details?: ApiErrorDetails;
  message?: string;
  requestId?: string;
};

export type ApiErrorInfo = {
  code?: string;
  details?: ApiErrorDetails;
  message: string;
  requestId?: string;
};

export const getApiErrorInfo = (error: unknown, fallbackMessage: string): ApiErrorInfo => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as ApiErrorPayload | undefined;
    const requestId =
      payload?.requestId ||
      error.response?.headers?.["x-request-id"] ||
      error.config?.headers?.["x-request-id"];

    return {
      code: payload?.code,
      details: payload?.details,
      message: payload?.message || fallbackMessage,
      requestId: typeof requestId === "string" ? requestId : undefined,
    };
  }

  if (error instanceof Error && error.message.trim()) {
    return {
      message: error.message,
    };
  }

  return {
    message: fallbackMessage,
  };
};

export const logApiErrorToConsole = (error: unknown, fallbackMessage = "Erro inesperado na API.") => {
  const errorInfo = getApiErrorInfo(error, fallbackMessage);

  if (!axios.isAxiosError(error)) {
    console.error("[API] Unexpected client error", {
      ...errorInfo,
      rawError: error,
    });
    return errorInfo;
  }

  const method = error.config?.method?.toUpperCase() || "REQUEST";
  const baseURL = error.config?.baseURL || "";
  const url = error.config?.url || "";
  const status = error.response?.status || "NO_RESPONSE";

  console.groupCollapsed(`[API ${status}] ${method} ${baseURL}${url}`);
  console.error("API error summary", {
    code: errorInfo.code,
    message: errorInfo.message,
    requestId: errorInfo.requestId,
  });

  if (error.response?.data) {
    console.error("API response body", error.response.data);
  }

  if (error.response?.headers) {
    console.error("API response headers", error.response.headers);
  }

  console.error("Axios error", error);
  console.groupEnd();

  return errorInfo;
};
