'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const LoginCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
  margin-top: 1rem;
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user is admin
        const { data: profile } = await supabase
          .from('User')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'ADMIN') {
          router.replace(from);
        }
      }
    };

    checkSession();
  }, [router, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (!data.session) {
        throw new Error('No session created');
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('User')
        .select('role')
        .eq('id', data.session.user.id)
        .single();

      if (!profile || profile.role !== 'ADMIN') {
        throw new Error('Admin access required');
      }

      router.replace(from);
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred during login'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard>
        <Title>Admin Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="email"
            disabled={isLoading}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            Log In
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginCard>
    </Container>
  );
}