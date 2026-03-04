import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Callout } from './callout';

describe('Callout', () => {
  it('renders with sk-callout class', () => {
    const { container } = render(<Callout>Content</Callout>);
    expect(container.querySelector('.sk-callout')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Callout className="custom">Content</Callout>);
    expect(container.querySelector('.sk-callout')).toHaveClass('custom');
  });

  it('applies color data attribute', () => {
    const { container } = render(<Callout color="warning">Content</Callout>);
    expect(container.querySelector('.sk-callout')).toHaveAttribute('data-color', 'warning');
  });

  it('applies inverted data attribute', () => {
    const { container } = render(<Callout inverted>Content</Callout>);
    expect(container.querySelector('.sk-callout')).toHaveAttribute('data-inverted', 'true');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Callout ref={ref}>Content</Callout>);
    expect(ref).toHaveBeenCalled();
  });
});
