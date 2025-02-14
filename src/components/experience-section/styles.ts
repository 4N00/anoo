import styled, { keyframes } from 'styled-components';

const scrollTextLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollTextRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

export const ScrollingTextContainer = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 4rem;
  user-select: none;
`;

export const ScrollingText = styled.div<{ $direction: 'left' | 'right' }>`
  display: inline-block;
  white-space: nowrap;
  animation: ${({ $direction }) => $direction === 'left' ? scrollTextLeft : scrollTextRight} 60s linear infinite;
  font-size: clamp(4rem, 20vw, 16rem);
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
`;

export const ExperienceContainer = styled.section`
  width: 100%;
  padding: 8rem 0;
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  overflow: hidden;
  background: transparent;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.div`
  margin-bottom: 4rem;
  max-width: 800px;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;

  p {
    margin-bottom: 1.5rem;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ExperienceGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

export const ExperienceItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: start;
`;

export const ExperienceInfo = styled.div`
  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    opacity: 0.7;
  }
`;

export const ExperienceDate = styled.span`
  font-size: 0.875rem;
  opacity: 0.5;
  white-space: nowrap;
`;

export const SeeAllLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0.7;
  text-decoration: none;
  margin-top: 1rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  &:after {
    content: "→";
  }
`; 