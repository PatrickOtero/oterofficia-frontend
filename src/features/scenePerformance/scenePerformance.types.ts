export type ScenePerformanceTier = "rich" | "balanced" | "reduced";

export type ScenePerformanceProfile = {
    isCompactViewport: boolean;
    isDocumentHidden: boolean;
    isLowCoreDevice: boolean;
    isLowMemoryDevice: boolean;
    isReducedMotion: boolean;
    isTouchOnly: boolean;
    tier: ScenePerformanceTier;
};
