import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from './link';

describe('Link', () => {
  it('renders an anchor element', () => {
    render(<Link href="/test">Click me</Link>);
    expect(screen.getByRole('link', { name: 'Click me' })).toBeInTheDocument();
  });

  it('sets href attribute', () => {
    render(<Link href="/test">Link</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('applies disabled state', () => {
    render(<Link href="/test" disabled>Link</Link>);
    const link = screen.getByText('Link').closest('a');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabIndex', '-1');
  });

  it('opens external links in new tab', () => {
    render(<Link href="https://example.com" external>External</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('hides external icon when hideExternalIcon is true', () => {
    const { container } = render(
      <Link href="https://example.com" external hideExternalIcon>External</Link>
    );
    expect(container.querySelector('.sk-link-external-icon')).not.toBeInTheDocument();
  });

  it('shows external icon by default for external links', () => {
    const { container } = render(
      <Link href="https://example.com" external>External</Link>
    );
    expect(container.querySelector('.sk-link-external-icon')).toBeInTheDocument();
  });

  it('applies variant', () => {
    const { container } = render(<Link href="#" variant="tertiary">Link</Link>);
    expect(container.querySelector('.sk-link')).toBeInTheDocument();
  });

  it('applies inverted data attribute', () => {
    const { container } = render(<Link href="#" inverted>Link</Link>);
    expect(container.querySelector('a')).toHaveAttribute('data-inverted', 'true');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Link href="#" ref={ref}>Link</Link>);
    expect(ref).toHaveBeenCalled();
  });
});
