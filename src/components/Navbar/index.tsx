'use client';

import React, { useState, MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/lib/supabase';
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
    stroke={isOpen ? '#fff' : 'currentColor'}
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
  const { isAdmin, user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleLogoutClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleLogout();
  };

  return (
    <Nav>
      <Container>
        <Logo href="/">ANOO</Logo>
        <NavLinks>
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
          {isAdmin ? (
            <>
              <NavLink 
                href="/admin"
                aria-current={pathname === '/admin' ? 'page' : undefined}
              >
                Admin
              </NavLink>
              <NavLink 
                href="#"
                onClick={handleLogoutClick}
              >
                Logout
              </NavLink>
            </>
          ) : !user ? (
            <NavLink 
              href="/login"
              aria-current={pathname === '/login' ? 'page' : undefined}
            >
              Login
            </NavLink>
          ) : null}
        </NavLinks>
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu" $isOpen={isOpen}>
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
            {isAdmin ? (
              <>
                <MobileNavLink
                  href="/admin"
                  onClick={toggleMenu}
                  variants={mobileNavLinkVariants}
                >
                  Admin
                </MobileNavLink>
                <MobileNavLink
                  href="#"
                  onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  variants={mobileNavLinkVariants}
                >
                  Logout
                </MobileNavLink>
              </>
            ) : !user ? (
              <MobileNavLink
                href="/login"
                onClick={toggleMenu}
                variants={mobileNavLinkVariants}
              >
                Login
              </MobileNavLink>
            ) : null}
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
