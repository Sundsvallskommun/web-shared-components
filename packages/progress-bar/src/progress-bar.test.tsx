import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ProgressBar } from './progress-bar';

describe('ProgressBar', () => {
  it('renders with progress bar class', () => {
    const { container } = render(<ProgressBar />);
    expect(container.querySelector('[data-color]')).toBeInTheDocument();
  });

  it('applies fill width based on current/steps', () => {
    const { container } = render(<ProgressBar steps={100} current={50} />);
    const fill = container.querySelector('.sk-progress-bar-fill');
    expect(fill).toHaveStyle({ width: '50%' });
  });

  it('applies color data attribute', () => {
    const { container } = render(<ProgressBar color="vattjom" />);
    expect(container.firstChild).toHaveAttribute('data-color', 'vattjom');
  });

  it('applies accent data attribute', () => {
    const { container } = render(<ProgressBar accent />);
    expect(container.firstChild).toHaveAttribute('data-accent', 'true');
  });

  it('handles zero current', () => {
    const { container } = render(<ProgressBar steps={100} current={0} />);
    const fill = container.querySelector('.sk-progress-bar-fill');
    expect(fill).toHaveStyle({ width: '0%' });
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<ProgressBar ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
