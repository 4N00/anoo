'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Admin from "../../pages/Admin";
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.replace('/login');
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <Admin />;
}