import { supabase } from '@/lib/supabase';
import { toProjectUI } from '@/types/project';
import HomeClient from '@/components/home/HomeClient';

// This function runs at build time in production
export async function generateStaticParams() {
  return [{}]; // Single static instance
}

// Static data fetching at build time
async function getProjects() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return (projects || []).map(toProjectUI);
}

export default async function Home() {
  const projects = await getProjects();

  return <HomeClient initialProjects={projects} />;
}

// Force static rendering
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
