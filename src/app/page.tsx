'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/ProjectCard';

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.contrast : theme.colors.text.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrast};
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.error.main};
`;

export default function HomePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { projects, isLoading, error } = useProjects();

  // Get unique tags from all projects
  const allTags = projects
    ? Array.from(new Set(projects.flatMap(project => project.tags)))
    : [];

  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? projects?.filter(project => project.tags.includes(selectedTag))
    : projects;

  if (error) {
    return (
      <Container>
        <ErrorState>
          Error loading projects: {error.message}
        </ErrorState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>My Portfolio</Title>
        <Subtitle>
          A showcase of my projects and professional work in web development
          and software engineering.
        </Subtitle>
      </Header>

      {isLoading ? (
        <LoadingState>Loading projects...</LoadingState>
      ) : (
        <>
          <FilterBar>
            <FilterButton
              $active={!selectedTag}
              onClick={() => setSelectedTag(null)}
            >
              All Projects
            </FilterButton>
            {allTags.map((tag) => (
              <FilterButton
                key={tag}
                $active={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </FilterButton>
            ))}
          </FilterBar>

          <ProjectGrid>
            {filteredProjects?.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </ProjectGrid>

          {filteredProjects?.length === 0 && (
            <LoadingState>
              No projects found{selectedTag ? ` for tag "${selectedTag}"` : ''}.
            </LoadingState>
          )}
        </>
      )}
    </Container>
  );
}
