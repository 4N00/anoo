/// <reference types="jest" />
/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import 'jest-styled-components';
import React from 'react';
import { render, screen } from '@/test-utils/test-utils';
import ProjectCard from './ProjectCard';
import { ProjectUI } from '@/types/project';

declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

const mockProject: ProjectUI = {
  id: '1',
  title: 'Test Project',
  description: 'Test Description',
  imageUrl: '/test-image.jpg',
  tags: ['React', 'TypeScript'],
  liveUrl: 'https://test.com',
  githubUrl: 'https://github.com/test',
  featured: false,
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
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
  });

  it('renders project tags', () => {
    render(<ProjectCard project={mockProject} />);
    // Tags are rendered as "React / TypeScript"
    expect(screen.getByText(mockProject.tags.join(' / '))).toBeInTheDocument();
  });

  it('renders project image', () => {
    render(<ProjectCard project={mockProject} />);
    const image = screen.getByRole('img');
    // Next.js Image component transforms the src
    expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(mockProject.imageUrl)));
    expect(image).toHaveAttribute('alt', mockProject.title);
  });
}); 