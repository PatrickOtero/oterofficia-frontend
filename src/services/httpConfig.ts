const DEFAULT_API_URL = "https://p01--oterofficia-backend--rfp2dvf84z2n.code.run";

export const apiBaseUrl = process.env.REACT_APP_API_URL || DEFAULT_API_URL;

export const createRequestId = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
