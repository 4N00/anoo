import AdminPageClient from '@/components/admin/AdminPageClient';
import { ProjectsProvider } from '@/context/ProjectsContext';

export default function AdminPage() {
  return (
    <ProjectsProvider>
      <AdminPageClient />
    </ProjectsProvider>
  );
}

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';
