export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  category: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  version: number;
}

export interface ProjectListItem extends Project {}

export interface ProjectDetails extends Project {}

export interface ProjectCreateInput {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  category: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  authorId: string;
}

export interface ProjectUpdateInput {
  title?: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  featured?: boolean;
  category?: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
}

export interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  category: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ProjectError {
  message: string;
  code?: string;
}

export interface UseProjectsReturn {
  projects: ProjectListItem[];
  isLoading: boolean;
  error: ProjectError | null;
}

export interface UseProjectMutationReturn {
  mutate: (data: ProjectFormData) => Promise<void>;
  isLoading: boolean;
  error: ProjectError | null;
}