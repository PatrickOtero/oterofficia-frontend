import { api } from "../../../services/axios";
import { SiteVisitorSummary } from "../types/robotInsights";

export const robotInsightsApi = {
  async fetchSiteVisitorSummary(params?: { since?: string | null; until?: string | null }) {
    const response = await api.get<SiteVisitorSummary>("/admin/engagement/site-visits/summary", {
      params: {
        since: params?.since ?? undefined,
        until: params?.until ?? undefined,
      },
    });
    return response.data;
  },

  async trackSiteVisit(payload: { path?: string | null; referrer?: string | null; visitorKey: string }) {
    await api.post("/site-visits/track", payload);
  },
};
