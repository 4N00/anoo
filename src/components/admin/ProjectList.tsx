'use client';

import React from 'react';
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
import { GripVertical, Clock, User } from 'lucide-react';
import { ProjectUI } from '@/types/project';
import { Button } from '@/styles/components/Button';
import { useToast } from '@/context/ToastContext';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:before {
    content: '•';
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ProjectsContainer = styled.div<{ $isDraggingOver?: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ $isDraggingOver, theme }) =>
    $isDraggingOver ? theme.colors.background.secondary : 'transparent'};
  transition: background-color 0.2s ease;
`;

const ProjectItem = styled.div<{ $isDragging?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
  background: ${({ $isDragging, theme }) =>
    $isDragging ? theme.colors.background.secondary : theme.colors.background.primary};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StatusBadge = styled.span<{ $status: 'active' | 'completed' }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: ${({ $status, theme }) =>
    $status === 'active' ? theme.colors.warning.light : theme.colors.success.light};
  color: ${({ $status, theme }) =>
    $status === 'active' ? theme.colors.warning.dark : theme.colors.success.dark};
`;

const Actions = styled.div`
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

  return (
    <ListContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        {featuredProjects.length > 0 && (
          <>
            <SectionTitle>Week 1</SectionTitle>
            <Droppable droppableId="featured-projects">
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <ProjectsContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  $isDraggingOver={snapshot.isDraggingOver}
                >
                  {featuredProjects.map((project, index) => (
                    <Draggable key={project.id} draggableId={project.id} index={index}>
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <ProjectItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          $isDragging={snapshot.isDragging}
                        >
                          <DragHandle {...provided.dragHandleProps}>
                            <GripVertical />
                          </DragHandle>
                          <ProjectTitle>{project.title}</ProjectTitle>
                          <MetaItem>
                            <User />
                            John Doe
                          </MetaItem>
                          <MetaItem>
                            <Clock />8 hours
                          </MetaItem>
                          <StatusBadge $status="active">In Progress</StatusBadge>
                          <Actions>
                            <Button $variant="secondary" onClick={() => onEdit(project)}>
                              Edit
                            </Button>
                            <Button $variant="danger" onClick={() => handleDelete(project)}>
                              Delete
                            </Button>
                          </Actions>
                        </ProjectItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ProjectsContainer>
              )}
            </Droppable>
          </>
        )}

        <SectionTitle>Week 2</SectionTitle>
        <Droppable droppableId="project-list">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <ProjectsContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isDraggingOver={snapshot.isDraggingOver}
            >
              {regularProjects.map((project, index) => (
                <Draggable key={project.id} draggableId={project.id} index={index}>
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <ProjectItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      $isDragging={snapshot.isDragging}
                    >
                      <DragHandle {...provided.dragHandleProps}>
                        <GripVertical />
                      </DragHandle>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <MetaItem>
                        <User />
                        Jane Smith
                      </MetaItem>
                      <MetaItem>
                        <Clock />6 hours
                      </MetaItem>
                      <StatusBadge $status="completed">Done</StatusBadge>
                      <Actions>
                        <Button $variant="secondary" onClick={() => onEdit(project)}>
                          Edit
                        </Button>
                        <Button $variant="danger" onClick={() => handleDelete(project)}>
                          Delete
                        </Button>
                      </Actions>
                    </ProjectItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ProjectsContainer>
          )}
        </Droppable>
      </DragDropContext>
    </ListContainer>
  );
};

export default ProjectList;
