import { memo } from "react";
import { SaturnContainer } from "./saturn.style";

const SaturnRing = ({ className, gradientId }: { className: string; gradientId: string }) => (
    <div aria-hidden="true" className={className}>
        <svg preserveAspectRatio="none" viewBox="0 0 1200 420">
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

            <ellipse cx="600" cy="210" fill="none" rx="512" ry="120" stroke={`url(#${gradientId})`} strokeWidth="22" />
            <ellipse cx="600" cy="210" fill="none" rx="492" ry="116" stroke="#f8e2c2" strokeOpacity="0.28" strokeWidth="20" />
            <ellipse cx="600" cy="210" fill="none" rx="468" ry="110" stroke="#8d6342" strokeOpacity="0.16" strokeWidth="12" />
            <ellipse cx="600" cy="210" fill="none" rx="452" ry="106" stroke="#fff3dd" strokeOpacity="0.36" strokeWidth="14" />
            <ellipse cx="600" cy="210" fill="none" rx="430" ry="100" stroke="#c99a6a" strokeOpacity="0.18" strokeWidth="10" />
            <ellipse cx="600" cy="210" fill="none" rx="414" ry="96" stroke="#fff8eb" strokeOpacity="0.28" strokeWidth="8" />
            <ellipse cx="600" cy="210" fill="none" rx="396" ry="92" stroke="#7a5338" strokeOpacity="0.14" strokeWidth="9" />
            <ellipse cx="600" cy="210" fill="none" rx="382" ry="88" stroke="#f4dcc0" strokeOpacity="0.22" strokeWidth="7" />
        </svg>
    </div>
);

export const PlanetSaturn = memo(({ planetPosition }: { planetPosition: string }) => (
    <SaturnContainer>
        <div className={`saturn-main ${planetPosition}`}>
            <div className="saturn-ring-glow" aria-hidden="true" />
            <SaturnRing className="saturn-ring-art saturn-ring-back" gradientId="saturn-ring-back-gradient" />
            <div className="saturn-body">
                <div className="saturn-map-track">
                    <div className="saturn-map-panel" />
                    <div className="saturn-map-panel" />
                </div>
            </div>
            <SaturnRing className="saturn-ring-art saturn-ring-front" gradientId="saturn-ring-front-gradient" />
        </div>
    </SaturnContainer>
));
