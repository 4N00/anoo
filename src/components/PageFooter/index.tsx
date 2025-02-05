import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FooterLink } from './styles';

const FooterContainer = styled.section`
  width: 100%;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TopNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 0;
  border-bottom: 1px solid #000000;
  margin-bottom: 5rem;
  width: 100%;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

const NavigationGroup = styled.div`
  display: flex;
  gap: 5rem;
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

const LargeTextSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5rem 0;
  width: 100%;
  overflow: hidden;
`;

const LargeText = styled.h1`
  font-size: min(200px, 10vw);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  white-space: pre-line;
  text-align: left;
  opacity: 0;
  transform: translateY(100px) rotateX(-30deg) skewY(5deg);
  transition:
    opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0) rotateX(0) skewY(0);
  }

  & span {
    display: inline-block;
    transition-delay: var(--delay);
  }
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  width: 100%;
`;

const SmallText = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 300;
`;

const PageFooter = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

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
          <FooterLink href="#">ANOO, BEAM ME UP</FooterLink>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5rem' }}>
            <ContactInfo>
              <FooterLink href="mailto:info@anoo.nl">info@anoo.nl</FooterLink>
              <FooterLink href="tel:+31625135338">+31 625 135 338</FooterLink>
            </ContactInfo>

            <NavigationGroup>
              <LinkColumn>
                <FooterLink href="#">Work</FooterLink>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Services</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </LinkColumn>
            </NavigationGroup>
          </div>
        </TopNavigation>

        <LargeTextSection>
          <LargeText ref={textRef}>{'HAVE A\nGREAT DAY!'}</LargeText>
        </LargeTextSection>

        <FooterInfo>
          <SmallText>anoo©</SmallText>
          <SmallText>Let&apos;s make cool stuff</SmallText>
        </FooterInfo>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default PageFooter;
