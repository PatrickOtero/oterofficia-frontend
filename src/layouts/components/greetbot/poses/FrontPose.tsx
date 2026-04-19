import { PoseSkeleton } from "./PoseSkeleton";

type Props = {
    visorPosition: string;
    eyeState: string;
    hologramActivated: boolean;
};

export const FrontPose = ({ visorPosition, eyeState, hologramActivated }: Props) => {
    return (
        <PoseSkeleton
            eyeState={eyeState}
            hologramActivated={hologramActivated}
            visorPosition={visorPosition}
        />
    );
};