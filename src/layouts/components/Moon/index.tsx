import { memo } from "react";
import { MoonContainer } from "./moon.style";

export const Moon = memo(() => (
    <MoonContainer>
        <div className="moon-orbit">
            <div className="moon-body">
                <div className="moon-surface">
                    <div className="moon-map-track">
                        <div className="moon-map-panel" />
                        <div className="moon-map-panel" />
                    </div>
                </div>
            </div>
        </div>
    </MoonContainer>
));
