'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { styled } from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.primary};
`;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, isLoading, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're done loading and the user is definitely not an admin
    if (!isLoading && (!session || !isAdmin)) {
      // Use window.location for a hard redirect
      window.location.href = '/login';
    }
  }, [isAdmin, isLoading, session]);

  if (isLoading) {
    return (
      <LoadingContainer>
        Loading...
      </LoadingContainer>
    );
  }

  // Don't render anything if not authenticated or not admin
  if (!session || !isAdmin) {
    return null;
  }

  // Only render the admin content if we're authenticated and an admin
  return children;
}