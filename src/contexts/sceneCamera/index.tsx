import { createContext } from "react";
import type { ICompProps } from "../../@Types/context/contexts";
import { useSceneCamera } from "../../hooks/useSceneCamera";

const sceneCameraContext = createContext<ReturnType<typeof useSceneCamera>>({} as ReturnType<typeof useSceneCamera>);

export const SceneCameraProvider = ({ children }: ICompProps) => {
    const cameraController = useSceneCamera();

    return <sceneCameraContext.Provider value={cameraController}>{children}</sceneCameraContext.Provider>;
};

export default sceneCameraContext;
