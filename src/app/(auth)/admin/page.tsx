'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ErrorMessage,
  SuccessMessage,
  Button,
  ProjectList,
  ProjectItem,
  ProjectTitle,
  ProjectActions,
  ActionButton,
} from '@/styles/AdminStyles';

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url('Invalid image URL'),
  demoUrl: z.string().url('Invalid demo URL').optional(),
  githubUrl: z.string().url('Invalid GitHub URL'),
  tags: z.string().min(2, 'Tags must be at least 2 characters'),
  featured: z.boolean().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;
type Project = ProjectFormData & { 
  id: string;
  tags: string[];
};

export default function Admin() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      const endpoint = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(',').map(tag => tag.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      setSubmitSuccess(true);
      reset();
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      setSubmitError(t('admin.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    Object.keys(project).forEach((key) => {
      if (key === 'tags') {
        setValue(key, project[key].join(', '));
      } else {
        setValue(key as keyof ProjectFormData, project[key as keyof Project]);
      }
    });
  };

  const handleDelete = async (projectId: string) => {
    if (!window.confirm(t('admin.deleteConfirm'))) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Container>
      <Title>{editingProject ? t('admin.editProject') : t('admin.addProject')}</Title>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="title">{t('admin.form.title')}</Label>
          <Input
            id="title"
            type="text"
            {...register('title')}
            error={!!errors.title}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">{t('admin.form.description')}</Label>
          <TextArea
            id="description"
            {...register('description')}
            error={!!errors.description}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="imageUrl">{t('admin.form.imageUrl')}</Label>
          <Input
            id="imageUrl"
            type="url"
            {...register('imageUrl')}
            error={!!errors.imageUrl}
          />
          {errors.imageUrl && <ErrorMessage>{errors.imageUrl.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="demoUrl">{t('admin.form.demoUrl')}</Label>
          <Input
            id="demoUrl"
            type="url"
            {...register('demoUrl')}
            error={!!errors.demoUrl}
          />
          {errors.demoUrl && <ErrorMessage>{errors.demoUrl.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="githubUrl">{t('admin.form.githubUrl')}</Label>
          <Input
            id="githubUrl"
            type="url"
            {...register('githubUrl')}
            error={!!errors.githubUrl}
          />
          {errors.githubUrl && <ErrorMessage>{errors.githubUrl.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="tags">{t('admin.form.tags')}</Label>
          <Input
            id="tags"
            type="text"
            {...register('tags')}
            error={!!errors.tags}
          />
          {errors.tags && <ErrorMessage>{errors.tags.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>
            <Input
              type="checkbox"
              {...register('featured')}
            />
            {t('admin.form.featured')}
          </Label>
        </FormGroup>

        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
        {submitSuccess && <SuccessMessage>{t('admin.form.success')}</SuccessMessage>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? t('admin.form.saving')
            : editingProject
              ? t('admin.form.update')
              : t('admin.form.create')}
        </Button>
      </Form>

      <ProjectList>
        {projects.map((project) => (
          <ProjectItem key={project.id}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectActions>
              <ActionButton onClick={() => handleEdit(project)}>
                {t('admin.actions.edit')}
              </ActionButton>
              <ActionButton onClick={() => handleDelete(project.id)}>
                {t('admin.actions.delete')}
              </ActionButton>
            </ProjectActions>
          </ProjectItem>
        ))}
      </ProjectList>
    </Container>
  );
} 