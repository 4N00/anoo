import React from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'primary' | 'secondary' | 'danger';
}

export const StyledButton = styled.button<ButtonProps>`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  letter-spacing: 0.5px;
  z-index: 1;

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.text.primary};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.2s ease;
    z-index: -1;
  }

  /* Hover effect */
  &:hover {
    color: ${({ theme }) => theme.colors.background.primary};
    &:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  /* Active effect */
  &:active {
    transform: translateY(1px);
  }

  /* Focus effect */
  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background.primary},
                0 0 0 4px ${({ theme }) => theme.colors.text.primary};
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    &:after {
      display: none;
    }
  }

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      border-color: ${({ theme }) => theme.colors.text.secondary};
      color: ${({ theme }) => theme.colors.text.secondary};

      &:after {
        background: ${({ theme }) => theme.colors.text.secondary};
      }

      &:hover {
        color: ${({ theme }) => theme.colors.background.primary};
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background.primary},
                    0 0 0 4px ${({ theme }) => theme.colors.text.secondary};
      }
    `}

  ${({ $variant }) =>
    $variant === 'danger' &&
    css`
      border-color: ${({ theme }) => theme.colors.error.main};
      color: ${({ theme }) => theme.colors.error.main};

      &:after {
        background: ${({ theme }) => theme.colors.error.main};
      }

      &:hover {
        color: ${({ theme }) => theme.colors.background.primary};
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background.primary},
                    0 0 0 4px ${({ theme }) => theme.colors.error.main};
      }
    `}
`; 