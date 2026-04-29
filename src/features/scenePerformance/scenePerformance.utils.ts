import type { ScenePerformanceProfile, ScenePerformanceTier } from "./scenePerformance.types";

const COMPACT_VIEWPORT_QUERY = "(max-width: 760px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const TOUCH_ONLY_QUERY = "(hover: none), (pointer: coarse)";

type NavigatorWithHardwareHints = Navigator & {
    deviceMemory?: number;
};

const canReadBrowserState = () => typeof window !== "undefined" && typeof window.matchMedia === "function";

const matchesQuery = (query: string) => canReadBrowserState() && window.matchMedia(query).matches;

const getNavigatorHints = () => {
    if (typeof navigator === "undefined") {
        return {
            hardwareConcurrency: 8,
            memory: 8,
        };
    }

    const hintedNavigator = navigator as NavigatorWithHardwareHints;

    return {
        hardwareConcurrency: hintedNavigator.hardwareConcurrency ?? 8,
        memory: hintedNavigator.deviceMemory ?? 8,
    };
};

const getScenePerformanceTier = ({
    isCompactViewport,
    isDocumentHidden,
    isLowCoreDevice,
    isLowMemoryDevice,
    isReducedMotion,
    isTouchOnly,
}: Omit<ScenePerformanceProfile, "tier">): ScenePerformanceTier => {
    if (isDocumentHidden || isReducedMotion || isCompactViewport || isLowMemoryDevice) {
        return "reduced";
    }

    if (isLowCoreDevice || isTouchOnly) {
        return "balanced";
    }

    return "rich";
};

export const resolveScenePerformanceProfile = (): ScenePerformanceProfile => {
    const { hardwareConcurrency, memory } = getNavigatorHints();
    const isCompactViewport = matchesQuery(COMPACT_VIEWPORT_QUERY);
    const isDocumentHidden = typeof document !== "undefined" && document.visibilityState === "hidden";
    const isLowCoreDevice = hardwareConcurrency <= 4;
    const isLowMemoryDevice = memory <= 4;
    const isReducedMotion = matchesQuery(REDUCED_MOTION_QUERY);
    const isTouchOnly = matchesQuery(TOUCH_ONLY_QUERY);
    const profile = {
        isCompactViewport,
        isDocumentHidden,
        isLowCoreDevice,
        isLowMemoryDevice,
        isReducedMotion,
        isTouchOnly,
    };

    return {
        ...profile,
        tier: getScenePerformanceTier(profile),
    };
};

export const isSameScenePerformanceProfile = (
    current: ScenePerformanceProfile,
    next: ScenePerformanceProfile
) =>
    current.isCompactViewport === next.isCompactViewport &&
    current.isDocumentHidden === next.isDocumentHidden &&
    current.isLowCoreDevice === next.isLowCoreDevice &&
    current.isLowMemoryDevice === next.isLowMemoryDevice &&
    current.isReducedMotion === next.isReducedMotion &&
    current.isTouchOnly === next.isTouchOnly &&
    current.tier === next.tier;

export const SCENE_PERFORMANCE_MEDIA_QUERIES = [
    COMPACT_VIEWPORT_QUERY,
    REDUCED_MOTION_QUERY,
    TOUCH_ONLY_QUERY,
] as const;
