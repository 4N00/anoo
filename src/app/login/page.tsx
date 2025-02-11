'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Container, LoginCard, Title, Form, ErrorMessage } from './styles';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { FormInput } from '@/styles/ContactStyles';
import Button from '@/components/ui/button/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { showToast } = useToast();
  const auth = useAuth();

  // Only show loading state if we're actually in a loading state
  const isProcessing = isLoading || (auth?.isLoading ?? false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.refresh();
      router.replace('/admin');
      showToast('Successfully logged in', 'success');
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Failed to login');
      showToast(error instanceof Error ? error.message : 'Failed to login', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // If auth is not initialized yet, show nothing to prevent hydration mismatch
  if (!auth) {
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
            disabled={isProcessing}
            data-cy="email-input"
          />
          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            disabled={isProcessing}
            data-cy="password-input"
          />
          <Button type="submit" $variant="primary" disabled={isProcessing} data-cy="login-button">
            {isProcessing ? 'Logging in...' : 'Log In'}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginCard>
    </Container>
  );
}
