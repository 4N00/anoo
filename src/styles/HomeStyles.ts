import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
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
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.8;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:before {
    content: '•';
    margin-right: ${({ theme }) => theme.spacing.xs};
    opacity: 0.6;
  }
`;

export const HeaderTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const HeaderSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 60ch;
`;

export const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ProjectDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

export const Separator = styled.hr`
  margin: 0 auto;
  max-width: 1400px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.2;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

interface ProjectCardProps {
  $isFeatured?: boolean;
}

export const ProjectCardWrapper = styled.div`
  display: block;
`;

export const ProjectCard = styled.div<ProjectCardProps>`
  display: block;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
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
  z-index: 1;
  min-height: 100vh;
  background: transparent;
`;

export const ProjectNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.6;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
