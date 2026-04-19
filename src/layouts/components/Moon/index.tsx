import { MoonContainer } from "./moon.style";

export const Moon = () => {
    return (
        <MoonContainer>
            <div className="moon-orbit">
                <div className="moon-body">
                    <div className="moon-surface" />
                </div>
            </div>
        </MoonContainer>
    );
};