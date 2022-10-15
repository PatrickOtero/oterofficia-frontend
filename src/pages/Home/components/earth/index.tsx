import { EarthContainer, MoonContainer } from "./earth.style";

export const PlanetEarth = () => {
    return (
        <>
        <EarthContainer></EarthContainer>
        <MoonContainer>
            <div className="moon-rotation-container">
            </div>
        </MoonContainer>
        </>
    );
}