'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProjectUI } from '@/types/project';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/context/ProjectsContext';
import { Modal } from '@/components/ui/modal';
import { Container } from '@/components/ui/container';
import { Header } from '@/app/styles';
import { Title } from '@/app/login/styles';

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
    <Container>
      <Header>
        <Title>Project Management</Title>
        <Button onClick={handleAddProject} $variant="secondary">
          <Plus size={20} />
          New Project
        </Button>
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
    </Container>
  );
};

export default AdminPageClient;