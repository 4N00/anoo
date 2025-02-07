import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

const NotFoundContainer = styled.div``;
const NotFoundContent = styled(motion.div)``;
const NotFoundTitle = styled.h1``;
const NotFoundText = styled.p``;
const HomeLink = styled(Link)``;

const NotFound: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <NotFoundContainer>
      <NotFoundContent variants={container} initial="hidden" animate="show">
        <NotFoundTitle>404 - Page Not Found</NotFoundTitle>
        <NotFoundText>The page you're looking for doesn't exist.</NotFoundText>
        <HomeLink to="/">Return to Home</HomeLink>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;
