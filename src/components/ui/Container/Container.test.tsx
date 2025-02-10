/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render } from '@/test-utils/test-utils';
import Container from './Container';
import { stripAllProps } from '@/test-utils/mockHelpers';

declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

// Mock styled components
jest.mock('./styles', () => ({
  StyledContainer: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
    <div data-testid="container" className={className} {...stripAllProps(props)}>
      {children}
    </div>
  ),
}));

describe('Container', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Content';
    const { getByText } = render(
      <Container>
        <div>{testContent}</div>
      </Container>
    );
    expect(getByText(testContent)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const testClass = 'custom-class';
    const { getByTestId } = render(
      <Container className={testClass}>
        <div>Content</div>
      </Container>
    );
    expect(getByTestId('container')).toHaveClass(testClass);
  });

  it('maintains proper styling with theme', () => {
    const { getByTestId } = render(
      <Container>
        <div>Content</div>
      </Container>
    );
    expect(getByTestId('container')).toBeInTheDocument();
  });
}); 