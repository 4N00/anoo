import React, { useState } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '@/styles/components/Button';
import { useLanguage } from '@/context/LanguageContext';

const ContactContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const ContactContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ContactTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ContactText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormInput = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const FormTextarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 150px;
`;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <ContactContent variants={container} initial="hidden" animate="show">
        <ContactTitle>{t('contact.title')}</ContactTitle>
        <ContactText>{t('contact.subtitle')}</ContactText>
        <Form onSubmit={handleSubmit}>
          <FormInput 
            type="text" 
            placeholder={t('contact.form.name')} 
            required 
          />
          <FormInput 
            type="email" 
            placeholder={t('contact.form.email')} 
            required 
          />
          <FormTextarea 
            placeholder={t('contact.form.message')} 
            required 
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '...' : t('contact.form.send')}
          </Button>
        </Form>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;
