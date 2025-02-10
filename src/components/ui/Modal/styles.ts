import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`; 