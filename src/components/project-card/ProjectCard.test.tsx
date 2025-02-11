/// <reference types="jest" />
/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import 'jest-styled-components';
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import ProjectCard from './ProjectCard';
import { ProjectUI } from '@/types/project';

declare const describe: any;
declare const it: any;
declare const expect: any;

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockProject: ProjectUI = {
  id: '1',
  title: 'Test Project',
  description: 'Test Description',
  imageUrl: 'https://example.com/image.jpg',
  tags: ['React', 'TypeScript'],
  featured: false,
  githubUrl: 'https://github.com/test',
  liveUrl: 'https://example.com',
  displayOrder: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
};

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  },
}));

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    renderWithTheme(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
  });

  it('renders project tags', () => {
    renderWithTheme(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.tags.slice(0, 2).join(' / '))).toBeInTheDocument();
  });

  it('renders project image', () => {
    renderWithTheme(<ProjectCard project={mockProject} />);
    const image = screen.getByAltText(mockProject.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(mockProject.imageUrl)));
  });
}); 