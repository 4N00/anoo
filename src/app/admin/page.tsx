import React from 'react';
import { headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { toProjectUI } from '@/types/project';
import Admin from '@/pages/Admin';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

async function getProjects() {
  const headersList = headers();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get() {
          return headersList.get('cookie');
        },
      },
    }
  );

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