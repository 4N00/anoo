import React, { useEffect, useRef } from 'react';
import { ContactInfo, ContentWrapper, FooterContainer, FooterInfo, FooterLink, LargeText, LargeTextSection, LinkColumn, NavigationGroup, SmallText, TopNavigation } from './styles';
import { useLanguage } from '@/context/LanguageContext';


const PageFooter = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <FooterContainer>
      <ContentWrapper>
        <TopNavigation>
          <SmallText>{t('footer.collaborate')}</SmallText>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5rem' }}>
            <ContactInfo>
              <FooterLink href="mailto:info@anoo.nl">{t('contact.info.email')} info@anoo.nl</FooterLink>
              <FooterLink href="tel:+31625135338">{t('contact.info.phone')} +31 625 135 338</FooterLink>
            </ContactInfo>

            <NavigationGroup>
              <LinkColumn>
                <FooterLink href="/projects">{t('navigation.projects')}</FooterLink>
                <FooterLink href="/about">{t('navigation.about')}</FooterLink>
                <FooterLink href="/services">{t('navigation.services')}</FooterLink>
                <FooterLink href="/contact">{t('navigation.contact')}</FooterLink>
              </LinkColumn>
            </NavigationGroup>
          </div>
        </TopNavigation>

        <LargeTextSection>
          <LargeText ref={textRef}>
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
};

export default PageFooter;
