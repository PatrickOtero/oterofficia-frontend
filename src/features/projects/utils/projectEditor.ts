import { ProjectFormValues, ProjectRecord } from "../types/project";

const normalizeOptionalUrl = (value: string) => {
  const normalized = value.trim();
  return normalized.length ? normalized : null;
};

const normalizeOptionalString = (value: string) => {
  const normalized = value.trim();
  return normalized.length ? normalized : null;
};

export const parseProjectTagsInput = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

export const formatProjectTagsInput = (tags: string[]) => tags.join(", ");

export const createEmptyProjectForm = (): ProjectFormValues => ({
  backendUrl: "",
  frontendUrl: "",
  imageUrl: "",
  organizationName: "",
  projectDescription: "",
  projectHighlight: "",
  projectName: "",
  projectRole: "",
  projectStatus: "completed",
  projectTags: [],
  projectTrack: "personal",
  videoUrl: "",
});

export const mapProjectFormToPayload = (form: ProjectFormValues) => ({
  backend_url: normalizeOptionalUrl(form.backendUrl),
  frontend_url: normalizeOptionalUrl(form.frontendUrl),
  image_url: form.imageUrl.trim(),
  organization_name: normalizeOptionalString(form.organizationName),
  project_desc: form.projectDescription.trim(),
  project_highlight: normalizeOptionalString(form.projectHighlight),
  project_name: form.projectName.trim(),
  project_role: normalizeOptionalString(form.projectRole),
  project_status: form.projectStatus,
  project_tags: form.projectTags,
  project_track: form.projectTrack,
  video_url: normalizeOptionalUrl(form.videoUrl),
});

export const mapProjectToFormValues = (project: ProjectRecord): ProjectFormValues => ({
  backendUrl: project.backend_url || "",
  frontendUrl: project.frontend_url || "",
  imageUrl: project.image_url,
  organizationName: project.organization_name || "",
  projectDescription: project.project_desc,
  projectHighlight: project.project_highlight || "",
  projectName: project.project_name,
  projectRole: project.project_role || "",
  projectStatus: project.project_status,
  projectTags: project.project_tags,
  projectTrack: project.project_track,
  videoUrl: project.video_url || "",
});
