import React from 'react';
import {
  FooterContainer,
  FooterContent,
  FooterText,
  FooterLinks,
  FooterLink
} from './styles';

const PageFooter: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>© 2024 ANOO. All rights reserved.</FooterText>
        <FooterLinks>
          <FooterLink href="https://github.com/anoo" target="_blank" rel="noopener noreferrer">
            GitHub
          </FooterLink>
          <FooterLink href="https://linkedin.com/in/anoo" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default PageFooter;