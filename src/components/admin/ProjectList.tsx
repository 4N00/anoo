'use client';

import React from 'react';
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
import { useToast } from '@/context/ToastContext';
import Button from '@/components/ui/button/Button';
import {
  ListContainer,
  SectionTitle,
  ProjectsContainer,
  ProjectItem,
  DragHandle,
  ProjectTitle,
  MetaItem,
  StatusBadge,
  Actions
} from './styles';

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
    <ListContainer data-cy="admin-projects-table">
      <DragDropContext onDragEnd={handleDragEnd}>
        {featuredProjects.length > 0 && (
          <>
            <SectionTitle>Featured Projects</SectionTitle>
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
                          data-cy="admin-project-row"
                        >
                          <DragHandle {...provided.dragHandleProps}>
                            <GripVertical />
                          </DragHandle>
                          <ProjectTitle data-cy="project-title">{project.title}</ProjectTitle>
                          <MetaItem>
                            <User />
                            Admin
                          </MetaItem>
                          <MetaItem>
                            <Clock />
                            {new Date(project.updatedAt || '').toLocaleDateString()}
                          </MetaItem>
                          <StatusBadge $status="active">Featured</StatusBadge>
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

        <SectionTitle>All Projects</SectionTitle>
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
                      data-cy="admin-project-row"
                    >
                      <DragHandle {...provided.dragHandleProps}>
                        <GripVertical />
                      </DragHandle>
                      <ProjectTitle data-cy="project-title">{project.title}</ProjectTitle>
                      <MetaItem>
                        <User />
                        Admin
                      </MetaItem>
                      <MetaItem>
                        <Clock />
                        {new Date(project.updatedAt || '').toLocaleDateString()}
                      </MetaItem>
                      <StatusBadge $status="completed">Published</StatusBadge>
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
