'use client';

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
      console.log('Attempting to sign in...');
      
      // First, try to sign in
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        throw new Error('Invalid email or password');
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