import { StudyDetail } from "../../studies/types/study";
import {
  RobotConversationNavigationEntry,
  RobotConversationStudyContext,
} from "../types/robotConversation";

const RECENT_ROUTES_STORAGE_KEY = "oterofficia-robot-recent-routes";
const LAST_STUDY_STORAGE_KEY = "oterofficia-robot-last-study";
const MAX_RECENT_ROUTES = 12;

const parseJson = <T>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (_error) {
    return null;
  }
};

const hasWindow = () => typeof window !== "undefined";

const clampProgress = (value: number | null | undefined) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }

  return Math.max(0, Math.min(100, value));
};

export const recordRobotRouteEntry = (entry: { path: string; title?: string | null }) => {
  if (!hasWindow() || !entry.path) {
    return;
  }

  const currentEntries =
    parseJson<RobotConversationNavigationEntry[]>(window.localStorage.getItem(RECENT_ROUTES_STORAGE_KEY)) || [];
  const nextEntry: RobotConversationNavigationEntry = {
    path: entry.path,
    title: entry.title ?? null,
    visitedAt: new Date().toISOString(),
  };
  const previousEntry = currentEntries[currentEntries.length - 1];
  const dedupedEntries =
    previousEntry?.path === nextEntry.path ? currentEntries.slice(0, -1) : currentEntries;

  window.localStorage.setItem(
    RECENT_ROUTES_STORAGE_KEY,
    JSON.stringify([...dedupedEntries, nextEntry].slice(-MAX_RECENT_ROUTES))
  );
};

export const recordRobotStudyContext = (input: {
  path: string;
  progress?: number | null;
  study: StudyDetail;
}) => {
  if (!hasWindow()) {
    return;
  }

  const nextStudyContext: RobotConversationStudyContext = {
    category: input.study.category,
    excerpt: input.study.excerpt,
    lastSeenAt: new Date().toISOString(),
    path: input.path,
    progress: clampProgress(input.progress),
    readingTime: input.study.readingTime,
    slug: input.study.slug,
    tags: input.study.tags,
    title: input.study.title,
  };

  window.localStorage.setItem(LAST_STUDY_STORAGE_KEY, JSON.stringify(nextStudyContext));
};

export const getRobotConversationContext = () => {
  if (!hasWindow()) {
    return {
      lastStudy: null,
      recentRoutes: [],
    };
  }

  return {
    lastStudy:
      parseJson<RobotConversationStudyContext>(window.localStorage.getItem(LAST_STUDY_STORAGE_KEY)) || null,
    recentRoutes:
      parseJson<RobotConversationNavigationEntry[]>(
        window.localStorage.getItem(RECENT_ROUTES_STORAGE_KEY)
      ) || [],
  };
};

export const getCurrentStudySlugFromPath = (path: string) => {
  if (!path.startsWith("/studies/")) {
    return null;
  }

  const [, , slug] = path.split("/");
  return slug || null;
};
