import AdminPageClient from '@/components/admin/AdminPageClient';
import { ProjectsProvider } from '@/context/ProjectsContext';

// Force SSR for admin pages
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function AdminPage() {
  return (
    <ProjectsProvider>
      <AdminPageClient />
    </ProjectsProvider>
  );
}
