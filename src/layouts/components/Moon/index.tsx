import { memo } from "react";
import { MoonContainer } from "./moon.style";

type MoonProps = {
    placement?: "back" | "front";
};

export const Moon = memo(({ placement = "back" }: MoonProps) => (
    <MoonContainer data-placement={placement}>
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
