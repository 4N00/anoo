import React, { forwardRef } from 'react';
import { ContactInfo, ContentWrapper, FooterContainer, FooterInfo, FooterLink, LargeText, LargeTextSection, LinkColumn, NavigationGroup, SmallText, TopNavigation } from './styles';
import { useLanguage } from '@/context/LanguageContext';

const PageFooter = forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer ref={ref}>
      <ContentWrapper>
        <TopNavigation>
          <SmallText>{t('footer.collaborate')}</SmallText>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5rem' }}>
            <ContactInfo>
              <FooterLink href="mailto:info@anoo.nl">{t('contact.info.email')}</FooterLink>
              <FooterLink href="tel:+31625135338">{t('contact.info.phone')}</FooterLink>
            </ContactInfo>

            <NavigationGroup>
              <LinkColumn>
                <FooterLink href="/">{t('navigation.home')}</FooterLink>
                <FooterLink href="/about">{t('navigation.about')}</FooterLink>
                <FooterLink href="/contact">{t('navigation.contact')}</FooterLink>
              </LinkColumn>
            </NavigationGroup>
          </div>
        </TopNavigation>

        <LargeTextSection>
          <LargeText>
            {t('about.closing')}
          </LargeText>
        </LargeTextSection>

        <FooterInfo>
          <SmallText>{t('footer.copyright')}</SmallText>
          <FooterLink href="#">{t('footer.beam_up')}</FooterLink>
        </FooterInfo>
      </ContentWrapper>
    </FooterContainer>
  );
});

PageFooter.displayName = 'PageFooter';

export default PageFooter;
