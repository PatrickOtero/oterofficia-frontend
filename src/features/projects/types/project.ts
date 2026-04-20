export type ProjectStatus = "completed" | "in_progress";
export type ProjectTrack = "personal" | "soujunior";

export interface ProjectRecord {
  backend_url: string | null;
  frontend_url: string | null;
  id: number;
  image_url: string;
  organization_name: string | null;
  project_desc: string;
  project_highlight: string | null;
  project_name: string;
  project_role: string | null;
  project_status: ProjectStatus;
  project_tags: string[];
  project_track: ProjectTrack;
  video_url: string | null;
}

export interface ProjectFormValues {
  backendUrl: string;
  frontendUrl: string;
  imageUrl: string;
  organizationName: string;
  projectDescription: string;
  projectHighlight: string;
  projectName: string;
  projectRole: string;
  projectStatus: ProjectStatus;
  projectTags: string[];
  projectTrack: ProjectTrack;
  videoUrl: string;
}
