'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useProjects } from '@/hooks/useProjects';
import { ProjectListItem, ProjectFormData } from '@/types/project';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ProjectForm from '@/components/admin/ProjectForm';

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectListItem | null>(null);
  const { projects, isLoading, error, createProject, updateProject, deleteProject } = useProjects();

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      await createProject(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
      // You might want to show an error toast here
    }
  };

  const handleUpdateProject = async (data: ProjectFormData) => {
    if (!editingProject) return;

    try {
      await updateProject(editingProject.id, data);
      setEditingProject(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating project:', error);
      // You might want to show an error toast here
    }
  };

  const handleDeleteProject = async (project: ProjectListItem) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(project.id);
      } catch (error) {
        console.error('Error deleting project:', error);
        // You might want to show an error toast here
      }
    }
  };

  const handleEdit = (project: ProjectListItem) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <Container>
        <EmptyState>
          Error loading projects: {error.message}
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Project Management</Title>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Project
        </Button>
      </Header>

      {isLoading ? (
        <EmptyState>Loading projects...</EmptyState>
      ) : !projects?.length ? (
        <EmptyState>
          No projects yet. Click &quot;Add New Project&quot; to create one.
        </EmptyState>
      ) : (
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isAdmin
              onEdit={() => handleEdit(project)}
              onDelete={() => handleDeleteProject(project)}
            />
          ))}
        </ProjectGrid>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
      >
        <ProjectForm
          initialData={editingProject || undefined}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onCancel={handleCloseModal}
        />
      </Modal>
    </Container>
  );
}