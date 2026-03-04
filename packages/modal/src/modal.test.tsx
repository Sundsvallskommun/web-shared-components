import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalComponent } from './modal/modal';
import { ModalContent } from './modal/modal-content';

describe('Modal', () => {
  it('does not render content when show is false', () => {
    render(
      <ModalComponent show={false} label="Test Modal">
        <ModalContent>Hidden content</ModalContent>
      </ModalComponent>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('renders content when show is true', () => {
    render(
      <ModalComponent show={true} label="Test Modal">
        <ModalContent>Visible content</ModalContent>
      </ModalComponent>
    );
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(
      <ModalComponent show={true} label="Test Modal Title">
        <ModalContent>Content</ModalContent>
      </ModalComponent>
    );
    expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <ModalComponent show={true} label="Modal" onClose={handleClose}>
        <ModalContent>Content</ModalContent>
      </ModalComponent>
    );

    const closeButton = document.querySelector('.sk-modal-dialog-close');
    if (closeButton) {
      await user.click(closeButton);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('hides close button when hideClosebutton is true', () => {
    render(
      <ModalComponent show={true} label="Modal" hideClosebutton>
        <ModalContent>Content</ModalContent>
      </ModalComponent>
    );
    expect(document.querySelector('.sk-modal-dialog-close')).not.toBeInTheDocument();
  });

  it('does not render label when hideLabel is true', () => {
    render(
      <ModalComponent show={true} label="Hidden Label" hideLabel>
        <ModalContent>Content</ModalContent>
      </ModalComponent>
    );
    expect(screen.queryByText('Hidden Label')).not.toBeInTheDocument();
  });

  it('renders children in ModalContent', () => {
    render(
      <ModalComponent show={true} label="Modal">
        <ModalContent>
          <p>Paragraph content</p>
        </ModalContent>
      </ModalComponent>
    );
    expect(screen.getByText('Paragraph content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <ModalComponent show={true} label="Modal" className="custom-modal">
        <ModalContent>Content</ModalContent>
      </ModalComponent>
    );
    expect(document.querySelector('.custom-modal')).toBeInTheDocument();
  });

  it('renders sk-modal class', () => {
    render(
      <ModalComponent show={true} label="Modal">
        <ModalContent>Content</ModalContent>
      </ModalComponent>
    );
    expect(document.querySelector('.sk-modal')).toBeInTheDocument();
  });

  it('applies aria-label when provided', () => {
    render(
      <ModalComponent show={true} label="Modal" aria-label="Custom aria label">
        <ModalContent>Content</ModalContent>
      </ModalComponent>
    );
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute('aria-label', 'Custom aria label');
  });
});
