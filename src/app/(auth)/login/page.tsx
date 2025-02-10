'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  Button,
} from '@/styles/LoginStyles';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      // Redirect to admin page on success
      window.location.href = '/admin';
    } catch (error) {
      setError(t('login.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>{t('login.title')}</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="email">{t('login.form.email')}</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">{t('login.form.password')}</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            error={!!errors.password}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('login.form.submitting') : t('login.form.submit')}
        </Button>
      </Form>
    </Container>
  );
} 