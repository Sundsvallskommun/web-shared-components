import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './icon';

describe('Icon', () => {
  it('renders with aria-hidden', () => {
    const { container } = render(<Icon icon={<svg data-testid="test-icon" />} />);
    expect(container.querySelector('.sk-icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the icon element', () => {
    const { container } = render(<Icon icon={<svg data-testid="test-icon" />} />);
    expect(container.querySelector('[data-testid="test-icon"]')).toBeInTheDocument();
  });

  it('applies color data attribute', () => {
    const { container } = render(<Icon icon={<svg />} color="success" />);
    expect(container.querySelector('.sk-icon')).toHaveAttribute('data-color', 'success');
  });

  it('applies variant data attribute', () => {
    const { container } = render(<Icon icon={<svg />} variant="ghost" />);
    expect(container.querySelector('.sk-icon')).toHaveAttribute('data-variant', 'ghost');
  });

  it('applies rounded data attribute', () => {
    const { container } = render(<Icon icon={<svg />} rounded />);
    expect(container.querySelector('.sk-icon')).toHaveAttribute('data-rounded', 'true');
  });

  it('applies inverted data attribute', () => {
    const { container } = render(<Icon icon={<svg />} inverted />);
    expect(container.querySelector('.sk-icon')).toHaveAttribute('data-inverted', 'true');
  });

  it('applies size as inline style', () => {
    const { container } = render(<Icon icon={<svg />} size="3rem" />);
    const icon = container.querySelector('.sk-icon');
    expect(icon).toHaveStyle({ width: '3rem', height: '3rem' });
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Icon ref={ref} icon={<svg />} />);
    expect(ref).toHaveBeenCalled();
  });
});
