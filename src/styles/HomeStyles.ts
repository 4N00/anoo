import styled from 'styled-components';

export const Section = styled.section`
  padding: 4rem 0;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

interface HeaderProps {
  featured?: boolean;
}

export const Header = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 2rem;
  width: 100%;
  max-width: ${props => props.featured ? '1400px' : '100%'};

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const HeaderText = styled.span`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const Separator = styled.hr`
  margin: 2rem auto;
  max-width: 1400px;
  border: none;
  border-top: 1px solid #E5E7EB;

  @media (max-width: 768px) {
    margin: 1.5rem auto;
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
`;

export const MainContainer = styled.div`
  min-height: 100vh;
  color: #000000;
  background-color: #FFFFFF;
  transition: background-color 1s ease;
`;

interface ProjectContainerProps {
  featured?: boolean;
}

export const ProjectContainer = styled.div<ProjectContainerProps>`
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;
  padding: 0 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: ${props => props.featured ? '1fr' : '1fr 1fr'};
    padding: ${props => props.featured ? '0 2rem' : '0'};
  }
  
  max-height: ${props => props.featured ? '800px' : 'none'};
  overflow: ${props => props.featured ? 'hidden' : 'visible'};
`;

export const ProjectCardWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;

export const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const ProjectInfo = styled.div`
  margin-top: 1rem;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ProjectTitle = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const ProjectCategory = styled.span`
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const ProjectDescription = styled.p`
  font-size: 0.875rem;
  color: #4B5563;
  margin-top: 0.5rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;