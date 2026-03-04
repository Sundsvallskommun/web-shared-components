import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlertComponent } from './alert';
import { AlertIcon } from './alert-icon';
import { AlertContentComponent } from './alert-content';
import { AlertContentTitle } from './alert-content-title';
import { AlertContentDescription } from './alert-content-description';

describe('Alert', () => {
  it('renders with info type by default', () => {
    const { container } = render(
      <AlertComponent>
        <AlertContentComponent>Message</AlertContentComponent>
      </AlertComponent>
    );
    expect(container.querySelector('.sk-alert-info')).toBeInTheDocument();
  });

  it('renders with success type', () => {
    const { container } = render(
      <AlertComponent type="success">
        <AlertContentComponent>Message</AlertContentComponent>
      </AlertComponent>
    );
    expect(container.querySelector('.sk-alert-success')).toBeInTheDocument();
  });

  it('renders with warning type', () => {
    const { container } = render(
      <AlertComponent type="warning">
        <AlertContentComponent>Message</AlertContentComponent>
      </AlertComponent>
    );
    expect(container.querySelector('.sk-alert-warning')).toBeInTheDocument();
  });

  it('renders with error type', () => {
    const { container } = render(
      <AlertComponent type="error">
        <AlertContentComponent>Message</AlertContentComponent>
      </AlertComponent>
    );
    expect(container.querySelector('.sk-alert-error')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <AlertComponent>
        <AlertContentComponent>Alert message</AlertContentComponent>
      </AlertComponent>
    );
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('renders AlertIcon', () => {
    const { container } = render(
      <AlertComponent>
        <AlertIcon />
        <AlertContentComponent>Message</AlertContentComponent>
      </AlertComponent>
    );
    expect(container.querySelector('.sk-alert-icon')).toBeInTheDocument();
  });

  it('renders AlertContentTitle and Description', () => {
    render(
      <AlertComponent>
        <AlertContentComponent>
          <AlertContentTitle>Title</AlertContentTitle>
          <AlertContentDescription>Description</AlertContentDescription>
        </AlertContentComponent>
      </AlertComponent>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('applies size class', () => {
    const { container } = render(
      <AlertComponent size="lg">
        <AlertContentComponent>Message</AlertContentComponent>
      </AlertComponent>
    );
    expect(container.querySelector('.sk-alert-lg')).toBeInTheDocument();
  });
});
