import React from 'react';
import PageFooter from '../components/PageFooter';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div``;
const ContactContent = styled(motion.div)``;
const ContactTitle = styled.h1``;
const ContactText = styled.p``;

const Contact: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <ContactContainer>
      <ContactContent
        variants={container}
        initial="hidden"
        animate="show"
      >
        <ContactTitle>Contact</ContactTitle>
        <ContactText>Contact page content will go here.</ContactText>
      </ContactContent>
      <PageFooter />
    </ContactContainer>
  );
};

export default Contact;