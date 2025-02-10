'use client';

import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          throw new Error('Not authenticated');
        }

        const { data: userData, error: roleError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (roleError || !userData || userData.role !== 'ADMIN') {
          throw new Error('Admin access required');
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check error:', error);
        showToast('Admin access required', 'error');
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthorized(false);
        router.replace('/login');
      } else if (event === 'SIGNED_IN' && session) {
        checkAuth();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, showToast]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <LoadingContainer>
        Checking authentication...
      </LoadingContainer>
    );
  }

  // Show loading state while redirecting
  if (!isAuthorized) {
    return (
      <LoadingContainer>
        Redirecting to login...
      </LoadingContainer>
    );
  }

  // Only render children if authorized
  return <AdminContainer>{children}</AdminContainer>;
};

export default AdminClient;