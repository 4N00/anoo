import React, { forwardRef } from 'react';
import { ContactInfo, ContentWrapper, FooterContainer, FooterInfo, FooterLink, LargeText, LargeTextSection, LinkColumn, NavigationGroup, SmallText, TopNavigation } from './styles';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const textVariants = {
  initial: { y: 100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

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
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <LargeText as={motion.h2} variants={textVariants}>
              {t('about.closing')}
            </LargeText>
          </motion.div>
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
