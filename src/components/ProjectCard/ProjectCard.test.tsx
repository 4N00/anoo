/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from './ProjectCard';
import { ProjectUI } from '@/types/project';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;
declare const beforeEach: any;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
    img: ({ children, ...props }: React.PropsWithChildren<any>) => <img {...props}>{children}</img>,
  },
  useScroll: () => ({ scrollYProgress: 0 }),
  useTransform: () => 'blur(0px)',
}));

// Mock the styled components
jest.mock('./styles', () => ({
  ProjectCardWrapper: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid="project-card" {...props}>
      {children}
    </div>
  ),
  ProjectImage: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <img {...props}>{children}</img>
  ),
  ProjectInfo: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...props}>{children}</div>
  ),
  ProjectHeader: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...props}>{children}</div>
  ),
  ProjectTitle: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <h3 {...props}>{children}</h3>
  ),
  ProjectCategory: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...props}>{children}</div>
  ),
  ProjectDescription: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <p {...props}>{children}</p>
  ),
}));

describe('ProjectCard', () => {
  const mockProject: ProjectUI = {
    id: '1',
    title: 'Test Project',
    description: 'A test project description',
    imageUrl: '/test-image.jpg',
    tags: ['React', 'TypeScript'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
    displayOrder: 0,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockWindowOpen = jest.fn();
  window.open = mockWindowOpen;

  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  it('renders project information correctly', () => {
    const { getByText, getByAltText } = render(<ProjectCard project={mockProject} />);

    expect(getByText('Test Project')).toBeInTheDocument();
    expect(getByText('A test project description')).toBeInTheDocument();
    expect(getByText('React / TypeScript')).toBeInTheDocument();
    expect(getByAltText('Test Project')).toHaveAttribute('src', '/test-image.jpg');
  });

  it('calls onClick handler when provided', () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    fireEvent.click(getByTestId('project-card'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockWindowOpen).not.toHaveBeenCalled();
  });

  it('opens live URL when clicked and no onClick handler provided', () => {
    const { getByTestId } = render(<ProjectCard project={mockProject} />);

    fireEvent.click(getByTestId('project-card'));
    expect(mockWindowOpen).toHaveBeenCalledWith('https://example.com', '_blank');
  });

  it('opens github URL when clicked, no onClick handler and no live URL', () => {
    const projectWithoutLiveUrl = { ...mockProject, liveUrl: '' };
    const { getByTestId } = render(<ProjectCard project={projectWithoutLiveUrl} />);

    fireEvent.click(getByTestId('project-card'));
    expect(mockWindowOpen).toHaveBeenCalledWith('https://github.com/example', '_blank');
  });

  it('limits displayed tags to first two', () => {
    const { getByText, queryByText } = render(<ProjectCard project={mockProject} />);

    expect(getByText('React / TypeScript')).toBeInTheDocument();
    expect(queryByText('Node.js')).not.toBeInTheDocument();
  });
});
