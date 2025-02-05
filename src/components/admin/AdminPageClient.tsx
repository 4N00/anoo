'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ProjectUI } from '@/types/project';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

const AdminPageContainer = styled.div`
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

interface AdminPageClientProps {
  initialProjects: ProjectUI[];
}

const AdminPageClient: React.FC<AdminPageClientProps> = ({ initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectUI | null>(null);

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
      setProjects(projects.map(p => 
        p.id === savedProject.id ? savedProject : p
      ));
    } else {
      setProjects([savedProject, ...projects]);
    }
    handleCloseForm();
  };

  const handleProjectDeleted = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  return (
    <AdminPageContainer>
      <Header>
        <Title>Project Management</Title>
        <AddButton onClick={handleAddProject}>Add Project</AddButton>
      </Header>

      <ProjectList 
        projects={projects}
        onEdit={handleEditProject}
        onDelete={handleProjectDeleted}
      />

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleProjectSaved}
          onClose={handleCloseForm}
        />
      )}
    </AdminPageContainer>
  );
};

export default AdminPageClient;