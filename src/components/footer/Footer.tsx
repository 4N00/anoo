import React, { forwardRef } from 'react';
import { 
  ContactInfo, 
  ContentWrapper, 
  FooterContainer, 
  FooterInfo, 
  FooterLink, 
  LargeTextSection,
  LinkColumn, 
  NavigationGroup, 
  SmallText, 
  TopNavigation 
} from './styles';
import { useLanguage } from '@/context/LanguageContext';

const PageFooter = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useLanguage();

  return (
    <FooterContainer ref={ref} data-testid="footer">
      <ContentWrapper data-testid="content">
        <TopNavigation data-testid="nav">
          <SmallText data-testid="small-text">{t('footer.collaborate')}</SmallText>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5rem' }}>
            <ContactInfo data-testid="contact-info">
              <FooterLink href="mailto:info@anoo.nl" data-testid="link">info@anoo.nl</FooterLink>
              <FooterLink href="tel:+31625135338" data-testid="link">+31 6 12 34 56 78</FooterLink>
            </ContactInfo>
            <NavigationGroup data-testid="nav-group">
              <LinkColumn data-testid="link-column">
                <FooterLink href="/" data-testid="link">Home</FooterLink>
                <FooterLink href="/about" data-testid="link">About</FooterLink>
                <FooterLink href="/contact" data-testid="link">Contact</FooterLink>
              </LinkColumn>
            </NavigationGroup>
          </div>
        </TopNavigation>
        <LargeTextSection data-testid="large-text-section">
          {t('footer.beam_up')}
        </LargeTextSection>
        <FooterInfo data-testid="footer-info">
          <SmallText data-testid="small-text">{t('footer.copyright')}</SmallText>
          <FooterLink href="#" data-testid="link">{t('footer.beam_up')}</FooterLink>
        </FooterInfo>
      </ContentWrapper>
    </FooterContainer>
  );
});

PageFooter.displayName = 'PageFooter';

export default PageFooter;
