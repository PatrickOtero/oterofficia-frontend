type JupiterRingProps = {
    className: string;
    gradientId: string;
    segment: "back" | "front";
};

const ringArcPath = {
    back: {
        main: "M52 180 C260 68 940 68 1148 180",
        inner: "M80 180 C282 76 918 76 1120 180",
        middle: "M112 180 C306 86 894 86 1088 180",
        dust: "M152 180 C336 98 864 98 1048 180",
    },
    front: {
        main: "M52 180 C260 292 940 292 1148 180",
        inner: "M80 180 C282 284 918 284 1120 180",
        middle: "M112 180 C306 274 894 274 1088 180",
        dust: "M152 180 C336 262 864 262 1048 180",
    },
};

export const JupiterRing = ({ className, gradientId, segment }: JupiterRingProps) => {
    const paths = ringArcPath[segment];

    return (
    <div aria-hidden="true" className={className}>
        <svg preserveAspectRatio="none" viewBox="0 0 1200 360">
            <defs>
                <linearGradient id={gradientId} x1="0%" x2="100%" y1="50%" y2="50%">
                    <stop offset="0%" stopColor="#c9a47e" stopOpacity="0" />
                    <stop offset="14%" stopColor="#d2b18c" stopOpacity="0.24" />
                    <stop offset="42%" stopColor="#fff0d2" stopOpacity="0.42" />
                    <stop offset="58%" stopColor="#d7b48c" stopOpacity="0.3" />
                    <stop offset="84%" stopColor="#b58f71" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#c9a47e" stopOpacity="0" />
                </linearGradient>
            </defs>

            <path d={paths.main} fill="none" stroke={`url(#${gradientId})`} strokeLinecap="round" strokeWidth="10" />
            <path d={paths.inner} fill="none" stroke="#fff0cf" strokeLinecap="round" strokeOpacity="0.24" strokeWidth="4" />
            <path d={paths.middle} fill="none" stroke="#c49b77" strokeLinecap="round" strokeOpacity="0.22" strokeWidth="5" />
            <path d={paths.dust} fill="none" stroke="#f4dcc0" strokeDasharray="14 18" strokeLinecap="round" strokeOpacity="0.16" strokeWidth="3" />
        </svg>
    </div>
    );
};
