import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProjectListItem, ProjectFormData } from '@/types/project';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';

// Validation schema
const projectValidationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Invalid image URL'),
  githubUrl: z.string().url('Invalid GitHub URL').or(z.string().length(0)).nullable(),
  liveUrl: z.string().url('Invalid live URL').or(z.string().length(0)).nullable(),
  tags: z.array(z.string()),
  featured: z.boolean(),
}).transform((data) => ({
  ...data,
  githubUrl: data.githubUrl || null,
  liveUrl: data.liveUrl || null,
}));

interface ProjectFormProps {
  initialData?: ProjectListItem;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TagInput = styled(Input)`
  margin-bottom: 0.5rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: pointer;
    padding: 0;
    font-size: 1.25em;
    line-height: 0.8;

    &:hover {
      color: ${({ theme }) => theme.colors.error.main};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 1rem;
    height: 1rem;
  }

  label {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
`;

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.input<typeof projectValidationSchema>>({
    resolver: zodResolver(projectValidationSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      imageUrl: '',
      githubUrl: '',
      liveUrl: '',
      tags: [],
      featured: false,
    },
  });

  const tags = watch('tags');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setValue('tags', [...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await onSubmit(projectValidationSchema.parse(data));
    } catch (error) {
      console.error('Error submitting project:', error);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Form onSubmit={onFormSubmit}>
      <Input
        label="Title"
        error={errors.title?.message}
        {...register('title')}
      />

      <TextArea
        label="Description"
        error={errors.description?.message}
        {...register('description')}
      />

      <Input
        label="Image URL"
        error={errors.imageUrl?.message}
        {...register('imageUrl')}
      />

      <Input
        label="GitHub URL (optional)"
        error={errors.githubUrl?.message}
        {...register('githubUrl')}
      />

      <Input
        label="Live URL (optional)"
        error={errors.liveUrl?.message}
        {...register('liveUrl')}
      />

      <div>
        <TagInput
          label="Tags"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type and press Enter to add tags"
        />
        <TagList>
          {tags.map((tag) => (
            <Tag key={tag}>
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                aria-label={`Remove ${tag} tag`}
              >
                ×
              </button>
            </Tag>
          ))}
        </TagList>
      </div>

      <Checkbox>
        <input type="checkbox" {...register('featured')} id="featured" />
        <label htmlFor="featured">Featured Project</label>
      </Checkbox>

      <ButtonGroup>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {initialData ? 'Update' : 'Create'} Project
        </Button>
      </ButtonGroup>
    </Form>
  );
}