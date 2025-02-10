/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import Modal from './Modal';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Modal', () => {
  const onCloseMock = jest.fn();
  const testContent = 'Test Modal Content';

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('renders when isOpen is true', () => {
    renderWithProviders(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderWithProviders(
      <Modal isOpen={false} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    expect(screen.queryByText(testContent)).not.toBeInTheDocument();
  });

  it('calls onClose when clicking outside the modal', () => {
    renderWithProviders(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the modal', () => {
    renderWithProviders(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    fireEvent.click(screen.getByText(testContent));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('calls onClose when clicking the close button', () => {
    renderWithProviders(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when pressing Escape key', () => {
    renderWithProviders(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const testClass = 'custom-class';
    renderWithProviders(
      <Modal isOpen={true} onClose={onCloseMock} className={testClass}>
        {testContent}
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass(testClass);
  });

  it('prevents event propagation when clicking modal content', async () => {
    renderWithProviders(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </Modal>
    );

    const modalContent = screen.getByRole('dialog');
    await userEvent.click(modalContent);
    expect(onCloseMock).not.toHaveBeenCalled();
  });
}); 