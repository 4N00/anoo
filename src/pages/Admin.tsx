'use client';

import React, { useState } from 'react';
import PageFooter from '../components/PageFooter';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import ProjectForm from '../components/admin/ProjectForm';
import { ProjectFormData } from '@/types/project';
import StyledButton from '@/components/ui/StyledButton';

const AdminContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const AdminContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const AdminTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
`;

const AdminSection = styled.section`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ProjectList = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.main};
  }
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FormSection = styled(AdminSection)`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const Admin: React.FC = () => {
  const { projects, createProject } = useProjects();
  const [showForm, setShowForm] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      await createProject(data);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <AdminContainer>
      <AdminContent
        variants={container}
        initial="hidden"
        animate="show"
      >
        <AdminTitle>Admin Dashboard</AdminTitle>
        
        <AdminSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SectionTitle>Projects</SectionTitle>
            <StyledButton
              onClick={() => setShowForm(!showForm)}
              $variant="primary"
            >
              {showForm ? 'Cancel' : 'Add New Project'}
            </StyledButton>
          </div>

          {showForm && (
            <FormSection>
              <SectionTitle>Create New Project</SectionTitle>
              <ProjectForm onSubmit={handleCreateProject} />
            </FormSection>
          )}

          <ProjectList>
            {projects.map(project => (
              <ProjectItem key={project.id}>
                <ProjectTitle>{project.title || 'Untitled Project'}</ProjectTitle>
              </ProjectItem>
            ))}
          </ProjectList>
        </AdminSection>
      </AdminContent>
      <PageFooter />
    </AdminContainer>
  );
};

export default Admin;