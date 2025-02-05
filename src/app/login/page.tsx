'use client';

import React, { useState, useEffect } from 'react';
import { supabase, isAdmin } from '@/lib/supabase';
import StyledButton from '@/components/ui/StyledButton';
import FormInput from '@/components/ui/FormInput';
import { Container, LoginCard, Title, Form, ErrorMessage } from './styles';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin: isAdminUser, session } = useAuth();
  const router = useRouter();

  // Redirect to admin if already logged in as admin
  useEffect(() => {
    if (session && isAdminUser) {
      window.location.href = '/admin';
    }
  }, [session, isAdminUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // First, try to sign in
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (!authData.session) {
        throw new Error('No session created');
      }

      // Check if user is admin
      const adminStatus = await isAdmin();

      if (!adminStatus) {
        throw new Error('Admin access required');
      }

      // Use window.location for a hard redirect
      window.location.href = '/admin';
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred during login'
      );
      setIsLoading(false);
    }
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <Container>
        <LoginCard>
          <Title>Loading...</Title>
        </LoginCard>
      </Container>
    );
  }

  // Don't show login form if already authenticated as admin
  if (session && isAdminUser) {
    return null;
  }

  return (
    <Container>
      <LoginCard>
        <Title>Admin Login</Title>
        <Form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="email"
            disabled={isLoading}
          />
          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            disabled={isLoading}
          />
          <StyledButton
            type="submit"
            $variant="primary"
            $fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </StyledButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginCard>
    </Container>
  );
}