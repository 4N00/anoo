import React from 'react';
import PageFooter from '../components/PageFooter';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useProjects } from '../context/ProjectsContext';

const AdminContainer = styled.div``;
const AdminContent = styled(motion.div)``;
const AdminTitle = styled.h1``;
const AdminSection = styled.section``;
const ProjectList = styled.div``;

const Admin: React.FC = () => {
  const { projects } = useProjects();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
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
          <ProjectList>
            {projects.map(project => (
              <div key={project.id}>
                {project.title || 'Untitled Project'}
              </div>
            ))}
          </ProjectList>
        </AdminSection>
      </AdminContent>
      <PageFooter />
    </AdminContainer>
  );
};

export default Admin;