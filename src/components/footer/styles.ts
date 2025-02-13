import styled from 'styled-components';

export const FooterSection = styled.footer`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.background.primary};
  border-top: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Copyright = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.background.secondary};
`;

export const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FooterText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FooterLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary} !important;
  text-decoration: none !important;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:visited {
    color: ${({ theme }) => theme.colors.text.primary} !important;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: currentColor;
    transition: width 0.2s ease-in-out;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary} !important;
    &::after {
      width: 100%;
    }
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const TopNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 0;
  border-bottom: 1px solid #000000;
  margin-bottom: 5rem;
  width: 100%;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const NavigationGroup = styled.div`
  display: flex;
  gap: 5rem;
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const LargeTextSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5rem 0;
  width: 100%;
  overflow: hidden;
`;

export const LargeText = styled.h1`
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

export const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  width: 100%;
`;

export const SmallText = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 300;
`;