/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import 'jest-styled-components';
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
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

const mockProjects: ProjectUI[] = [
  {
    id: '1',
    title: 'Featured Project',
    description: 'Featured project description',
    imageUrl: '/featured.jpg',
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
    imageUrl: '/regular.jpg',
    tags: ['Next.js', 'JavaScript'],
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
    render(<ProjectSection projects={mockProjects} />);

    expect(screen.getByText('Featured Project')).toBeInTheDocument();
    expect(screen.getByText('Regular Project')).toBeInTheDocument();
  });

  it('renders only non-featured section when no featured projects exist', () => {
    const nonFeaturedProjects = mockProjects.filter(p => !p.featured);
    render(<ProjectSection projects={nonFeaturedProjects} />);

    expect(screen.queryByText('Featured Project')).not.toBeInTheDocument();
    expect(screen.getByText('Regular Project')).toBeInTheDocument();
  });

  it('renders only featured section when no non-featured projects exist', () => {
    const featuredProjects = mockProjects.filter(p => p.featured);
    render(<ProjectSection projects={featuredProjects} />);

    expect(screen.getByText('Featured Project')).toBeInTheDocument();
    expect(screen.queryByText('Regular Project')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    render(<ProjectSection projects={mockProjects} className={customClass} />);
    
    const section = screen.getByTestId('motion-section');
    expect(section).toHaveClass(customClass);
  });

  it('renders empty state when no projects are provided', () => {
    render(<ProjectSection projects={[]} />);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
}); 