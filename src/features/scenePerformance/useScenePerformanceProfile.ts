import { useEffect, useState } from "react";
import {
    isSameScenePerformanceProfile,
    resolveScenePerformanceProfile,
    SCENE_PERFORMANCE_MEDIA_QUERIES,
} from "./scenePerformance.utils";

export const useScenePerformanceProfile = () => {
    const [profile, setProfile] = useState(resolveScenePerformanceProfile);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        let frameId = 0;

        const commitProfile = () => {
            if (frameId) {
                return;
            }

            frameId = window.requestAnimationFrame(() => {
                frameId = 0;
                setProfile((currentProfile) => {
                    const nextProfile = resolveScenePerformanceProfile();

                    return isSameScenePerformanceProfile(currentProfile, nextProfile)
                        ? currentProfile
                        : nextProfile;
                });
            });
        };

        const mediaQueries = SCENE_PERFORMANCE_MEDIA_QUERIES.map((query) => window.matchMedia(query));

        mediaQueries.forEach((mediaQuery) => {
            mediaQuery.addEventListener("change", commitProfile);
        });

        document.addEventListener("visibilitychange", commitProfile);
        window.addEventListener("resize", commitProfile, { passive: true });

        return () => {
            window.cancelAnimationFrame(frameId);
            mediaQueries.forEach((mediaQuery) => {
                mediaQuery.removeEventListener("change", commitProfile);
            });
            document.removeEventListener("visibilitychange", commitProfile);
            window.removeEventListener("resize", commitProfile);
        };
    }, []);

    return profile;
};
