import { memo } from "react";

type GenericCelestialRingProps = {
    className: string;
};

export const GenericCelestialRing = memo(({ className }: GenericCelestialRingProps) => (
    <div className={className} aria-hidden="true">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 360">
            <ellipse className="generic-ring-band generic-ring-band-main" cx="600" cy="180" fill="none" rx="550" ry="86" />
            <ellipse className="generic-ring-band generic-ring-band-inner" cx="600" cy="180" fill="none" rx="510" ry="80" />
            <ellipse className="generic-ring-band generic-ring-band-dust" cx="600" cy="180" fill="none" rx="470" ry="74" />
        </svg>
    </div>
));
