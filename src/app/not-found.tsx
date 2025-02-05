'use client';

import Link from 'next/link';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const HomeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: underline;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Content>
        <Title>404</Title>
        <Text>Oops! Page not found</Text>
        <HomeLink href="/">Return to Home</HomeLink>
      </Content>
    </NotFoundContainer>
  );
}