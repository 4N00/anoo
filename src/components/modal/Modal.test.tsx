/// <reference types="@types/jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@/test-utils/test-utils';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;
declare const beforeEach: any;

describe('Modal', () => {
  const onCloseMock = jest.fn();
  const testContent = 'Test Modal Content';

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    expect(screen.queryByText(testContent)).not.toBeInTheDocument();
  });

  it('calls onClose when clicking outside the modal', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the modal', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    fireEvent.click(screen.getByText(testContent));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('calls onClose when clicking the close button', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when pressing Escape key', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        {testContent}
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const testClass = 'custom-class';
    render(
      <Modal isOpen={true} onClose={onCloseMock} className={testClass}>
        {testContent}
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass(testClass);
  });

  it('prevents event propagation when clicking modal content', async () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Content</div>
      </Modal>
    );

    const modalContent = screen.getByRole('dialog');
    await userEvent.click(modalContent);
    expect(onCloseMock).not.toHaveBeenCalled();
  });
}); 