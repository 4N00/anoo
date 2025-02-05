'use client';

import React from 'react';
import { ProjectUI } from '@/types/project';
import {
  CardContainer,
  ImageContainer,
  Image,
  Content,
  Title,
  Description,
  TagsContainer,
  Tag,
  LinksContainer,
  Link
} from './styles';

export type ProjectCardProps = ProjectUI;

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  tags,
  githubUrl,
  liveUrl
}) => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={title} />
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <TagsContainer>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
        <LinksContainer>
          {githubUrl && (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          )}
          {liveUrl && (
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </Link>
          )}
        </LinksContainer>
      </Content>
    </CardContainer>
  );
};

export default ProjectCard;