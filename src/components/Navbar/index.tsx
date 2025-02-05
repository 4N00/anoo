'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Nav,
  Container,
  Logo,
  NavLinks,
  NavLink,
  MenuButton,
  MobileMenuContainer,
  MobileNavLink,
  ContactInfo
} from './styles';

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {isOpen ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ) : (
      <>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const mobileNavLinkVariants = {
  closed: {
    opacity: 0,
    y: 20,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const contactInfoVariants = {
  closed: {
    opacity: 0,
    y: 20,
  },
  open: {
    opacity: 0.5,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Nav>
      <Container>
        <Logo href="/">ANOO</Logo>
        <NavLinks>
          <NavLink href="/" aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </NavLink>
          <NavLink 
            href="/about"
            aria-current={pathname === '/about' ? 'page' : undefined}
          >
            About
          </NavLink>
          <NavLink 
            href="/contact"
            aria-current={pathname === '/contact' ? 'page' : undefined}
          >
            Contact
          </NavLink>
        </NavLinks>
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          <MenuIcon isOpen={isOpen} />
        </MenuButton>
      </Container>

      <AnimatePresence mode="wait">
        {isOpen && (
          <MobileMenuContainer
            initial="closed"
            animate="open"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <MobileNavLink
              href="/"
              onClick={toggleMenu}
              variants={mobileNavLinkVariants}
            >
              Home
            </MobileNavLink>
            <MobileNavLink
              href="/about"
              onClick={toggleMenu}
              variants={mobileNavLinkVariants}
            >
              About
            </MobileNavLink>
            <MobileNavLink
              href="/contact"
              onClick={toggleMenu}
              variants={mobileNavLinkVariants}
            >
              Contact
            </MobileNavLink>
            <ContactInfo
              as={motion.div}
              variants={contactInfoVariants}
            >
              <span>info@anoo.com</span>
              <span>+31 6 12345678</span>
            </ContactInfo>
          </MobileMenuContainer>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;