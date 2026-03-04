import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Divider } from './divider';

describe('Divider', () => {
  it('renders an hr element', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('has horizontal orientation by default', () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector('hr');
    expect(hr).toHaveAttribute('aria-orientation', 'horizontal');
    expect(hr).toHaveClass('sk-divider-horizontal');
  });

  it('supports vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const hr = container.querySelector('hr');
    expect(hr).toHaveAttribute('aria-orientation', 'vertical');
    expect(hr).toHaveClass('sk-divider-vertical');
  });

  it('applies strong data attribute', () => {
    const { container } = render(<Divider strong />);
    expect(container.querySelector('hr')).toHaveAttribute('data-strong', 'true');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Divider ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
