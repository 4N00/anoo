'use client';

import React from 'react';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

interface AdminClientProps {
  children: React.ReactNode;
}

const AdminClient: React.FC<AdminClientProps> = ({ children }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { user, isAdmin, isLoading } = useAuth();

  React.useEffect(() => {
    // Only redirect if we're done loading and either no user or not admin
    if (!isLoading && (!user || !isAdmin)) {
      showToast('Admin access required', 'error');
      router.replace('/login');
    }
  }, [user, isAdmin, isLoading, router, showToast]);

  // Show loading state while checking auth
  if (isLoading) {
    return <LoadingContainer>Checking authentication...</LoadingContainer>;
  }

  // If we have a user and they're an admin, show the content
  if (user && isAdmin) {
    return <AdminContainer>{children}</AdminContainer>;
  }

  // Show loading while redirecting
  return <LoadingContainer>Redirecting to login...</LoadingContainer>;
};

export default AdminClient;