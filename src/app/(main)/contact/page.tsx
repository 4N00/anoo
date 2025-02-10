'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Title,
  Description,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ErrorMessage,
  SuccessMessage,
  Button,
} from '@/styles/ContactStyles';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>{t('contact.title')}</Title>
      <Description>{t('contact.description')}</Description>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="name">{t('contact.form.name')}</Label>
          <Input
            id="name"
            type="text"
            {...register('name')}
            error={!!errors.name}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">{t('contact.form.email')}</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            error={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">{t('contact.form.message')}</Label>
          <TextArea
            id="message"
            {...register('message')}
            error={!!errors.message}
          />
          {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
        </FormGroup>

        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
        {submitSuccess && (
          <SuccessMessage>{t('contact.form.success')}</SuccessMessage>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
        </Button>
      </Form>
    </Container>
  );
} 