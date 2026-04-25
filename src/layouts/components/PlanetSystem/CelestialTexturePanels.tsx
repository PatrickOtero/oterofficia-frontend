type CelestialTexturePanelsProps = {
    panelClassName: string;
    trackClassName: string;
};

export const CelestialTexturePanels = ({ panelClassName, trackClassName }: CelestialTexturePanelsProps) => (
    <div className={trackClassName}>
        <div className={panelClassName} />
        <div className={panelClassName} />
    </div>
);
