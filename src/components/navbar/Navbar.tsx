import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { signOut } from '@/lib/supabase';
import { 
  Nav,
  LogoSection,
  Logo,
  SubLogo,
  Divider,
  ServicesSection,
  NavLinks,
  NavLink,
  ThemeToggle,
  LanguageToggle,
  LanguageOption,
  MobileMenuButton,
  MobileMenu,
  ControlsSection
} from './styles';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollThreshold = 50;

      if (scrollingDown && currentScrollY > scrollThreshold) {
        setIsVisible(false);
      } else if (!scrollingDown) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLanguageChange = (newLang: 'EN' | 'NL') => {
    setLanguage(newLang);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
      showToast('Successfully logged out', 'success');
    } catch (error) {
      showToast('Failed to logout', 'error');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderNavLinks = () => (
    <NavLinks>
      <NavLink href="/about">{t('nav.about')}</NavLink>
      <NavLink href="/services">{t('nav.services')}</NavLink>
      <NavLink href="/work">{t('nav.work')}</NavLink>
      <NavLink href="/contact">{t('nav.contact')}</NavLink>
      {user ? (
        <>
          <NavLink href="/admin">{t('nav.admin')}</NavLink>
          <NavLink href="#" onClick={handleLogout}>{t('nav.logout')}</NavLink>
        </>
      ) : (
        <NavLink href="/login">{t('nav.login')}</NavLink>
      )}
    </NavLinks>
  );

  return (
    <Nav className={!isVisible ? 'hidden' : ''}>
      <LogoSection>
        <Logo href="/">anoo.nl</Logo>
        <SubLogo>
          <span>{t('nav.role1')}</span>
          <span>{t('nav.role2')}</span>
        </SubLogo>
        <Divider />
      </LogoSection>

      <ServicesSection>
        <span>{t('nav.service1')}</span>
        <span>{t('nav.service2')}</span>
        <span>{t('nav.service3')}</span>
      </ServicesSection>

      {renderNavLinks()}

      <ControlsSection>
        <LanguageToggle>
          <LanguageOption
            $isActive={language === 'NL'}
            onClick={() => handleLanguageChange('NL')}
          >
            NL
          </LanguageOption>
          <span>|</span>
          <LanguageOption
            $isActive={language === 'EN'}
            onClick={() => handleLanguageChange('EN')}
          >
            EN
          </LanguageOption>
        </LanguageToggle>
        <ThemeToggle 
          onClick={toggleTheme}
          data-theme={isDark ? 'dark' : 'light'}
        />
        <MobileMenuButton 
          onClick={toggleMobileMenu}
          className={isMobileMenuOpen ? 'open' : ''}
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
      </ControlsSection>

      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          {renderNavLinks()}
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar; 