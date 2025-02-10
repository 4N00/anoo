import React from 'react';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { toProjectUI } from '@/types/project';
import Admin from '@/pages/Admin';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

async function getProjects() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: { path?: string }) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: { path?: string }) {
          cookieStore.set({ name, value: '', ...options });
        }
      }
    }
  );

  // Verify session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return [];
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return (projects || []).map(toProjectUI);
}

export default async function AdminPage() {
  const initialProjects = await getProjects();
  return <Admin initialProjects={initialProjects} />;
}