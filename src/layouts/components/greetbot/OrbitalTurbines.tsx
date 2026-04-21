import type { CSSProperties } from "react";

const turbines = [
    { delay: "0s", size: "1.06rem" },
    { delay: "-2.4s", size: "0.94rem" },
    { delay: "-4.8s", size: "0.88rem" },
];

type OrbitalTurbinesProps = {
    hovered: boolean;
};

const createOrbitStyle = (delay: string, size: string, hovered: boolean): CSSProperties =>
    ({
        "--orbit-delay": delay,
        "--turbine-size": size,
        "--turbine-glow-scale": hovered ? "1.08" : "1",
    }) as CSSProperties;

export const OrbitalTurbines = ({ hovered }: OrbitalTurbinesProps) => (
    <>
        <div className="orbit-layer orbit-layer-back" aria-hidden="true">
            {turbines.map(({ delay, size }, index) => (
                <div className="orbit-item" key={`back-${index}`} style={createOrbitStyle(delay, size, hovered)}>
                    <div className="orbit-node">
                        <div className="orbit-counter-spin">
                            <div className="turbine-shell">
                                <span className="turbine-core" />
                                <span className="turbine-bloom" />
                                <span className="turbine-trail" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="orbit-layer orbit-layer-front" aria-hidden="true">
            {turbines.map(({ delay, size }, index) => (
                <div className="orbit-item" key={`front-${index}`} style={createOrbitStyle(delay, size, hovered)}>
                    <div className="orbit-node">
                        <div className="orbit-counter-spin">
                            <div className="turbine-shell">
                                <span className="turbine-core" />
                                <span className="turbine-bloom" />
                                <span className="turbine-trail" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
);
