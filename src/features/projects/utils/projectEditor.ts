import { ProjectFormValues, ProjectRecord } from "../types/project";

const normalizeOptionalUrl = (value: string) => {
  const normalized = value.trim();
  return normalized.length ? normalized : null;
};

export const createEmptyProjectForm = (): ProjectFormValues => ({
  backendUrl: "",
  frontendUrl: "",
  imageUrl: "",
  projectDescription: "",
  projectName: "",
  videoUrl: "",
});

export const mapProjectFormToPayload = (form: ProjectFormValues) => ({
  backend_url: normalizeOptionalUrl(form.backendUrl),
  frontend_url: normalizeOptionalUrl(form.frontendUrl),
  image_url: form.imageUrl.trim(),
  project_desc: form.projectDescription.trim(),
  project_name: form.projectName.trim(),
  video_url: normalizeOptionalUrl(form.videoUrl),
});

export const mapProjectToFormValues = (project: ProjectRecord): ProjectFormValues => ({
  backendUrl: project.backend_url || "",
  frontendUrl: project.frontend_url || "",
  imageUrl: project.image_url,
  projectDescription: project.project_desc,
  projectName: project.project_name,
  videoUrl: project.video_url || "",
});