/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeClient from './HomeClient';
import type { ProjectUI } from '@/types/project';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;
declare const beforeEach: any;

// Mock modules
const mockFetchMoreProjects = jest.fn();
jest.mock('@/hooks/useProjects', () => ({
  useProjects: () => ({
    fetchMoreProjects: mockFetchMoreProjects,
  }),
}));

// Mock components
jest.mock('@/components/HeroSection', () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section</div>;
  };
});

jest.mock('@/components/ProjectSection', () => {
  return function MockProjectSection({ projects }: { projects: ProjectUI[] }) {
    return (
      <div data-testid="project-section">
        {projects.map((project) => (
          <div key={project.id} data-testid="project-item">
            {project.title}
          </div>
        ))}
      </div>
    );
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 1 }),
}));

describe('HomeClient', () => {
  const mockInitialProjects: ProjectUI[] = [
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

  const mockMoreProjects: ProjectUI[] = [
    {
      id: '3',
      title: 'Project 3',
      description: 'Description 3',
      imageUrl: '/image3.jpg',
      tags: ['Node.js'],
      liveUrl: 'https://live3.com',
      githubUrl: 'https://github.com/3',
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
  ];

  beforeEach(() => {
    mockFetchMoreProjects.mockReset();
    // Mock window properties and methods
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    Object.defineProperty(window, 'pageYOffset', { value: 0, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1600,
      configurable: true,
    });
  });

  it('renders initial projects', () => {
    render(<HomeClient initialProjects={mockInitialProjects} />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('project-section')).toBeInTheDocument();
    expect(screen.getAllByTestId('project-item')).toHaveLength(2);
  });

  it('loads more projects on scroll', async () => {
    mockFetchMoreProjects.mockResolvedValue(mockMoreProjects);
    render(<HomeClient initialProjects={mockInitialProjects} />);

    // Simulate scrolling to bottom
    Object.defineProperty(window, 'pageYOffset', { value: 1000 });
    fireEvent.scroll(window);

    // Wait for new projects to be loaded
    await waitFor(() => {
      expect(screen.getAllByTestId('project-item')).toHaveLength(3);
    });
  });

  it('stops loading more projects when no more are available', async () => {
    mockFetchMoreProjects.mockResolvedValue([]);
    render(<HomeClient initialProjects={mockInitialProjects} />);

    // Simulate scrolling to bottom
    Object.defineProperty(window, 'pageYOffset', { value: 1000 });
    fireEvent.scroll(window);

    // Wait for the loading to complete
    await waitFor(() => {
      expect(screen.getAllByTestId('project-item')).toHaveLength(2);
    });
  });

  it('handles scroll to #projects hash on mount', () => {
    const scrollIntoViewMock = jest.fn();
    window.location.hash = '#projects';

    render(<HomeClient initialProjects={mockInitialProjects} />);
    const projectsSection = screen.getByTestId('project-section');
    projectsSection.scrollIntoView = scrollIntoViewMock;

    // Wait for the timeout to execute
    jest.advanceTimersByTime(100);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('handles errors when loading more projects', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetchMoreProjects.mockRejectedValue(new Error('Failed to load'));

    render(<HomeClient initialProjects={mockInitialProjects} />);

    // Simulate scrolling to bottom
    Object.defineProperty(window, 'pageYOffset', { value: 1000 });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching more projects:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
