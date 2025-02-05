'use client';

import React, { useState } from 'react';
import { styled } from 'styled-components';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';
import { ProjectFormData, ProjectUI } from '@/types/project';
import { useProjects } from '@/hooks/useProjects';
import { useToast } from '@/context/ToastContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Admin = () => {
  const { projects, createProject, updateProject } = useProjects();
  const [editingProject, setEditingProject] = useState<ProjectUI | null>(null);
  const { showToast } = useToast();

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, data);
        showToast('Project updated successfully!', 'success');
      } else {
        await createProject(data);
        showToast('Project created successfully!', 'success');
      }
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to save project',
        'error'
      );
      throw error; // Re-throw to be handled by the form
    }
  };

  const handleEdit = (project: ProjectUI) => {
    setEditingProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <Title>Admin Dashboard</Title>

      <Section>
        <SectionTitle>
          {editingProject ? 'Edit Project' : 'Create New Project'}
        </SectionTitle>
        <ProjectForm
          onSubmit={handleSubmit}
          initialData={editingProject || undefined}
        />
      </Section>

      <Section>
        <SectionTitle>Manage Projects</SectionTitle>
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onProjectsChange={() => {}} // No need to manually refresh since we have real-time updates
        />
      </Section>
    </Container>
  );
};

export default Admin;