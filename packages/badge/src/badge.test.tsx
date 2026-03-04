import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders with counter text', () => {
    render(<Badge counter="5" />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders with numeric counter', () => {
    render(<Badge counter={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies color data attribute', () => {
    const { container } = render(<Badge counter="1" color="warning" />);
    expect(container.querySelector('.sk-badge')).toHaveAttribute('data-color', 'warning');
  });

  it('applies rounded data attribute', () => {
    const { container } = render(<Badge counter="1" rounded />);
    expect(container.querySelector('.sk-badge')).toHaveAttribute('data-rounded', 'true');
  });

  it('applies inverted data attribute', () => {
    const { container } = render(<Badge counter="1" inverted />);
    expect(container.querySelector('.sk-badge')).toHaveAttribute('data-inverted', 'true');
  });

  it('applies size data attribute', () => {
    const { container } = render(<Badge counter="1" size="sm" />);
    expect(container.querySelector('.sk-badge')).toHaveAttribute('data-size', 'sm');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Badge ref={ref} counter="1" />);
    expect(ref).toHaveBeenCalled();
  });
});
