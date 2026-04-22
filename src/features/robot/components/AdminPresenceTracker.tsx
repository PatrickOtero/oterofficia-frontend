import { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  clearAdminPresenceSession,
  ensureAdminPresenceSession,
  markAdminPresence,
} from "../utils/adminPresenceWindow";

export const AdminPresenceTracker = () => {
  const { isAdmin, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin || !user) {
      clearAdminPresenceSession();
      return;
    }

    ensureAdminPresenceSession(user.id);

    const syncPresence = () => {
      markAdminPresence(user.id);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        syncPresence();
      }
    };

    syncPresence();

    const intervalId = window.setInterval(syncPresence, 15000);
    window.addEventListener("beforeunload", syncPresence);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      syncPresence();
      window.clearInterval(intervalId);
      window.removeEventListener("beforeunload", syncPresence);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAdmin, isAuthenticated, user]);

  return null;
};
