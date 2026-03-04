import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  it('renders a footer element', () => {
    const { container } = render(<Footer>Footer content</Footer>);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('applies sk-footer class', () => {
    const { container } = render(<Footer>Content</Footer>);
    expect(container.querySelector('.sk-footer')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Footer>Footer text</Footer>);
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Footer ref={ref}>Content</Footer>);
    expect(ref).toHaveBeenCalled();
  });
});
