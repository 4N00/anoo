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
  z-index: -1;
`;

export const MainContainer = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
`;

interface ProjectContainerProps {
  featured?: boolean;
}

export const ProjectContainer = styled.div<ProjectContainerProps>`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};
  grid-template-columns: 1fr;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${(props) => (props.featured ? '1fr' : '1fr 1fr')};
    padding: ${(props) => (props.featured ? `0 ${props.theme.spacing.xl}` : '0')};
  }

  max-height: ${(props) => (props.featured ? '800px' : 'none')};
  overflow: ${(props) => (props.featured ? 'hidden' : 'visible')};
`;

export const ProjectCardWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;

export const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.02);
  }
`;

export const ProjectInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const ProjectCategory = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const ProjectDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;
