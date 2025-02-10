import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/themeConfig';
import Modal from './index';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    const content = 'Modal Content';
    renderWithTheme(
      <Modal isOpen={true} onClose={() => {}}>
        {content}
      </Modal>
    );
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const content = 'Modal Content';
    renderWithTheme(
      <Modal isOpen={false} onClose={() => {}}>
        {content}
      </Modal>
    );
    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });

  it('calls onClose when clicking the overlay', async () => {
    const onClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>
    );

    const overlay = screen.getByRole('dialog').parentElement;
    if (overlay) {
      await userEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when pressing Escape key', () => {
    const onClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const testClass = 'custom-class';
    renderWithTheme(
      <Modal isOpen={true} onClose={() => {}} className={testClass}>
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass(testClass);
  });

  it('prevents event propagation when clicking modal content', async () => {
    const onClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={onClose}>
        <div>Content</div>
      </Modal>
    );

    const modalContent = screen.getByRole('dialog');
    await userEvent.click(modalContent);
    expect(onClose).not.toHaveBeenCalled();
  });
}); 