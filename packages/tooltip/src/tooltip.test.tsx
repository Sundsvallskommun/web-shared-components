import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    render(<Tooltip>Tooltip text</Tooltip>);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('has below position by default', () => {
    const { container } = render(<Tooltip>Text</Tooltip>);
    expect(container.querySelector('.sk-tooltip')).toHaveAttribute('data-position', 'below');
  });

  it('applies custom position', () => {
    const { container } = render(<Tooltip position="above">Text</Tooltip>);
    expect(container.querySelector('.sk-tooltip')).toHaveAttribute('data-position', 'above');
  });

  it('applies custom className', () => {
    const { container } = render(<Tooltip className="custom">Text</Tooltip>);
    expect(container.querySelector('.sk-tooltip')).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Tooltip ref={ref}>Text</Tooltip>);
    expect(ref).toHaveBeenCalled();
  });
});
