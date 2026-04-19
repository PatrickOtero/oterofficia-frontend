import { api } from "../../../services/axios";

export type UploadFolder = "projects" | "study-content" | "study-covers";

type UploadResponse = {
  fallbackUsed: boolean;
  fileName: string;
  folder: UploadFolder;
  key: string;
  mimeType: string;
  size: number;
  source: "cloudflare" | "local";
  url: string;
};

export const uploadsApi = {
  async uploadImage(file: File, folder: UploadFolder) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("folder", folder);

    const response = await api.post<UploadResponse>("/admin/uploads", formData);

    return response.data;
  },
};