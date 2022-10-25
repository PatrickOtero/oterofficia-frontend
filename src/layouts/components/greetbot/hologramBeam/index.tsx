import { HoloBeamContainer } from "./Hologram.style";

interface IHologramBeam  {
    eyeBeamPosition: string;
}

export const HologramBeam = ({ eyeBeamPosition }: IHologramBeam) => {
    return (
        <HoloBeamContainer>
            <div className={`greetBot-menu-hologram-light-beam eye-beam-1 ${eyeBeamPosition}`}></div>
            <div className={`greetBot-menu-hologram-light-beam eye-beam-2 ${eyeBeamPosition}`}></div>           
        </HoloBeamContainer>
    );
}