/// <reference types="@testing-library/jest-dom" />
import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from './ProjectCard';
import { ProjectUI } from '@/types/project';
import { stripMotionProps, stripAllProps } from '@/test-utils/mockHelpers';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

type HTMLElementProps = HTMLAttributes<any> & { children?: React.ReactNode };

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: forwardRef<any, HTMLElementProps>(({ children, ...props }, ref) => (
      <div ref={ref} {...stripMotionProps(props)}>
        {children}
      </div>
    )),
    img: forwardRef<any, HTMLElementProps & { src?: string; alt?: string }>(
      ({ children, ...props }, ref) => (
        <img ref={ref} {...stripMotionProps(props)}>
          {children}
        </img>
      )
    ),
  },
  useScroll: () => ({ scrollYProgress: 0 }),
  useTransform: () => 'blur(0px)',
}));

// Mock the styled components
jest.mock('./styles', () => ({
  ProjectCardWrapper: forwardRef<any, HTMLElementProps>(({ children, ...props }, ref) => (
    <div ref={ref} data-testid="project-card" {...stripAllProps(props)}>
      {children}
    </div>
  )),
  ProjectImage: forwardRef<any, HTMLElementProps & { src?: string; alt?: string }>(
    ({ children, ...props }, ref) => (
      <img ref={ref} {...stripAllProps(props)}>
        {children}
      </img>
    )
  ),
  ProjectInfo: forwardRef<any, HTMLElementProps>(({ children, ...props }, ref) => (
    <div ref={ref} {...stripAllProps(props)}>
      {children}
    </div>
  )),
  ProjectHeader: forwardRef<any, HTMLElementProps>(({ children, ...props }, ref) => (
    <div ref={ref} {...stripAllProps(props)}>
      {children}
    </div>
  )),
  ProjectTitle: forwardRef<any, HTMLElementProps>(({ children, ...props }, ref) => (
    <h3 ref={ref} {...stripAllProps(props)}>
      {children}
    </h3>
  )),
  ProjectCategory: forwardRef<any, HTMLElementProps>(({ children, ...props }, ref) => (
    <div ref={ref} {...stripAllProps(props)}>
      {children}
    </div>
  )),
  ProjectDescription: forwardRef<any, HTMLElementProps>(({ children, ...props }, ref) => (
    <p ref={ref} {...stripAllProps(props)}>
      {children}
    </p>
  )),
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

  it('renders project information correctly', () => {
    const { getByText, getByAltText } = render(<ProjectCard project={mockProject} />);

    expect(getByText('Test Project')).toBeInTheDocument();
    expect(getByText('A test project description')).toBeInTheDocument();
    expect(getByText('React / TypeScript')).toBeInTheDocument();
    expect(getByAltText('Test Project')).toHaveAttribute('src', '/test-image.jpg');
  });

  it('limits displayed tags to first two', () => {
    const { getByText, queryByText } = render(<ProjectCard project={mockProject} />);

    expect(getByText('React / TypeScript')).toBeInTheDocument();
    expect(queryByText('Node.js')).not.toBeInTheDocument();
  });
});
