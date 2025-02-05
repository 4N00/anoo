import React from 'react';
import { headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import AdminClient from '@/components/admin/AdminClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get user profile to check admin status
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session?.user?.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  return (
    <AdminClient isAdmin={isAdmin}>
      {children}
    </AdminClient>
  );
}