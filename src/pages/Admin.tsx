'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ProjectUI } from '@/types/project';
import ProjectList from '@/components/admin/ProjectList';
import ProjectForm from '@/components/admin/ProjectForm';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/styles/components/Button';

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

interface AdminProps {
  initialProjects: ProjectUI[];
}

const Admin: React.FC<AdminProps> = ({ initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectUI | null>(null);
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleSave = async (project: ProjectUI) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Server error:', responseData);
        throw new Error(responseData.error || 'Failed to save project');
      }

      handleProjectSaved(responseData);
      showToast('Project saved successfully', 'success');
    } catch (error) {
      console.error('Error saving project:', error);
      showToast(error instanceof Error ? error.message : 'Failed to save project', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (project: ProjectUI) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Server error:', response.statusText);
        throw new Error(response.statusText);
      }

      handleProjectDeleted(project.id);
      showToast('Project deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting project:', error);
      showToast(error instanceof Error ? error.message : 'Failed to delete project', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminContainer>
      <Header>
        <Title>Project Management</Title>
        <Button onClick={handleAddProject}>Add Project</Button>
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
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}
    </AdminContainer>
  );
};

export default Admin;
