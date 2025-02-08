/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render } from '../../test-utils/test-utils';
import '@testing-library/jest-dom';
import ProjectSection from './index';
import { ProjectUI } from '@/types/project';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <section {...props}>{children}</section>
    ),
  },
}));

// Mock ProjectCard component
jest.mock('../ProjectCard/ProjectCard', () => {
  return function MockProjectCard({ project }: { project: ProjectUI }) {
    return <div data-testid="project-card">{project.title}</div>;
  };
});

// Mock the styled components
jest.mock('../ProjectCard/styles', () => ({
  ProjectContainer: ({ children }: React.PropsWithChildren<any>) => (
    <div data-testid="project-container">{children}</div>
  ),
  ProjectGrid: ({ children }: React.PropsWithChildren<any>) => (
    <div data-testid="project-grid">{children}</div>
  ),
}));

describe('ProjectSection', () => {
  const mockProjects: ProjectUI[] = [
    {
      id: '1',
      title: 'Featured Project',
      description: 'A featured project description',
      imageUrl: '/featured-image.jpg',
      tags: ['React', 'TypeScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
      displayOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: '2',
      title: 'Regular Project',
      description: 'A regular project description',
      imageUrl: '/regular-image.jpg',
      tags: ['Next.js', 'Supabase'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: false,
      displayOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
  ];

  it('renders all projects', () => {
    const { getAllByTestId } = render(<ProjectSection projects={mockProjects} />);
    const projectCards = getAllByTestId('project-card');
    expect(projectCards).toHaveLength(2);
  });

  it('renders featured and non-featured sections correctly', () => {
    const { getAllByTestId, getByText } = render(<ProjectSection projects={mockProjects} />);

    // Check for section headers
    expect(getByText('FEATURED')).toBeInTheDocument();
    expect(getByText('PROJECTS')).toBeInTheDocument();

    // Check for project containers
    const projectContainers = getAllByTestId('project-container');
    expect(projectContainers).toHaveLength(2);

    // Check for project grids
    const projectGrids = getAllByTestId('project-grid');
    expect(projectGrids).toHaveLength(2);
  });

  it('renders empty section when no projects provided', () => {
    const { queryByTestId } = render(<ProjectSection projects={[]} />);
    expect(queryByTestId('project-card')).not.toBeInTheDocument();
  });

  it('renders only non-featured section when no featured projects', () => {
    const nonFeaturedProjects = mockProjects.map((p) => ({ ...p, featured: false }));
    const { queryByText, getAllByTestId } = render(
      <ProjectSection projects={nonFeaturedProjects} />
    );

    expect(queryByText('FEATURED')).not.toBeInTheDocument();
    expect(queryByText('PROJECTS')).toBeInTheDocument();
    const projectCards = getAllByTestId('project-card');
    expect(projectCards).toHaveLength(2);
  });

  it('renders only featured section when all projects are featured', () => {
    const featuredProjects = mockProjects.map((p) => ({ ...p, featured: true }));
    const { queryByText, getAllByTestId } = render(<ProjectSection projects={featuredProjects} />);

    expect(queryByText('FEATURED')).toBeInTheDocument();
    expect(queryByText('PROJECTS')).not.toBeInTheDocument();
    const projectCards = getAllByTestId('project-card');
    expect(projectCards).toHaveLength(2);
  });
});
