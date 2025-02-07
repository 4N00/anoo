import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 8rem;
  background: white;

  @media (max-width: 768px) {
    padding: 6rem 1rem 6rem;
  }
`;

export const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

export const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 84px;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 0.9;
  margin-bottom: 2rem;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 48px;
    margin-bottom: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #A1A1A1;
  max-width: 580px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 800px;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;