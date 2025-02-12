/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeClient from './HomeClient';
import type { ProjectUI } from '@/types/project';
import { render } from '@/test-utils/test-utils';
import { lightTheme } from '@/styles/themeConfig';

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

// Mock theme context
jest.mock('@/styles/theme', () => ({
  useTheme: () => ({
    theme: lightTheme,
    isDark: false,
    toggleTheme: jest.fn()
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock components
jest.mock('@/components/hero/Hero', () => {
  return function MockHeroSection() {
    return <div data-testid="hero-section">Hero Section</div>;
  };
});

jest.mock('@/components/project-section/ProjectSection', () => {
  const MockProjectSection = React.forwardRef<HTMLDivElement, { projects: ProjectUI[] }>(
    ({ projects }, ref) => {
      return (
        <div data-testid="project-section" ref={ref}>
          {projects.map(project => (
            <div key={project.id} data-testid="project-item">
              {project.title}
            </div>
          ))}
        </div>
      );
    }
  );
  return MockProjectSection;
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 1 }),
}));

jest.mock('@/components/trefoil-knot/TrefoilKnot', () => {
  return function MockTrefoilKnot() {
    return <div data-testid="trefoil-knot">Trefoil Knot</div>;
  };
});

// Mock BackgroundContext
jest.mock('@/context/BackgroundContext', () => ({
  BackgroundProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useBackground: () => ({
    backgroundColor: '#f5f5f5',
    setBackgroundColor: jest.fn(),
    showTrefoil: true,
    setShowTrefoil: jest.fn(),
  }),
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
      displayOrder: 0,
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
      displayOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
  ];

  beforeEach(() => {
    mockFetchMoreProjects.mockReset();
  });

  it('renders initial projects', () => {
    render(<HomeClient initialProjects={mockInitialProjects} />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('project-section')).toBeInTheDocument();
    expect(screen.getAllByTestId('project-item')).toHaveLength(2);
  });

  it('loads more projects on scroll', async () => {
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
        displayOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1,
      },
    ];

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
});
