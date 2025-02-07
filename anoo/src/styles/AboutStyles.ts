import { motion } from "framer-motion";
import styled from "styled-components";

// ProfileSection styles
export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8rem;
  margin-bottom: 5rem;
  width: 100%;
  padding-top: 8rem;

  @media (max-width: 768px) {
    gap: 4rem;
    padding-top: 6rem;
    margin-bottom: 3rem;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
`;

export const Name = styled.h1`
  font-size: 7rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 4rem;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    font-size: 5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1A1A1A;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const EmailLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #A1A1A1;
  margin-top: 8rem;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    margin-top: 4rem;
  }
`;

export const MetaGroup = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MetaLabel = styled.span`
  color: #A1A1A1;
`;

export const MetaValue = styled.span`
  color: #1A1A1A;
`;

// Common styles for Languages and Skills sections
export const SectionContainer = styled(motion.div)`
  margin-bottom: 5rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

export const Title = styled.h3`
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1;
  margin-bottom: 2.5rem;
  font-family: 'Josefin Sans', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

export const GroupContainer = styled.div`
  margin-top: 4rem;
  &:first-child {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SkillContainer = styled.div`
  width: 100%;
  border-left: 1px solid #DEDEDE;

  @media (max-width: 480px) {
    border-left: none;
    border-top: 1px solid #DEDEDE;
    padding-top: 1rem;
  }
`;

export const SkillName = styled.div`
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const SkillNameText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1A1A1A;
  padding: 0.5rem 0;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const ProgressContainer = styled(motion.div)`
  height: 3.5rem;
  background: #F5F5F5;
  width: 100%;
  border: 1px solid #DEDEDE;

  @media (max-width: 768px) {
    height: 2.5rem;
  }
`;

export const ProgressBar = styled(motion.div)`
  height: 100%;
  background: #E8E8E8;
`;

export const SkillLevel = styled.div`
  margin-top: 0.5rem;
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1A1A1A;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

export const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem 5rem;

  @media (max-width: 768px) {
    padding: 6rem 1rem 3rem;
  }
`;