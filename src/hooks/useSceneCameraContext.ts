import { useContext } from "react";
import sceneCameraContext from "../contexts/sceneCamera";

export const useSceneCameraContext = () => useContext(sceneCameraContext);
