'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1400px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
`;

interface HamburgerButtonProps {
  isOpen: boolean;
}

const HamburgerButton = styled.button<HamburgerButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem;
  margin: -1rem;
  width: 48px;
  height: 48px;
  position: relative;
  z-index: 2000;
  color: ${({ isOpen }) => isOpen ? 'white' : ({ theme }) => theme.colors.text.primary};
  transition: opacity 0.2s ease, color 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const MenuOverlay = styled(motion.div)`
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

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1400;
`;

const MenuContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  position: relative;
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  transition: opacity 0.2s ease;
  opacity: 0.9;
  font-weight: 500;



  &:hover {
    opacity: 1;
  }
`;

const BottomBar = styled.div`
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

const CloseButton = styled(motion.button)`
  position: absolute;
  top: -3rem;
  right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem;
  margin: -1rem;
  width: 48px;
  height: 48px;
  color: white;
  z-index: 2000;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ThemeToggle = styled.button`
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

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
      opacity: {
        duration: 0.3
      }
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      opacity: {
        duration: 0.4
      }
    }
  }
};

const contentVariants = {
  closed: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.2
    }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Add your theme toggle logic here
  };

  return (
    <>
      <NavbarContainer>
        <Logo href="/">ANOO</Logo>
        <HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </HamburgerButton>
      </NavbarContainer>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <Backdrop onClick={handleClickOutside} />
            <MenuOverlay
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
            >
              <CloseButton
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </CloseButton>
              
              <MenuContent variants={contentVariants}>
                <MenuItem href="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </MenuItem>
                <MenuItem href="/projects" onClick={() => setIsMenuOpen(false)}>
                  Projects
                </MenuItem>
                <MenuItem href="/about" onClick={() => setIsMenuOpen(false)}>
                  About
                </MenuItem>
                <MenuItem href="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </MenuItem>
                {user && (
                  <MenuItem href="/admin" onClick={() => setIsMenuOpen(false)}>
                    Admin
                  </MenuItem>
                )}
              </MenuContent>

              <BottomBar>
                <div>NL | EN</div>
                <ThemeToggle onClick={toggleTheme}>
                  {isDarkTheme ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                  {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                </ThemeToggle>
              </BottomBar>
            </MenuOverlay>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
