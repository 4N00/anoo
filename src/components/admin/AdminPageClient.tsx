'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Plus } from 'lucide-react';
import { ProjectUI } from '@/types/project';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import { StyledButton } from '@/components/ui/button/styles';
import { useProjects } from '@/context/ProjectsContext';
import { Modal } from '@/components/ui/modal';
const AdminPageContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
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

interface AdminPageClientProps {}

const AdminPageClient: React.FC<AdminPageClientProps> = () => {
  const { projects, refreshProjects } = useProjects();
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

  const handleProjectSaved = async () => {
    await refreshProjects();
    handleCloseForm();
  };

  const handleProjectDeleted = async () => {
    await refreshProjects();
  };

  return (
    <AdminPageContainer>
      <Header>
        <Title>Project Management</Title>
        <StyledButton onClick={handleAddProject} $variant="secondary">
          <Plus size={20} />
          New Project
        </StyledButton>
      </Header>

      <ProjectList 
        projects={projects}
        onEdit={handleEditProject}
        onDelete={handleProjectDeleted}
      />

      <Modal isOpen={showForm} onClose={handleCloseForm}>
        <ProjectForm
          project={editingProject}
          onSave={handleProjectSaved}
          onClose={handleCloseForm}
        />
      </Modal>
    </AdminPageContainer>
  );
};

export default AdminPageClient;