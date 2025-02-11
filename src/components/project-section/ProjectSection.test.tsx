/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import 'jest-styled-components';
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import ProjectSection from './ProjectSection';
import { ProjectUI } from '@/types/project';

declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <section data-testid="motion-section" className={className} {...props}>{children}</section>
    ),
  },
}));

// Mock styled components
jest.mock('../project-card/styles', () => ({
  ProjectContainer: ({ children, $featured, ...props }: React.PropsWithChildren<{ $featured?: boolean }>) => (
    <div data-testid={$featured ? "featured-container" : "project-container"} {...props}>{children}</div>
  ),
  ProjectGrid: ({ children, $featured, ...props }: React.PropsWithChildren<{ $featured?: boolean }>) => (
    <div data-testid={$featured ? "featured-grid" : "project-grid"} {...props}>{children}</div>
  ),
}));

jest.mock('@/app/styles', () => ({
  HeaderText: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <h2 data-testid="header-text" {...props}>{children}</h2>
  ),
}));

jest.mock('../project-card/ProjectCard', () => {
  return function MockProjectCard({ project }: { project: ProjectUI }) {
    return <div data-testid="project-card">{project.title}</div>;
  };
});

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockProjects: ProjectUI[] = [
  {
    id: '1',
    title: 'Featured Project',
    description: 'Featured project description',
    imageUrl: 'https://example.com/featured.jpg',
    tags: ['React', 'TypeScript'],
    featured: true,
    githubUrl: 'https://github.com/featured',
    liveUrl: 'https://featured.com',
    displayOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  },
  {
    id: '2',
    title: 'Regular Project',
    description: 'Regular project description',
    imageUrl: 'https://example.com/regular.jpg',
    tags: ['Node.js', 'Express'],
    featured: false,
    githubUrl: 'https://github.com/regular',
    liveUrl: 'https://regular.com',
    displayOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  },
];

describe('ProjectSection', () => {
  it('renders featured and non-featured projects separately', () => {
    renderWithTheme(<ProjectSection projects={mockProjects} />);
    
    expect(screen.getByTestId('featured-container')).toBeInTheDocument();
    expect(screen.getByTestId('project-container')).toBeInTheDocument();
    expect(screen.getByText('Featured Project')).toBeInTheDocument();
    expect(screen.getByText('Regular Project')).toBeInTheDocument();
  });

  it('renders only non-featured section when no featured projects exist', () => {
    const nonFeaturedProjects = mockProjects.map(p => ({ ...p, featured: false }));
    renderWithTheme(<ProjectSection projects={nonFeaturedProjects} />);
    
    expect(screen.queryByTestId('featured-container')).not.toBeInTheDocument();
    expect(screen.getByTestId('project-container')).toBeInTheDocument();
  });

  it('renders only featured section when no non-featured projects exist', () => {
    const featuredProjects = mockProjects.map(p => ({ ...p, featured: true }));
    renderWithTheme(<ProjectSection projects={featuredProjects} />);
    
    expect(screen.getByTestId('featured-container')).toBeInTheDocument();
    expect(screen.queryByTestId('project-container')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const testClass = 'custom-class';
    renderWithTheme(<ProjectSection projects={mockProjects} className={testClass} />);
    expect(screen.getByTestId('motion-section')).toHaveClass(testClass);
  });

  it('renders empty state when no projects are provided', () => {
    renderWithTheme(<ProjectSection projects={[]} />);
    expect(screen.queryByTestId('featured-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('project-container')).not.toBeInTheDocument();
  });
}); 