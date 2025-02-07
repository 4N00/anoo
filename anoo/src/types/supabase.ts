export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          github_url: string | null;
          live_url: string | null;
          tags: string[];
          featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
          version: number;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image_url: string;
          github_url?: string | null;
          live_url?: string | null;
          tags: string[];
          featured?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
          version?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image_url?: string;
          github_url?: string | null;
          live_url?: string | null;
          tags?: string[];
          featured?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
          version?: number;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          role: 'USER' | 'ADMIN';
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          email: string;
          role?: 'USER' | 'ADMIN';
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'USER' | 'ADMIN';
          createdAt?: string;
          updatedAt?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      Role: 'USER' | 'ADMIN';
    };
  };
};

// Helper types for better DX
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Specific table types
export type Project = Tables<'projects'>;
export type User = Tables<'users'>;

// Role type
export type Role = Enums<'Role'>;

// Auth types
export interface Session {
  user: {
    id: string;
    email?: string;
    role?: Role;
  };
  expires_at: number;
}

export interface AuthError {
  message: string;
  status?: number;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Query params types
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  featured?: boolean;
  tags?: string[];
}
