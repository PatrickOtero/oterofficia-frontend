import { api } from "../../../services/axios";
import { ProjectFormValues, ProjectRecord } from "../types/project";
import { mapProjectFormToPayload } from "../utils/projectEditor";

export const projectsApi = {
  async createProject(payload: ProjectFormValues) {
    const response = await api.post<ProjectRecord>("/projects", mapProjectFormToPayload(payload));
    return response.data;
  },

  async deleteProject(projectId: string) {
    await api.delete(`/projects/${projectId}`);
  },

  async fetchProjectById(projectId: string) {
    const response = await api.get<ProjectRecord>(`/projects/${projectId}`);
    return response.data;
  },

  async fetchProjects() {
    const response = await api.get<ProjectRecord[]>("/projects");
    return response.data;
  },

  async updateProject(projectId: string, payload: ProjectFormValues) {
    const response = await api.put<ProjectRecord>(
      `/projects/${projectId}`,
      mapProjectFormToPayload(payload)
    );

    return response.data;
  },
};