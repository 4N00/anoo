'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.nav`
  background: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.secondary};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
`;

const NavContent = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserEmail = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const Main = styled.main`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.replace('/login');
          return;
        }

        // Check if user is admin
        const { data: profile } = await supabase
          .from('User')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!profile || profile.role !== 'ADMIN') {
          router.replace('/');
          return;
        }

        setUserEmail(session.user.email ?? null);
      } catch (error) {
        console.error('Auth check error:', error);
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/login');
      } else if (event === 'SIGNED_IN' && session) {
        setUserEmail(session.user.email ?? null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <LayoutContainer>
        <Navbar>
          <NavContent>
            <NavTitle>Admin Dashboard</NavTitle>
          </NavContent>
        </Navbar>
        <Main>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Loading...
          </div>
        </Main>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <Navbar>
        <NavContent>
          <NavTitle>Admin Dashboard</NavTitle>
          <UserInfo>
            {userEmail && <UserEmail>{userEmail}</UserEmail>}
            <Button
              variant="outline"
              size="small"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </UserInfo>
        </NavContent>
      </Navbar>
      <Main>{children}</Main>
    </LayoutContainer>
  );
}