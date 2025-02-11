import { styled } from 'styled-components';

// ProjectList styles
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:before {
    content: '•';
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ProjectsContainer = styled.div<{ $isDraggingOver?: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ $isDraggingOver, theme }) =>
    $isDraggingOver ? theme.colors.background.secondary : 'transparent'};
  transition: background-color 0.2s ease;
`;

export const ProjectItem = styled.div<{ $isDragging?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
  background: ${({ $isDragging, theme }) =>
    $isDragging ? theme.colors.background.secondary : theme.colors.background.primary};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const StatusBadge = styled.span<{ $status: 'active' | 'completed' }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: ${({ $status, theme }) =>
    $status === 'active' ? theme.colors.warning.light : theme.colors.success.light};
  color: ${({ $status, theme }) =>
    $status === 'active' ? theme.colors.warning.dark : theme.colors.success.dark};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// ProjectForm styles
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  min-width: 50vw;
`;

export const FormHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}20;
`;

export const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.xl};
`; 