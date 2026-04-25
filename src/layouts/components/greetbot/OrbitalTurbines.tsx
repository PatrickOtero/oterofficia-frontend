import type { CSSProperties } from "react";

const turbines = [
    { delay: "0s", size: "1.06rem" },
    { delay: "-2.4s", size: "0.94rem" },
    { delay: "-4.8s", size: "0.88rem" },
];

type OrbitalTurbinesProps = {
    hovered: boolean;
};

type OrbitLayerProps = OrbitalTurbinesProps & {
    depth: "back" | "front";
};

const createOrbitStyle = (delay: string, size: string, hovered: boolean): CSSProperties =>
    ({
        "--orbit-delay": delay,
        "--turbine-size": size,
        "--turbine-glow-scale": hovered ? "1.08" : "1",
    }) as CSSProperties;

const TurbineNode = ({ delay, hovered, index, layer, size }: {
    delay: string;
    hovered: boolean;
    index: number;
    layer: OrbitLayerProps["depth"];
    size: string;
}) => (
    <div className="orbit-item" key={`${layer}-${index}`} style={createOrbitStyle(delay, size, hovered)}>
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
);

const OrbitLayer = ({ depth, hovered }: OrbitLayerProps) => (
    <div className={`orbit-layer orbit-layer-${depth}`} aria-hidden="true">
        {turbines.map(({ delay, size }, index) => (
            <TurbineNode delay={delay} hovered={hovered} index={index} key={`${depth}-${index}`} layer={depth} size={size} />
        ))}
    </div>
);

export const OrbitalTurbines = ({ hovered }: OrbitalTurbinesProps) => (
    <>
        <OrbitLayer depth="back" hovered={hovered} />
        <OrbitLayer depth="front" hovered={hovered} />
    </>
);
