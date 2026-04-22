import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { notificationsApi } from "../../features/notifications/api/notificationsApi";
import { NotificationContextValue, NotificationFeed } from "../../features/notifications/types/notification";

type NotificationProviderProps = {
  children: React.ReactNode;
};

const initialFeed: NotificationFeed = {
  items: [],
  unreadCount: 0,
};

export const NotificationContext = createContext({} as NotificationContextValue);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const [feed, setFeed] = useState<NotificationFeed>(initialFeed);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setFeed(initialFeed);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await notificationsApi.fetchFeed();
      setFeed(response);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const markAllAsRead = useCallback(async () => {
    if (!isAuthenticated || !user) {
      return;
    }

    const response = await notificationsApi.markAllAsRead();
    setFeed(response);
  }, [isAuthenticated, user]);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!isAuthenticated || !user) {
        return;
      }

      const response = await notificationsApi.markAsRead(notificationId);
      setFeed(response);
    },
    [isAuthenticated, user]
  );

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated || !user) {
      setFeed(initialFeed);
      setIsLoading(false);
      return;
    }

    void refreshNotifications();
  }, [isAuthenticated, isAuthLoading, refreshNotifications, user]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void refreshNotifications();
      }
    }, 28000);

    const handleFocus = () => {
      void refreshNotifications();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isAuthenticated, refreshNotifications, user]);

  const value = useMemo<NotificationContextValue>(
    () => ({
      feed,
      isLoading,
      markAllAsRead,
      markAsRead,
      refreshNotifications,
    }),
    [feed, isLoading, markAllAsRead, markAsRead, refreshNotifications]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
