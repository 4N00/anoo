import styled from 'styled-components';

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} 0;
  }
`;

interface HeaderProps {
  featured?: boolean;
}

export const Header = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: ${(props) => (props.featured ? '1400px' : '100%')};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const HeaderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const Separator = styled.hr`
  margin: ${({ theme }) => theme.spacing.xl} auto;
  max-width: 1400px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.background.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: ${({ theme }) => theme.spacing.lg} auto;
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

export const Background = styled.div<{ $color: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.$color};
  transition: background-color 0.8s ease-in-out;
  z-index: 0;
`;

export const MainContainer = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  overflow: hidden;
  z-index: 1;
  background: transparent;
`;
