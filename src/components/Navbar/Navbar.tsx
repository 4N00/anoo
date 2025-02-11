'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { NavbarContainer, NavbarContent, Logo, HamburgerButton, Backdrop, MenuOverlay, MenuContent, MenuItem, BottomBar, LanguageToggle, LanguageOption, ThemeToggle } from './styles';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { signOut } from '@/lib/supabase';

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
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const hamburgerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const lineOneVariants = {
    initial: { y: 0, rotate: 0 },
    hover: {
      y: [0, -4, 0],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut"
      }
    },
    open: {
      y: 6,
      rotate: 45,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const lineTwoVariants = {
    initial: { y: 0, opacity: 1 },
    hover: {
      y: [0, -4, 0],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 0,
      transition: { duration: 0.15 }
    }
  };

  const lineThreeVariants = {
    initial: { y: 0, rotate: 0 },
    hover: {
      y: [0, -4, 0],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut"
      }
    },
    open: {
      y: -6,
      rotate: -45,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  const handleLanguageChange = (newLang: 'EN' | 'NL') => {
    setLanguage(newLang);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      router.push('/');
      showToast('Successfully logged out', 'success');
    } catch (error) {
      showToast('Failed to logout', 'error');
    }
  };

  return (
    <>
      <NavbarContainer $isMenuOpen={isMenuOpen}>
        <NavbarContent>
          <Logo 
            href="/" 
            $isMenuOpen={isMenuOpen}
            style={{
              display: 'block',
              fontSize: '1.5rem',
              fontWeight: 700,
              contain: 'content',
              contentVisibility: 'auto',
              containIntrinsicSize: '0 2rem',
              textRendering: 'optimizeLegibility',
            }}
            prefetch={false}
          >
            anoo.nl
          </Logo>
          <HamburgerButton 
            $isOpen={isMenuOpen} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variants={hamburgerVariants}
            whileHover="hover"
            animate={isMenuOpen ? "open" : "initial"}
            initial="initial"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <motion.path variants={lineOneVariants} d="M4 6h16" />
              <motion.path variants={lineTwoVariants} d="M4 12h16" />
              <motion.path variants={lineThreeVariants} d="M4 18h16" />
            </svg>
          </HamburgerButton>
        </NavbarContent>
      </NavbarContainer>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <Backdrop onClick={handleClickOutside} aria-hidden="true" />
            <MenuOverlay
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
            >              
              <MenuContent variants={contentVariants}>
                <MenuItem href="/" onClick={() => setIsMenuOpen(false)} aria-label="Go to home page">
                  {t('navigation.home')}
                </MenuItem>
                <MenuItem href="/about" onClick={() => setIsMenuOpen(false)} aria-label="Go to about page">
                  {t('navigation.about')}
                </MenuItem>
                <MenuItem href="/contact" onClick={() => setIsMenuOpen(false)} aria-label="Go to contact page">
                  {t('navigation.contact')}
                </MenuItem>
                {user ? (
                  <>
                    <MenuItem href="/admin" onClick={() => setIsMenuOpen(false)} aria-label="Go to admin panel">
                      {t('navigation.admin')}
                    </MenuItem>
                    <MenuItem href="#" onClick={handleLogout} aria-label="Log out">
                      {t('navigation.logout')}
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem href="/login" onClick={() => setIsMenuOpen(false)} aria-label="Go to login page">
                    {t('navigation.login')}
                  </MenuItem>
                )}
              </MenuContent>

              <BottomBar>
                <LanguageToggle role="radiogroup" aria-label="Language selection">
                  <LanguageOption
                    $isActive={language === 'NL'}
                    onClick={() => handleLanguageChange('NL')}
                    whileHover={{ opacity: 1 }}
                    whileTap={{ scale: 0.95 }}
                    role="radio"
                    aria-checked={language === 'NL'}
                    tabIndex={0}
                  >
                    NL
                  </LanguageOption>
                  <span aria-hidden="true">|</span>
                  <LanguageOption
                    $isActive={language === 'EN'}
                    onClick={() => handleLanguageChange('EN')}
                    whileHover={{ opacity: 1 }}
                    whileTap={{ scale: 0.95 }}
                    role="radio"
                    aria-checked={language === 'EN'}
                    tabIndex={0}
                  >
                    EN
                  </LanguageOption>
                </LanguageToggle>
                <ThemeToggle 
                  onClick={toggleTheme} 
                  aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
                  role="switch"
                  aria-checked={isDarkTheme}
                >
                  {isDarkTheme ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                  {t(isDarkTheme ? 'theme.light' : 'theme.dark')}
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
