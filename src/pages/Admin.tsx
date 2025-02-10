'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ProjectUI } from '@/types/project';
import ProjectList from '@/components/admin/ProjectList';
import ProjectForm from '@/components/admin/ProjectForm';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/styles/components/Button';
import { Search, Filter, SortAsc, Plus, User } from 'lucide-react';
import Modal from '@/components/ui/Modal/Modal';

const AdminContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: calc(100vh - 64px);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
    width: 20px;
    height: 20px;
  }
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 240px;

  svg {
    position: absolute;
    left: ${({ theme }) => theme.spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.text.secondary};
    width: 16px;
    height: 16px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  svg {
    width: 16px;
    height: 16px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AddButton = styled(Button)`
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  svg {
    width: 16px;
    height: 16px;
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
    if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
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
      <ContentWrapper>
        <Header>
          <Title>
            <User />
            Admin Panel
          </Title>
          <AddButton onClick={handleAddProject} disabled={isSaving || isDeleting}>
            <Plus />
            New Project
          </AddButton>
        </Header>

        <ToolBar>
          <SearchWrapper>
            <Search />
            <SearchInput placeholder="Search projects..." disabled={isSaving || isDeleting} />
          </SearchWrapper>
          <IconButton disabled={isSaving || isDeleting}>
            <User />
          </IconButton>
          <IconButton disabled={isSaving || isDeleting}>
            <Filter />
          </IconButton>
          <IconButton disabled={isSaving || isDeleting}>
            <SortAsc />
          </IconButton>
        </ToolBar>

        <ProjectList
          projects={projects}
          onEdit={handleEditProject}
          onDelete={(projectId) => {
            const project = projects.find((p) => p.id === projectId);
            if (project) {
              handleDelete(project);
            }
          }}
          onReorder={handleProjectReorder}
        />

        <Modal isOpen={showForm} onClose={handleCloseForm}>
          <ProjectForm 
            project={editingProject} 
            onSave={handleSave} 
            onClose={handleCloseForm} 
          />
        </Modal>
      </ContentWrapper>
    </AdminContainer>
  );
};

export default Admin;
