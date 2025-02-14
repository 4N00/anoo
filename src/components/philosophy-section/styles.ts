import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PhilosophyContainer = styled.section`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 12rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 8rem 1rem;
    gap: 4rem;
  }
`;

export const LeftContent = styled(motion.div)`
  p {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    line-height: 1.5;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text.primary};
    opacity: 0.8;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const QuoteContainer = styled(motion.div)`
  position: relative;
  padding: 4rem;
  
  &:before {
    content: '"';
    position: absolute;
    top: -2rem;
    left: -2rem;
    font-family: "Neue Machina", sans-serif;
    font-size: 12rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.text.primary};
    opacity: 0.1;
  }
`;

export const Quote = styled.blockquote`
  font-family: "Neue Machina", sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
  
  &:after {
    content: '"';
    position: absolute;
    bottom: -4rem;
    right: -2rem;
    font-family: "Neue Machina", sans-serif;
    font-size: 12rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.text.primary};
    opacity: 0.1;
  }
`; 