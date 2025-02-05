import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import type { ProjectListItem } from '@/types/project';
import { Button, LinkButton } from '@/components/ui/Button';

interface ProjectCardProps {
  project: ProjectListItem;
  isAdmin?: boolean;
  onEdit?: (project: ProjectListItem) => void;
  onDelete?: (project: ProjectListItem) => void;
}

const Card = styled.article`
  position: relative;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.contrast};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  z-index: 1;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AdminActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.background.secondary};
`;

export default function ProjectCard({
  project,
  isAdmin = false,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const {
    title,
    description,
    imageUrl,
    githubUrl,
    liveUrl,
    tags,
    featured,
  } = project;

  return (
    <Card>
      {featured && <FeaturedBadge>Featured</FeaturedBadge>}
      <ImageContainer>
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        
        <TagsContainer>
          {tags.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>

        <Links>
          {liveUrl && (
            <LinkButton
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="small"
            >
              View Live
            </LinkButton>
          )}
          {githubUrl && (
            <LinkButton
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="small"
            >
              View Code
            </LinkButton>
          )}
        </Links>

        {isAdmin && (
          <AdminActions>
            <Button
              variant="secondary"
              size="small"
              onClick={() => onEdit?.(project)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="small"
              onClick={() => onDelete?.(project)}
            >
              Delete
            </Button>
          </AdminActions>
        )}
      </Content>
    </Card>
  );
}