import { z } from 'zod';
import { projectValidation } from '@/utils/validation';

// Base Project type from validation schema
export type Project = z.infer<typeof projectValidation.create> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  version: number;
};

// Project input types
export type CreateProjectInput = z.infer<typeof projectValidation.create>;
export type UpdateProjectInput = z.infer<typeof projectValidation.update>;

// Project with required fields for form state
export type ProjectFormData = CreateProjectInput;

// Project list item type (used in grid/list views)
export type ProjectListItem = Pick<
  Project,
  'id' | 'title' | 'description' | 'imageUrl' | 'tags' | 'featured' | 'githubUrl' | 'liveUrl'
> & {
  createdAt: string;
};

// Project details type (used in single project view)
export type ProjectDetails = Omit<Project, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    email: string;
  };
};

// Project filter options
export interface ProjectFilters {
  search?: string;
  tags?: string[];
  featured?: boolean;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Project pagination options
export interface ProjectPagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Project API response types
export interface ProjectsResponse {
  data: ProjectListItem[];
  pagination: ProjectPagination;
}

export interface ProjectResponse {
  data: ProjectDetails;
}

// Project error types
export interface ProjectError {
  message: string;
  code?: string;
  field?: string;
}

// Project state types
export interface ProjectState {
  items: ProjectListItem[];
  selected: ProjectDetails | null;
  loading: boolean;
  error: ProjectError | null;
  filters: ProjectFilters;
  pagination: ProjectPagination;
}

// Project action types
export type ProjectAction =
  | { type: 'SET_ITEMS'; payload: ProjectListItem[] }
  | { type: 'SET_SELECTED'; payload: ProjectDetails | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: ProjectError | null }
  | { type: 'SET_FILTERS'; payload: ProjectFilters }
  | { type: 'SET_PAGINATION'; payload: ProjectPagination }
  | { type: 'RESET_STATE' };

// Project context types
export interface ProjectContextType {
  state: ProjectState;
  dispatch: React.Dispatch<ProjectAction>;
}

// Project hook return type
export interface UseProjectsReturn {
  projects: ProjectListItem[];
  loading: boolean;
  error: ProjectError | null;
  filters: ProjectFilters;
  pagination: ProjectPagination;
  setFilters: (filters: ProjectFilters) => void;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
}

// Project mutation hook return type
export interface UseProjectMutationReturn {
  createProject: (data: CreateProjectInput) => Promise<ProjectDetails>;
  updateProject: (id: string, data: UpdateProjectInput) => Promise<ProjectDetails>;
  deleteProject: (id: string) => Promise<void>;
  loading: boolean;
  error: ProjectError | null;
}