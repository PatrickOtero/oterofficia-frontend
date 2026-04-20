import { api } from "../../../services/axios";
import { AboutFormValues, AboutPage } from "../types/about";

const sanitizePayload = (payload: AboutFormValues) => ({
  blocks: payload.blocks.map((block) => ({
    data: block.data,
    id: block.id,
    type: block.type,
  })),
  seoDescription: payload.seoDescription || null,
  seoTitle: payload.seoTitle || null,
});

export const aboutApi = {
  async fetchAdminPage() {
    const response = await api.get<AboutPage>("/admin/about");
    return response.data;
  },

  async fetchPublicPage() {
    const response = await api.get<AboutPage>("/about");
    return response.data;
  },

  async updatePage(payload: AboutFormValues) {
    const response = await api.put<AboutPage>("/admin/about", sanitizePayload(payload));
    return response.data;
  },
};
