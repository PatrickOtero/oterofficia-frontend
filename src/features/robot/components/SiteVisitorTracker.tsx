import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { robotInsightsApi } from "../api/robotInsightsApi";

const VISITOR_STORAGE_KEY = "oterofficia-visitor-key";

const createVisitorKey = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getVisitorKey = () => {
  if (typeof window === "undefined") {
    return createVisitorKey();
  }

  const storedVisitorKey = window.localStorage.getItem(VISITOR_STORAGE_KEY);

  if (storedVisitorKey) {
    return storedVisitorKey;
  }

  const nextVisitorKey = createVisitorKey();
  window.localStorage.setItem(VISITOR_STORAGE_KEY, nextVisitorKey);
  return nextVisitorKey;
};

export const SiteVisitorTracker = () => {
  const location = useLocation();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = `${location.pathname}${location.search}`;

    if (lastTrackedPathRef.current === currentPath) {
      return;
    }

    lastTrackedPathRef.current = currentPath;

    void robotInsightsApi.trackSiteVisit({
      path: currentPath,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      visitorKey: getVisitorKey(),
    });
  }, [location.pathname, location.search]);

  return null;
};
