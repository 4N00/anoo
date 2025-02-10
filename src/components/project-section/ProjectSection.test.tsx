/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import ProjectSection from './ProjectSection';
import { ProjectUI } from '@/types/project';

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
    
    // Check for section headers
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
    expect(screen.getByText('PROJECTS')).toBeInTheDocument();
    
    // Check for project titles
    expect(screen.getByText('Featured Project')).toBeInTheDocument();
    expect(screen.getByText('Regular Project')).toBeInTheDocument();
  });

  it('renders only non-featured section when no featured projects exist', () => {
    const nonFeaturedProjects = mockProjects.map(p => ({ ...p, featured: false }));
    renderWithTheme(<ProjectSection projects={nonFeaturedProjects} />);
    
    expect(screen.queryByText('FEATURED')).not.toBeInTheDocument();
    expect(screen.getByText('PROJECTS')).toBeInTheDocument();
  });

  it('renders only featured section when no non-featured projects exist', () => {
    const featuredProjects = mockProjects.map(p => ({ ...p, featured: true }));
    renderWithTheme(<ProjectSection projects={featuredProjects} />);
    
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
    expect(screen.queryByText('PROJECTS')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const testClass = 'custom-class';
    const { container } = renderWithTheme(
      <ProjectSection projects={mockProjects} className={testClass} />
    );
    expect(container.firstChild).toHaveClass(testClass);
  });

  it('renders empty state when no projects are provided', () => {
    renderWithTheme(<ProjectSection projects={[]} />);
    expect(screen.queryByText('FEATURED')).not.toBeInTheDocument();
    expect(screen.queryByText('PROJECTS')).not.toBeInTheDocument();
  });
}); 