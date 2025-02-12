import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: 0;
  padding-top: 64px;
`;

export const BackgroundText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: clamp(150px, 20vw, 300px);
  font-weight: 900;
  line-height: 0.8;
  color: #000;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: flex-start;
  padding: 8rem 2rem;
  overflow: hidden;
  user-select: none;
`;

export const Content = styled(motion.div)`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  position: relative;
  z-index: 1;
`;

export const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;

  > div {
    position: relative;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: -1.5rem;
  left: 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`;

interface InputProps {
  error?: string;
}

export const FormInput = styled.input<InputProps>`
  width: 100%;
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  ${({ error, theme }) =>
    error &&
    `
    border-color: ${theme.colors.error.main};
    &:focus {
      border-color: ${theme.colors.error.main};
    }
  `}
`;

export const FormTextarea = styled.textarea<InputProps>`
  width: 100%;
  padding: 0.5rem 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
  font-size: 1rem;
  resize: none;
  min-height: 100px;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  ${({ error, theme }) =>
    error &&
    `
    border-color: ${theme.colors.error.main};
    &:focus {
      border-color: ${theme.colors.error.main};
    }
  `}
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 2rem 0;
  background: transparent;
  border: none;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    display: inline-block;
    transform: rotate(90deg);
    margin: 0 0.5rem;
  }

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 