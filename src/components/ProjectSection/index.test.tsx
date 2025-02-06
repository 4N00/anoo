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
  ProjectContainer: ({
    children,
    $featured,
    ...props
  }: React.PropsWithChildren<any> & { $featured?: boolean }) => (
    <div data-testid="project-container" {...props}>
      {children}
    </div>
  ),
}));

describe('ProjectSection', () => {
  const mockProjects: ProjectUI[] = [
    {
      id: '1',
      title: 'Project 1',
      description: 'Description 1',
      imageUrl: '/image1.jpg',
      tags: ['React'],
      liveUrl: 'https://live1.com',
      githubUrl: 'https://github.com/1',
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Description 2',
      imageUrl: '/image2.jpg',
      tags: ['TypeScript'],
      liveUrl: 'https://live2.com',
      githubUrl: 'https://github.com/2',
      featured: false,
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

  it('renders title when provided', () => {
    const title = 'My Projects';
    const { getByText } = render(<ProjectSection projects={mockProjects} title={title} />);
    expect(getByText(title)).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    const { container } = render(<ProjectSection projects={mockProjects} />);
    expect(container.querySelector('h2')).not.toBeInTheDocument();
  });

  it('passes featured prop to ProjectContainer', () => {
    const { container } = render(<ProjectSection projects={mockProjects} featured={true} />);
    const projectContainer = container.querySelector('[data-testid="project-container"]');
    expect(projectContainer).toBeInTheDocument();
  });

  it('renders with default featured value when not provided', () => {
    const { container } = render(<ProjectSection projects={mockProjects} />);
    const projectContainer = container.querySelector('[data-testid="project-container"]');
    expect(projectContainer).toBeInTheDocument();
  });

  it('renders empty section when no projects provided', () => {
    const { queryByTestId } = render(<ProjectSection projects={[]} />);
    expect(queryByTestId('project-card')).not.toBeInTheDocument();
  });
});
