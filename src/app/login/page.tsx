'use client';

/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import StyledButton from '@/components/ui/StyledButton';
import FormInput from '@/components/ui/FormInput';
import { Container, LoginCard, Title, Form, ErrorMessage } from './styles';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('Attempting to sign in...', { email });

      // First, try to sign in
      let authData;
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl) {
          throw new Error('Supabase URL is not configured');
        }

        // Check if we can reach Supabase
        try {
          const response = await fetch(supabaseUrl);
          if (!response.ok) {
            throw new Error(`Supabase health check failed: ${response.status}`);
          }
          console.log('Supabase health check passed');
        } catch (healthError) {
          console.error('Supabase health check failed:', healthError);
          throw new Error(
            'Unable to reach Supabase service. Please check your internet connection and try again.'
          );
        }

        console.log('Making Supabase auth request to:', process.env.NEXT_PUBLIC_SUPABASE_URL);

        // Add timeout to the auth request
        const timeoutPromise = new Promise((_, reject) => {
          // eslint-disable-next-line no-undef
          setTimeout(
            () =>
              reject(
                new Error(
                  'Auth request timed out after 10s - check network connection or Supabase service status'
                )
              ),
            10000
          );
        });

        // Wrap auth request in try-catch for network errors
        const authPromise = (async () => {
          try {
            return await supabase.auth.signInWithPassword({
              email,
              password,
            });
          } catch (error: unknown) {
            // eslint-disable-next-line no-console
            console.error('Network error during auth request:', error);
            throw new Error(
              `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
          }
        })();

        // Race between auth request and timeout
        const response = (await Promise.race([authPromise, timeoutPromise])) as Awaited<
          ReturnType<typeof supabase.auth.signInWithPassword>
        >;

        authData = response.data;
        const signInError = response.error;

        console.log('Auth response received:', {
          success: !!authData?.session,
          hasError: !!signInError,
          errorMessage: signInError?.message,
        });

        if (signInError) {
          console.error('Sign in error details:', {
            message: signInError.message,
            status: signInError.status,
            name: signInError.name,
          });
          throw new Error(signInError.message || 'Invalid email or password');
        }
      } catch (authError) {
        console.error('Supabase auth request failed:', authError);
        throw authError;
      }

      if (!authData.session) {
        console.error('No session created after sign in');
        throw new Error('Authentication failed');
      }

      console.log('Successfully signed in, checking user role...');

      // Check if user has admin role
      const { data: userData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', authData.session.user.id)
        .single();

      if (roleError) {
        console.error('Error fetching user role:', roleError);
        await supabase.auth.signOut();
        throw new Error('Error verifying admin status');
      }

      console.log('User data:', userData);

      if (!userData || userData.role !== 'ADMIN') {
        // Sign out if not admin
        await supabase.auth.signOut();
        throw new Error('Admin access required');
      }

      console.log('Admin access confirmed, redirecting...');
      showToast('Successfully logged in', 'success');

      // Use replace to prevent back navigation
      router.replace('/admin');
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'An error occurred during login';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

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
          <StyledButton type="submit" $variant="primary" $fullWidth disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </StyledButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginCard>
    </Container>
  );
}
