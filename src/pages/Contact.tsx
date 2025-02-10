import React, { useState } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '@/styles/components/Button';
import { useLanguage } from '@/context/LanguageContext';

const ContactContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
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
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const FormTextarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 150px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const ContactInfo = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ContactInfoTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ContactInfoItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};

  strong {
    display: inline-block;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
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

      <ContactInfo variants={container} initial="hidden" animate="show">
        <ContactInfoTitle>{t('contact.info.title')}</ContactInfoTitle>
        <ContactInfoItem>
          <strong>{t('contact.info.email')}</strong>
          <a href="mailto:info@anoo.nl"></a>
        </ContactInfoItem>
        <ContactInfoItem>
          <strong>{t('contact.info.phone')}</strong>
          <a href="tel:+31625135338"></a>
        </ContactInfoItem>
        <ContactInfoItem>
          <strong>{t('contact.info.location')}</strong>
          Amsterdam, Netherlands
        </ContactInfoItem>
        <ContactInfoItem>
          {t('contact.info.availability')}
        </ContactInfoItem>
      </ContactInfo>
    </ContactContainer>
  );
};

export default Contact;
