import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormControl } from './form-control';

describe('FormControl', () => {
  it('renders a div by default', () => {
    const { container } = render(<FormControl>Content</FormControl>);
    expect(container.querySelector('.sk-form-control')).toBeInTheDocument();
  });

  it('renders as fieldset when fieldset prop is true', () => {
    const { container } = render(<FormControl fieldset>Content</FormControl>);
    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });

  it('applies disabled to children via context', () => {
    render(
      <FormControl disabled>
        <input data-testid="input" />
      </FormControl>
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('generates unique IDs', () => {
    const { container } = render(<FormControl id="test-id">Content</FormControl>);
    expect(container.querySelector('.sk-form-control')).toBeInTheDocument();
  });

  it('applies invalid state', () => {
    const { container } = render(<FormControl invalid fieldset>Content</FormControl>);
    const fieldset = container.querySelector('fieldset');
    expect(fieldset).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies required attribute on fieldset', () => {
    const { container } = render(<FormControl required fieldset>Content</FormControl>);
    const fieldset = container.querySelector('fieldset');
    expect(fieldset).toHaveAttribute('required');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<FormControl ref={ref}>Content</FormControl>);
    expect(ref).toHaveBeenCalled();
  });
});
