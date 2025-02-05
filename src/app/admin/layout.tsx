import React from 'react';
import AdminClient from '@/components/admin/AdminClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminClient>{children}</AdminClient>;
}