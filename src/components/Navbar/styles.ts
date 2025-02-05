import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: min(1400px, calc(100% - ${({ theme }) => theme.spacing.md} * 2));
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  z-index: ${({ theme }) => theme.zIndex.header + 10};
  letter-spacing: 1px;
`;

export const NavLinks = styled.div`
  display: none;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    gap: clamp(${({ theme }) => theme.spacing.md}, 2vw, ${({ theme }) => theme.spacing.xl});
    margin-left: auto;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.3s ease;
  opacity: 0.8;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.text.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    opacity: 1;
    &:after {
      width: 100%;
    }
  }

  &[aria-current='page'] {
    opacity: 1;
    &:after {
      width: 100%;
    }
  }
`;

export const MenuButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: ${({ theme }) => theme.zIndex.header + 10};
  color: ${({ theme }) => theme.colors.text.primary};
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
  margin-left: auto;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }
`;

export const MobileMenuContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndex.modal};
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileNavLink = styled(motion(Link))`
  color: ${({ theme }) => theme.colors.background.primary};
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-family: ${({ theme }) => theme.fonts.body};
  opacity: 0.7;
  transition: all 0.3s ease;
  letter-spacing: 2px;
  position: relative;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

export const ContactInfo = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.background.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.5;
  font-family: ${({ theme }) => theme.fonts.body};
  letter-spacing: 1px;
`;