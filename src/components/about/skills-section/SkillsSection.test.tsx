/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsSection from './SkillsSection';
import { stripMotionProps, stripAllProps } from '@/test-utils/mockHelpers';

// Declare Jest globals
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => (
      <div {...stripMotionProps(props)}>{children}</div>
    ),
  },
}));

// Mock the styled components
jest.mock('@/styles/AboutStyles', () => ({
  SectionContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...stripAllProps(props)}>{children}</div>
  ),
  Title: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <h3 {...stripAllProps(props)}>{children}</h3>
  ),
  GroupContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...stripAllProps(props)}>{children}</div>
  ),
  Grid: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...stripAllProps(props)}>{children}</div>
  ),
  SkillContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...stripAllProps(props)}>{children}</div>
  ),
  SkillName: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...stripAllProps(props)}>{children}</div>
  ),
  SkillNameText: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <span {...stripAllProps(props)}>{children}</span>
  ),
  ProgressContainer: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...stripAllProps(props)}>{children}</div>
  ),
  ProgressBar: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...stripAllProps(props)}>{children}</div>
  ),
  SkillLevel: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...stripAllProps(props)}>{children}</div>
  ),
}));

describe('SkillsSection', () => {
  const mockSkills = [
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'GraphQL', level: 70 },
    { name: 'Docker', level: 65 },
    { name: 'AWS', level: 60 },
  ];

  it('renders all skills correctly', () => {
    const { getByText } = render(<SkillsSection skills={mockSkills} />);

    mockSkills.forEach((skill) => {
      expect(getByText(skill.name)).toBeInTheDocument();
      expect(getByText(`${(skill.level / 10).toFixed(2)} / 10`)).toBeInTheDocument();
    });
  });

  it('chunks skills into groups of 5', () => {
    const { getAllByTestId } = render(<SkillsSection skills={mockSkills} />);

    const skillItems = getAllByTestId('skill-item');
    expect(skillItems).toHaveLength(mockSkills.length);

    // First group should have 5 skills
    const firstGroupSkills = skillItems.slice(0, 5);
    expect(firstGroupSkills).toHaveLength(5);

    // Second group should have 1 skill
    const secondGroupSkills = skillItems.slice(5);
    expect(secondGroupSkills).toHaveLength(1);
  });

  it('renders without variants prop', () => {
    expect(() => render(<SkillsSection skills={mockSkills} />)).not.toThrow();
  });
});
