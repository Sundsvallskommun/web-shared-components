import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { LucideIcon } from './lucide-icon';

describe('LucideIcon', () => {
  it('renders with sk-lucide-icon class', () => {
    const { container } = render(<LucideIcon name="home" />);
    expect(container.querySelector('.sk-lucide-icon')).toBeInTheDocument();
  });

  it('applies data-testid based on name', () => {
    const { container } = render(<LucideIcon name="home" />);
    expect(container.querySelector('[data-testid="sk-icon-home"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<LucideIcon name="home" className="custom" />);
    expect(container.querySelector('.sk-lucide-icon')).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<LucideIcon ref={ref} name="home" />);
    expect(ref).toHaveBeenCalled();
  });
});
