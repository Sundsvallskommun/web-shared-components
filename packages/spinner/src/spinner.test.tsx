import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('renders with sk-spinner class', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.sk-spinner')).toBeInTheDocument();
  });

  it('applies size as inline style', () => {
    const { container } = render(<Spinner size={6} />);
    const spinner = container.querySelector('.sk-spinner');
    expect(spinner).toHaveStyle({ width: '6rem', height: '6rem' });
  });

  it('applies color data attribute', () => {
    const { container } = render(<Spinner color="vattjom" />);
    expect(container.querySelector('.sk-spinner')).toHaveAttribute('data-color', 'vattjom');
  });

  it('contains an SVG element', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Spinner ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
