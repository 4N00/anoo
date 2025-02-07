'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  type DroppableProvided,
  type DraggableProvided,
  type DraggableStateSnapshot,
  type DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { ProjectUI } from '@/types/project';
import { Button } from '@/styles/components/Button';
import { useToast } from '@/context/ToastContext';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const FeaturedSection = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const FeaturedTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const ProjectsContainer = styled.div<{ $isDraggingOver?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme, $isDraggingOver }) =>
    $isDraggingOver ? theme.colors.background.secondary : theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  min-height: 100px;
  transition: background-color 0.2s ease;
  border: 2px dashed
    ${({ theme, $isDraggingOver }) => ($isDraggingOver ? theme.colors.primary.main : 'transparent')};
`;

const ProjectItem = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme, $isDragging }) =>
    $isDragging ? theme.colors.background.primary : theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme, $isDragging }) => ($isDragging ? theme.shadows.lg : theme.shadows.sm)};
  transition:
    background-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
  position: relative;
  border: 2px solid
    ${({ theme, $isDragging }) => ($isDragging ? theme.colors.primary.main : 'transparent')};
  transform: scale(${({ $isDragging }) => ($isDragging ? 1.02 : 1)});
`;

const OrderNumber = styled.div`
  position: absolute;
  top: -0.75rem;
  left: -0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
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
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

interface ProjectListProps {
  projects: ProjectUI[];
  onEdit: (project: ProjectUI) => void;
  onDelete: (projectId: string) => void;
  onReorder?: (startIndex: number, endIndex: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete, onReorder }) => {
  const { showToast } = useToast();

  const handleDelete = async (project: ProjectUI) => {
    if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      onDelete(project.id);
      showToast('Project deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting project:', error);
      showToast(error instanceof Error ? error.message : 'Failed to delete project', 'error');
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !onReorder) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    onReorder(sourceIndex, destinationIndex);
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  const renderProject = (project: ProjectUI, index: number, isDraggable = true) => (
    <Draggable
      key={project.id}
      draggableId={project.id}
      index={index}
      isDragDisabled={!isDraggable}
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <ProjectItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          $isDragging={snapshot.isDragging}
        >
          <OrderNumber>{index + 1}</OrderNumber>
          <DragHandle {...provided.dragHandleProps}>
            <GripVertical size={20} />
          </DragHandle>
          <ProjectInfo>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectTags>
              {project.tags.map((tag, tagIndex) => (
                <Tag key={tagIndex}>{tag}</Tag>
              ))}
            </ProjectTags>
          </ProjectInfo>
          <ActionButtons>
            <Button $variant="secondary" onClick={() => onEdit(project)}>
              Edit
            </Button>
            <Button $variant="danger" onClick={() => handleDelete(project)}>
              Delete
            </Button>
          </ActionButtons>
        </ProjectItem>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ListContainer>
        {featuredProjects.length > 0 && (
          <FeaturedSection>
            <FeaturedTitle>Featured Projects</FeaturedTitle>
            <Droppable droppableId="featured-projects">
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <ProjectsContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  $isDraggingOver={snapshot.isDraggingOver}
                >
                  {featuredProjects.map((project, index) => renderProject(project, index, false))}
                  {provided.placeholder}
                </ProjectsContainer>
              )}
            </Droppable>
          </FeaturedSection>
        )}

        <Droppable droppableId="project-list">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <ProjectsContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isDraggingOver={snapshot.isDraggingOver}
            >
              {regularProjects.map((project, index) => renderProject(project, index))}
              {provided.placeholder}
            </ProjectsContainer>
          )}
        </Droppable>

        {projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            No projects found. Create your first project using the form above.
          </div>
        )}
      </ListContainer>
    </DragDropContext>
  );
};

export default ProjectList;
