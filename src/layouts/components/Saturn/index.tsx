import { memo } from "react";
import { CelestialTexturePanels } from "../PlanetSystem/CelestialTexturePanels";
import { createPlanetInclinationStyle } from "../PlanetSystem/planetaryInclinations";
import { SaturnContainer } from "./saturn.style";

const SaturnRing = ({ className, gradientId }: { className: string; gradientId: string }) => (
    <div aria-hidden="true" className={className}>
        <svg preserveAspectRatio="none" viewBox="0 0 1200 520">
            <defs>
                <linearGradient id={gradientId} x1="0%" x2="100%" y1="50%" y2="50%">
                    <stop offset="0%" stopColor="#f0cfaa" stopOpacity="0.1" />
                    <stop offset="16%" stopColor="#fff2d8" stopOpacity="0.58" />
                    <stop offset="34%" stopColor="#d6a673" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#fff9ea" stopOpacity="0.92" />
                    <stop offset="66%" stopColor="#b97f53" stopOpacity="0.26" />
                    <stop offset="84%" stopColor="#fff2d9" stopOpacity="0.54" />
                    <stop offset="100%" stopColor="#f1d1aa" stopOpacity="0.08" />
                </linearGradient>
            </defs>

            <ellipse cx="600" cy="260" fill="none" rx="552" ry="155" stroke={`url(#${gradientId})`} strokeWidth="38" />
            <ellipse cx="600" cy="260" fill="none" rx="524" ry="147" stroke="#f8e2c2" strokeOpacity="0.3" strokeWidth="32" />
            <ellipse cx="600" cy="260" fill="none" rx="492" ry="138" stroke="#8d6342" strokeOpacity="0.18" strokeWidth="18" />
            <ellipse cx="600" cy="260" fill="none" rx="468" ry="130" stroke="#fff3dd" strokeOpacity="0.38" strokeWidth="20" />
            <ellipse cx="600" cy="260" fill="none" rx="438" ry="122" stroke="#c99a6a" strokeOpacity="0.2" strokeWidth="16" />
            <ellipse cx="600" cy="260" fill="none" rx="412" ry="114" stroke="#fff8eb" strokeOpacity="0.3" strokeWidth="12" />
            <ellipse cx="600" cy="260" fill="none" rx="384" ry="106" stroke="#7a5338" strokeOpacity="0.16" strokeWidth="13" />
            <ellipse cx="600" cy="260" fill="none" rx="360" ry="100" stroke="#f4dcc0" strokeOpacity="0.24" strokeWidth="10" />
        </svg>
    </div>
);

export const PlanetSaturn = memo(({ planetPosition }: { planetPosition: string }) => (
    <SaturnContainer style={createPlanetInclinationStyle("saturn")}>
        <div className={`saturn-main ${planetPosition}`}>
            <div className="saturn-ring-glow" aria-hidden="true" />
            <SaturnRing className="saturn-ring-art saturn-ring-back" gradientId="saturn-ring-back-gradient" />
            <div className="saturn-body">
                <CelestialTexturePanels panelClassName="saturn-map-panel" trackClassName="saturn-map-track" />
            </div>
            <SaturnRing className="saturn-ring-art saturn-ring-front" gradientId="saturn-ring-front-gradient" />
        </div>
    </SaturnContainer>
));
