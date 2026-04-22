import { api } from "../../../services/axios";
import { NotificationFeed } from "../types/notification";

export const notificationsApi = {
  async fetchFeed(limit = 18) {
    const response = await api.get<NotificationFeed>("/notifications", {
      params: { limit },
    });

    return response.data;
  },

  async markAllAsRead() {
    const response = await api.post<NotificationFeed>("/notifications/read-all");
    return response.data;
  },

  async markAsRead(notificationId: string) {
    const response = await api.post<NotificationFeed>(`/notifications/${notificationId}/read`);
    return response.data;
  },
};
