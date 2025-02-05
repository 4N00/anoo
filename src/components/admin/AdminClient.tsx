'use client';

import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';

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
  isAdmin: boolean;
}

const AdminClient: React.FC<AdminClientProps> = ({ children, isAdmin }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <LoadingContainer>
        Redirecting to login...
      </LoadingContainer>
    );
  }

  return <AdminContainer>{children}</AdminContainer>;
};

export default AdminClient;