import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const BlurLayers = styled.div`
  position: fixed;
  top: -120px;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;

  &:before {
    content: '';
    position: absolute;
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    inset: 0% 0% auto;
    -webkit-mask: linear-gradient(to top, #fff0 50%, #fff 62.5% 75%, #fff0 87.5%);
    mask: linear-gradient(to top, #fff0 50%, #fff 62.5% 75%, #fff0 87.5%);
  }

  &:after {
    content: '';
    position: absolute;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    inset: 0% 0% auto;
    -webkit-mask: linear-gradient(to top, #fff0 37.5%, #fff 50% 62.5%, #fff0 75%);
    mask: linear-gradient(to top, #fff0 37.5%, #fff 50% 62.5%, #fff0 75%);
  }
`;
export const BlurLayer1 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(3px);
  inset: 0% 0% auto;
  -webkit-mask: linear-gradient(to top, #fff0 25%, #fff 37.5% 50%, #fff0 62.5%);
  mask: linear-gradient(to top, #fff0 25%, #fff 37.5% 50%, #fff0 62.5%);
`;
export const BlurLayer2 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  inset: 0% 0% auto;
  -webkit-mask: linear-gradient(to top, #fff0 25%, #fff 37.5% 50%, #fff0 62.5%);
  mask: linear-gradient(to top, #fff0 25%, #fff 37.5% 50%, #fff0 62.5%);
`;



export const BlurLayer3 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(3px);
  inset: 0% 0% auto;
  -webkit-mask: linear-gradient(to top, #fff0 25%, #fff 37.5% 50%, #fff0 62.5%);
  mask: linear-gradient(to top, #fff0 25%, #fff 37.5% 50%, #fff0 62.5%);
`;

export const BlurLayer4 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(2px);
  inset: 0% 0% auto;
  -webkit-mask: linear-gradient(to top, #fff0 12.5%, #fff 25% 37.5%, #fff0 50%);
  mask: linear-gradient(to top, #fff0 12.5%, #fff 25% 37.5%, #fff0 50%);
`;

export const BlurLayer5 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(13px);
  backdrop-filter: blur(1px);
  inset: 0% 0% auto;
  -webkit-mask: linear-gradient(to top, #fff0 0%, #fff 12.5% 37.5%, #fff0 50%);
  mask: linear-gradient(to top, #fff0 0%, #fff 12.5% 37.5%, #fff0 50%);
`;

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  padding: 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 4rem;
  align-items: flex-start;
  transform: translateY(0);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem;
    grid-template-columns: auto auto;
  }

  &.hidden {
    transform: translateY(-100%);
  }
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Logo = styled(Link)`
  font-family: "Neue Machina", sans-serif;
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
`;

export const SubLogo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.7;
`;

export const Divider = styled.div`
  height: 1px;
  width: 2rem;
  background: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.7;
  margin: 0.5rem 0;
`;

export const ServicesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.7;
  margin-top: 0.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  font-family: "Ppmori", sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.35rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  &:before {
    content: "→";
  }
`;

export const ControlsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 0.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 1rem;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  width: 32px;
  height: 24px;
  position: relative;
  cursor: pointer;
  z-index: 1000;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: ${({ theme }) => theme.colors.text.primary};
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;

    &:nth-child(1) { top: 0px; }
    &:nth-child(2) { top: 10px; }
    &:nth-child(3) { top: 20px; }
  }

  &.open {
    span {
      &:nth-child(1) {
        top: 10px;
        transform: rotate(135deg);
      }
      &:nth-child(2) {
        opacity: 0;
        left: -60px;
      }
      &:nth-child(3) {
        top: 10px;
        transform: rotate(-135deg);
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const MobileMenu = styled(motion.div)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.colors.background.primary};
    flex-direction: column;
    padding: 6rem 2rem;
    gap: 2rem;
    z-index: 999;

    ${NavLinks} {
      display: flex;
      align-items: flex-start;
      margin-bottom: 2rem;
    }

    ${NavLink} {
      font-size: 2rem;
    }
  }
`;

export const ThemeToggle = styled.div`
  width: 3.5rem;
  height: 1.75rem;
  background: ${({ theme }) => theme.colors.text.primary};
  border-radius: 1.5rem;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    background: ${({ theme }) => theme.colors.background.primary};
    border-radius: 50%;
    transition: transform 0.2s ease;
  }

  &[data-theme="dark"]:after {
    transform: translateX(1.75rem);
  }
`;

export const LanguageToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.25rem;

  span {
    opacity: 0.5;
  }
`;

export const LanguageOption = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: 0.35rem;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`; 