'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import {
  Container,
  Content,
  Form,
  FormInput,
  FormTextarea,
  SubmitButton,
  Label,
  BackgroundText
} from './styles';

interface FormInputs {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      showToast(t('contact.form.success'), 'success');
      reset();
    } catch (error) {
      showToast(t('contact.form.error'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container id="contact">
      <BackgroundText>{t('contact.title').toUpperCase()}.</BackgroundText>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>{t('contact.form.name').toUpperCase()}</Label>
            <FormInput
              {...register('name', { required: t('contact.form.nameRequired') })}
              placeholder={t('contact.form.namePlaceholder')}
              error={errors.name?.message}
            />
          </div>
          <div>
            <Label>{t('contact.form.email').toUpperCase()}</Label>
            <FormInput
              {...register('email', {
                required: t('contact.form.emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('contact.form.emailInvalid'),
                },
              })}
              type="email"
              placeholder={t('contact.form.emailPlaceholder')}
              error={errors.email?.message}
            />
          </div>
          <div>
            <Label>{t('contact.form.phone').toUpperCase()}</Label>
            <FormInput
              {...register('phone')}
              type="tel"
              placeholder={t('contact.form.phonePlaceholder')}
            />
          </div>
          <div>
            <Label>{t('contact.form.company').toUpperCase()}</Label>
            <FormInput
              {...register('company')}
              placeholder={t('contact.form.companyPlaceholder')}
            />
          </div>
          <div>
            <Label>{t('contact.form.message').toUpperCase()}</Label>
            <FormTextarea
              {...register('message', { required: t('contact.form.messageRequired') })}
              placeholder={t('contact.form.messagePlaceholder')}
              error={errors.message?.message}
            />
          </div>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              t('contact.form.sending').toUpperCase()
            ) : (
              <>
                {t('contact.form.send').toUpperCase()} <span>:)</span>{' '}
                {t('contact.form.click_to_send').toUpperCase()}
              </>
            )}
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default ContactForm; 