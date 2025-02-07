import React, { useState } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '@/styles/components/Button';

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

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Add your form submission logic here
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <ContactContent variants={container} initial="hidden" animate="show">
        <ContactTitle>Contact</ContactTitle>
        <ContactText>Contact page content will go here.</ContactText>
        <Form onSubmit={handleSubmit}>
          {/* Add your form fields here */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Form>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;
