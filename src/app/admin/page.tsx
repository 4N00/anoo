'use client';

import { useEffect } from 'react';
import Admin from "../../pages/Admin";
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

export default function AdminPage() {
  const { isAdmin, isLoading, session } = useAuth();

  // Let the middleware handle redirects
  if (isLoading) {
    return (
      <LoadingContainer>
        Loading...
      </LoadingContainer>
    );
  }

  // Don't render anything if not authenticated or not admin
  // The middleware will handle the redirect
  if (!session || !isAdmin) {
    return null;
  }

  // Only render the admin component if we're authenticated and an admin
  return <Admin />;
}