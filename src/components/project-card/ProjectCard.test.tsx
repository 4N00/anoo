/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render, screen } from '@testing-library/react';
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

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    renderWithTheme(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
  });

  it('renders project tags', () => {
    renderWithTheme(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.tags.join(' • '))).toBeInTheDocument();
  });

  it('renders project links when provided', () => {
    renderWithTheme(<ProjectCard project={mockProject} />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', mockProject.githubUrl);
    expect(screen.getByRole('link', { name: /live/i })).toHaveAttribute('href', mockProject.liveUrl);
  });

  it('does not render links when urls are not provided', () => {
    const projectWithoutLinks = { ...mockProject, githubUrl: null, liveUrl: null };
    renderWithTheme(<ProjectCard project={projectWithoutLinks} />);
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /live/i })).not.toBeInTheDocument();
  });

  it('renders project image with correct attributes', () => {
    renderWithTheme(<ProjectCard project={mockProject} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProject.imageUrl);
    expect(image).toHaveAttribute('alt', mockProject.title);
  });
}); 