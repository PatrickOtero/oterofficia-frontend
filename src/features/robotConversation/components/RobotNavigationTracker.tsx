import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { recordRobotRouteEntry } from "../utils/robotConversationContext";

export const RobotNavigationTracker = () => {
  const location = useLocation();

  useEffect(() => {
    recordRobotRouteEntry({
      path: `${location.pathname}${location.search}`,
    });
  }, [location.pathname, location.search]);

  return null;
};
