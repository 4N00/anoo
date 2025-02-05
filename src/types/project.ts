export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  featured: boolean;
  github_url: string | null;
  live_url: string | null;
  created_at: string;
  updated_at: string;
  version: number;
}

// Type for the database response
export type ProjectResponse = Project;

// Type for displaying in the UI (camelCase)
export interface ProjectUI {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  githubUrl: string | null;
  liveUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  githubUrl?: string | null;
  liveUrl?: string | null;
}

// Convert database response to UI format
export const toProjectUI = (project: Project): ProjectUI => ({
  id: project.id,
  title: project.title,
  description: project.description,
  imageUrl: project.image_url,
  tags: project.tags,
  featured: project.featured,
  githubUrl: project.github_url,
  liveUrl: project.live_url,
  createdAt: new Date(project.created_at),
  updatedAt: new Date(project.updated_at),
  version: project.version,
});

// Convert UI format to database format
export const toProjectDB = (data: ProjectFormData): Omit<Project, 'id' | 'created_at' | 'updated_at' | 'version'> => ({
  title: data.title,
  description: data.description,
  image_url: data.imageUrl,
  tags: data.tags,
  featured: data.featured,
  github_url: data.githubUrl || null,
  live_url: data.liveUrl || null,
});

export interface ProjectError {
  message: string;
  code?: string;
}

export interface UseProjectsReturn {
  projects: ProjectUI[];
  isLoading: boolean;
  error: ProjectError | null;
}

export interface UseProjectMutationReturn {
  mutate: (data: ProjectFormData) => Promise<void>;
  isLoading: boolean;
  error: ProjectError | null;
}