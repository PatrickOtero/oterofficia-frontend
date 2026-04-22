import { useEffect, useState } from "react";

const getIsTouchDevice = () => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
    }

    return window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches;
};

export const useTouchDevice = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(getIsTouchDevice);

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
            return;
        }

        const hoverMediaQuery = window.matchMedia("(hover: none)");
        const pointerMediaQuery = window.matchMedia("(pointer: coarse)");
        const syncTouchDevice = () => {
            setIsTouchDevice(hoverMediaQuery.matches || pointerMediaQuery.matches);
        };

        syncTouchDevice();

        if (typeof hoverMediaQuery.addEventListener === "function") {
            hoverMediaQuery.addEventListener("change", syncTouchDevice);
            pointerMediaQuery.addEventListener("change", syncTouchDevice);

            return () => {
                hoverMediaQuery.removeEventListener("change", syncTouchDevice);
                pointerMediaQuery.removeEventListener("change", syncTouchDevice);
            };
        }

        hoverMediaQuery.addListener(syncTouchDevice);
        pointerMediaQuery.addListener(syncTouchDevice);

        return () => {
            hoverMediaQuery.removeListener(syncTouchDevice);
            pointerMediaQuery.removeListener(syncTouchDevice);
        };
    }, []);

    return isTouchDevice;
};
