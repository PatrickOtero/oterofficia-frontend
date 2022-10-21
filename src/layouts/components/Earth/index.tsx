import { EarthContainer } from "./earth.style";

export const PlanetEarth = ({earthPosition}: {earthPosition: string}) => {
    return (
        <>
        <EarthContainer>
            <div className={`earth-main ${earthPosition}`}>
                
            </div>
        </EarthContainer>
        </>
    );
}