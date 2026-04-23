import { BellSimpleRinging, Camera, ChatsCircle, RocketLaunch } from "phosphor-react";
import type { RobotQuickMenuAction } from "./RobotQuickMenu.types";

const iconSize = 24;

export const renderQuickMenuIcon = (action: RobotQuickMenuAction) => {
    if (action.id === "notification") {
        return <BellSimpleRinging size={iconSize} weight={action.iconWeight || "regular"} />;
    }

    if (action.id === "travel") {
        return <RocketLaunch size={iconSize} weight={action.iconWeight || "fill"} />;
    }

    if (action.id === "camera") {
        return <Camera size={iconSize} weight={action.iconWeight || "fill"} />;
    }

    return <ChatsCircle size={iconSize} weight={action.iconWeight || "fill"} />;
};
