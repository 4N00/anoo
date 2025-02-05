'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ProjectUI } from '@/types/project';
import { StyledButton } from '../ui/StyledButton';
import { useToast } from '@/context/ToastContext';
import { useProjects } from '@/hooks/useProjects';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProjectItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const ProjectInfo = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const ProjectTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ProjectTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface ProjectListProps {
  projects: ProjectUI[];
  onEdit: (project: ProjectUI) => void;
  onProjectsChange: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { showToast } = useToast();
  const { deleteProject } = useProjects();

  const handleDelete = async (project: ProjectUI) => {
    if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    setIsDeleting(project.id);
    try {
      await deleteProject(project.id);
      showToast('Project deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting project:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to delete project',
        'error'
      );
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <ListContainer>
      {projects.map(project => (
        <ProjectItem key={project.id}>
          <ProjectInfo>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectTags>
              {project.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </ProjectTags>
          </ProjectInfo>
          <ButtonGroup>
            <StyledButton
              onClick={() => onEdit(project)}
              $variant="secondary"
              type="button"
            >
              Edit
            </StyledButton>
            <StyledButton
              onClick={() => handleDelete(project)}
              $variant="error"
              type="button"
              disabled={isDeleting === project.id}
            >
              {isDeleting === project.id ? 'Deleting...' : 'Delete'}
            </StyledButton>
          </ButtonGroup>
        </ProjectItem>
      ))}
      {projects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          No projects found. Create your first project using the form above.
        </div>
      )}
    </ListContainer>
  );
};

export default ProjectList;