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
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: min(1400px, calc(100% - ${({ theme }) => theme.spacing.md} * 2));
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

interface MenuButtonProps {
  $isOpen: boolean;
}

export const MenuButton = styled.button<MenuButtonProps>`
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

export const NavLinks = styled.div`
  display: flex;
  align-items: center;

  & > *:not(${MenuButton}) {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    gap: clamp(${({ theme }) => theme.spacing.md}, 2vw, ${({ theme }) => theme.spacing.xl});
    margin-left: auto;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;

    & > *:not(${MenuButton}) {
      display: flex;
    }

    ${MenuButton} {
      display: none;
    }
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  font-family: 'Josefin Sans', sans-serif;
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

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.background.primary};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 24px;
    height: 24px;
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
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

// Combine motion.a with Next.js Link
export const MobileNavLink = styled(motion.a).attrs({ as: Link })`
  color: ${({ theme }) => theme.colors.background.primary};
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-family: 'Josefin Sans', sans-serif;
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

export const NavbarContainer = styled.nav<{ $isMenuOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 2000;

  background: rgba(245, 245, 245, 0.01);
  backdrop-filter: ${({ $isMenuOpen }) => $isMenuOpen ? 'none' : 'blur(10px)'};
  -webkit-backdrop-filter: ${({ $isMenuOpen }) => $isMenuOpen ? 'none' : 'blur(10px)'};
`;

export const NavbarContent = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

export const Logo = styled(Link)<{ $isMenuOpen: boolean }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ $isMenuOpen, theme }) => $isMenuOpen ? 'white' : theme.colors.text.primary};
  text-decoration: none;
  transition: color 0.2s ease;
`;

interface HamburgerButtonProps {
  $isOpen: boolean;
}

export const HamburgerButton = styled(motion.button)<HamburgerButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem;
  margin: -1rem;
  width: 64px;
  height: 64px;
  position: relative;
  z-index: 2100;
  color: ${({ $isOpen }) => $isOpen ? 'white' : ({ theme }) => theme.colors.text.primary};
  transition: color 0.2s ease;

  svg {
    width: 32px;
    height: 32px;
    path {
      transform-origin: center;
      stroke-width: 2.5;
    }
  }
`;

export const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 400px;
  background: rgb(0 0 0 / 52%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1500;
  display: flex;
  flex-direction: column;
  padding: 5rem 0 2rem;
`;

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1400;
  background: transparent;
`;

export const MenuContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  position: relative;
  transform-origin: top center;
`;

export const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease;
  opacity: 0.9;
  font-weight: 500;


  &:hover {
    opacity: 1;
  }
`;

export const BottomBar = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 2rem auto 0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;

  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  display: flex;

  align-items: center;
  gap: 0.5rem;
  opacity: 0.9;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const LanguageToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  color: white;

`;

export const LanguageOption = styled(motion.button)<{ $isActive?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  opacity: ${({ $isActive }) => $isActive ? 1 : 0.5};

  font-weight: ${({ $isActive }) => $isActive ? 500 : 400};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: white;
    transform: scaleX(${({ $isActive }) => $isActive ? 1 : 0});
    transition: transform 0.2s ease;
  }
`;
