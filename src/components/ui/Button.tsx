import React from 'react';
import styled, { css, keyframes } from 'styled-components';

// Types
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';

interface StyledButtonProps {
  $size?: ButtonSize;
  $variant?: ButtonVariant;
  $isLoading?: boolean;
  $fullWidth?: boolean;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Animations
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Size styles
const sizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    height: 2rem;
  `,
  medium: css`
    padding: 0.625rem 1.25rem;
    font-size: 1rem;
    height: 2.5rem;
  `,
  large: css`
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
    height: 3rem;
  `,
};

// Variant styles
const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrast};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary.dark};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary.dark};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary.main};
    color: ${({ theme }) => theme.colors.secondary.contrast};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondary.dark};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondary.dark};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary.main};
    border: 2px solid ${({ theme }) => theme.colors.primary.main};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.primary.contrast};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary.dark};
      border-color: ${({ theme }) => theme.colors.primary.dark};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.error.main};
    color: ${({ theme }) => theme.colors.error.contrast};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.error.dark};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.error.dark};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.background.secondary};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.background.secondary};
    }
  `,
};

// Base styles
const baseStyles = css<StyledButtonProps>`
  ${({ $size = 'medium' }) => sizes[$size]};
  ${({ $variant = 'primary' }) => variants[$variant]};
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`};

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  text-decoration: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Loading state styles */
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      color: transparent !important;
      pointer-events: none;

      &::after {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        border: 2px solid;
        border-radius: 50%;
        border-color: currentColor transparent currentColor transparent;
        animation: ${spin} 0.7s linear infinite;
      }
    `}
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${baseStyles}
`;

const StyledLink = styled.a<StyledButtonProps>`
  ${baseStyles}
`;

// Icon wrapper
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
`;

// Button component
export const Button = ({
  children,
  size = 'medium',
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $size={size}
      $variant={variant}
      $isLoading={isLoading}
      $fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      {children}
      {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </StyledButton>
  );
};

// Link Button component
export const LinkButton = ({
  children,
  size = 'medium',
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}: LinkButtonProps) => {
  return (
    <StyledLink
      $size={size}
      $variant={variant}
      $isLoading={isLoading}
      $fullWidth={fullWidth}
      {...props}
    >
      {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      {children}
      {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </StyledLink>
  );
};

export default Button;