'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormData } from '@/types/project';
import FormInput from '../ui/FormInput';
import { StyledButton } from '../ui/StyledButton';
import { styled } from 'styled-components';
import { useToast } from '@/context/ToastContext';

// Form input type with tags as string
type ProjectFormInput = {
  title: string;
  description: string;
  imageUrl: string;
  tags: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
};

const projectValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  tags: z.string().min(1, 'At least one tag is required'),
  featured: z.boolean(),
  githubUrl: z.string()
    .transform(str => str.trim())
    .refine(str => str === '' || /^https?:\/\//.test(str), 'Must be a valid URL if provided'),
  liveUrl: z.string()
    .transform(str => str.trim())
    .refine(str => str === '' || /^https?:\/\//.test(str), 'Must be a valid URL if provided'),
});

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  initialData?: Partial<ProjectFormData>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialData }) => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectValidationSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      imageUrl: initialData?.imageUrl || '',
      tags: initialData?.tags ? initialData.tags.join(', ') : '',
      featured: initialData?.featured || false,
      githubUrl: initialData?.githubUrl || '',
      liveUrl: initialData?.liveUrl || '',
    },
  });

  const handleFormSubmit = async (data: ProjectFormInput) => {
    try {
      // Transform the form data to match ProjectFormData
      const transformedData: ProjectFormData = {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        featured: data.featured,
        githubUrl: data.githubUrl.trim() || null,
        liveUrl: data.liveUrl.trim() || null,
      };

      await onSubmit(transformedData);
      showToast('Project saved successfully!', 'success');
    } catch (error) {
      console.error('Form submission error:', error);
      showToast(
        error instanceof Error ? error.message : 'Failed to save project',
        'error'
      );
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <InputGroup>
        <Label>Title</Label>
        <FormInput
          {...register('title')}
          placeholder="Project Title"
          error={errors.title?.message}
        />
      </InputGroup>

      <InputGroup>
        <Label>Description</Label>
        <FormInput
          {...register('description')}
          placeholder="Project Description"
          error={errors.description?.message}
        />
      </InputGroup>

      <InputGroup>
        <Label>Image URL</Label>
        <FormInput
          {...register('imageUrl')}
          placeholder="Image URL"
          error={errors.imageUrl?.message}
        />
      </InputGroup>

      <InputGroup>
        <Label>Tags</Label>
        <FormInput
          {...register('tags')}
          placeholder="Tags (comma separated, e.g., React, TypeScript, Next.js)"
          error={errors.tags?.message}
        />
      </InputGroup>

      <CheckboxContainer>
        <input type="checkbox" {...register('featured')} id="featured" />
        <Label htmlFor="featured">Featured Project</Label>
      </CheckboxContainer>

      <InputGroup>
        <Label>GitHub URL (optional)</Label>
        <FormInput
          {...register('githubUrl')}
          placeholder="GitHub URL (leave empty if none)"
          error={errors.githubUrl?.message}
        />
      </InputGroup>

      <InputGroup>
        <Label>Live URL (optional)</Label>
        <FormInput
          {...register('liveUrl')}
          placeholder="Live URL (leave empty if none)"
          error={errors.liveUrl?.message}
        />
      </InputGroup>

      <StyledButton type="submit" disabled={isSubmitting} $variant="primary">
        {isSubmitting ? 'Saving...' : 'Save Project'}
      </StyledButton>
    </FormContainer>
  );
};

export default ProjectForm;