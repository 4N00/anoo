'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ProjectUI } from '@/types/project';
import ProjectList from '@/components/admin/ProjectList';
import ProjectForm from '@/components/admin/ProjectForm';
import { useToast } from '@/context/ToastContext';

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

interface AdminProps {
  initialProjects: ProjectUI[];
}

const Admin: React.FC<AdminProps> = ({ initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectUI | null>(null);
  const { showToast } = useToast();

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project: ProjectUI) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleProjectSaved = (savedProject: ProjectUI) => {
    if (editingProject) {
      setProjects((projects) => projects.map((p) => (p.id === savedProject.id ? savedProject : p)));
    } else {
      setProjects((projects) => [savedProject, ...projects]);
    }
    handleCloseForm();
  };

  const handleProjectDeleted = (projectId: string) => {
    setProjects((projects) => projects.filter((p) => p.id !== projectId));
  };

  const handleProjectReorder = async (startIndex: number, endIndex: number) => {
    // Get only the non-featured projects since we're reordering those
    const regularProjects = projects.filter((p) => !p.featured);

    // Create a new array with the reordered regular projects
    const reorderedRegularProjects = Array.from(regularProjects);
    const [removed] = reorderedRegularProjects.splice(startIndex, 1);
    if (!removed) return;

    reorderedRegularProjects.splice(endIndex, 0, removed);

    // Combine featured and reordered regular projects
    const featuredProjects = projects.filter((p) => p.featured);
    const newProjects = [...featuredProjects, ...reorderedRegularProjects];

    // Update the local state immediately for a smooth UI experience
    setProjects(newProjects);

    try {
      // Update the display order in the database using the reordered array
      const updates = reorderedRegularProjects.map((project, index) => ({
        id: project.id,
        display_order: index + featuredProjects.length, // Add offset for featured projects
      }));

      const response = await fetch('/api/projects/reorder', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server error:', responseData);
        throw new Error(responseData.error || 'Failed to update project order');
      }

      showToast('Project order updated successfully', 'success');
    } catch (error) {
      console.error('Error updating project order:', error);
      showToast(error instanceof Error ? error.message : 'Failed to update project order', 'error');
      // Revert to the original order if the update fails
      setProjects(projects);
    }
  };

  return (
    <AdminContainer>
      <Header>
        <Title>Project Management</Title>
        <AddButton onClick={handleAddProject}>Add Project</AddButton>
      </Header>

      <ProjectList
        projects={projects}
        onEdit={handleEditProject}
        onDelete={handleProjectDeleted}
        onReorder={handleProjectReorder}
      />

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleProjectSaved}
          onClose={handleCloseForm}
        />
      )}
    </AdminContainer>
  );
};

export default Admin;
