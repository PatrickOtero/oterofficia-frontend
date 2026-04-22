import { useBotFunctionsContext } from "../../../hooks/useBotFunctionsContext";
import { PlanetEarth } from "../Earth";
import { PlanetMars } from "../Mars";
import { MarsMoons } from "../MarsMoons";
import { Moon } from "../Moon";

type PlanetSystemProps = {
    planetPosition: string;
};

export const PlanetSystem = ({ planetPosition }: PlanetSystemProps) => {
    const { spaceTheme } = useBotFunctionsContext();

    if (spaceTheme === "mars") {
        return (
            <>
                <MarsMoons />
                <PlanetMars planetPosition={planetPosition} />
            </>
        );
    }

    return (
        <>
            <Moon />
            <PlanetEarth earthPosition={planetPosition} />
        </>
    );
};
