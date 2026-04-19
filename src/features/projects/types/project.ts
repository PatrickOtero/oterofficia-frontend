export interface ProjectRecord {
  backend_url: string | null;
  frontend_url: string | null;
  id: number;
  image_url: string;
  project_desc: string;
  project_name: string;
  video_url: string | null;
}

export interface ProjectFormValues {
  backendUrl: string;
  frontendUrl: string;
  imageUrl: string;
  projectDescription: string;
  projectName: string;
  videoUrl: string;
}