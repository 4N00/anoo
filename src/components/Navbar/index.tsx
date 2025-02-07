'use client';

import React, { useState } from 'react';
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
  ContactInfo,
  CloseButton,
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
    aria-hidden="true"
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

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const mobileMenuVariants = {
  closed: { opacity: 0, scale: 0.95 },
  open: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.1 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const mobileNavLinkVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const contactInfoVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 0.5, y: 0, transition: { duration: 0.4, delay: 0.4 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAdmin, isLoading } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await signOut();
    closeMenu();
  };

  return (
    <Nav>
      <Container>
        <Logo href="/">anoo.nl</Logo>
        <NavLinks>
          <NavLink href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>
            About
          </NavLink>
          <NavLink href="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>
            Contact
          </NavLink>
          {isLoading ? (
            <NavLink href="#" aria-disabled="true" style={{ opacity: 0.5 }}>
              Loading...
            </NavLink>
          ) : isAdmin ? (
            <>
              <NavLink href="/admin" aria-current={pathname === '/admin' ? 'page' : undefined}>
                Admin
              </NavLink>
              <NavLink href="#" onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink href="/login" aria-current={pathname === '/login' ? 'page' : undefined}>
              Login
            </NavLink>
          )}

          <MenuButton
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            $isOpen={isOpen}
          >
            <MenuIcon isOpen={isOpen} />
          </MenuButton>
        </NavLinks>
      </Container>
      <AnimatePresence>
        {isOpen && (
          <MobileMenuContainer
            initial="closed"
            animate="open"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <CloseButton onClick={closeMenu} aria-label="Close menu">
              <CloseIcon />
            </CloseButton>
            <MobileNavLink href="/about" onClick={closeMenu} variants={mobileNavLinkVariants}>
              About
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMenu} variants={mobileNavLinkVariants}>
              Contact
            </MobileNavLink>
            {isLoading ? (
              <MobileNavLink href="#" aria-disabled="true" style={{ opacity: 0.5 }}>
                Loading...
              </MobileNavLink>
            ) : isAdmin ? (
              <>
                <MobileNavLink href="/admin" onClick={closeMenu} variants={mobileNavLinkVariants}>
                  Admin
                </MobileNavLink>
                <MobileNavLink href="#" onClick={handleLogout} variants={mobileNavLinkVariants}>
                  Logout
                </MobileNavLink>
              </>
            ) : (
              <MobileNavLink href="/login" onClick={closeMenu} variants={mobileNavLinkVariants}>
                Login
              </MobileNavLink>
            )}
            <ContactInfo as={motion.div} variants={contactInfoVariants}>
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
