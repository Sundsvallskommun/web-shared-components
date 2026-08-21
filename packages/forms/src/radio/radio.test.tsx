import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InternalRadioButton } from './radio';

describe('RadioButton', () => {
  it('renders a radio input', () => {
    render(<InternalRadioButton>Option</InternalRadioButton>);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(<InternalRadioButton>Option A</InternalRadioButton>);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('supports checked state', () => {
    render(<InternalRadioButton checked onChange={() => {}}>Option</InternalRadioButton>);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<InternalRadioButton onChange={handleChange}>Option</InternalRadioButton>);
    await user.click(screen.getByRole('radio'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies disabled state', () => {
    render(<InternalRadioButton disabled>Option</InternalRadioButton>);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('applies readOnly attribute', () => {
    render(<InternalRadioButton readOnly>Option</InternalRadioButton>);
    expect(screen.getByRole('radio')).toHaveAttribute('readOnly');
  });

  it('applies color data attribute', () => {
    render(<InternalRadioButton color="gronsta">Option</InternalRadioButton>);
    expect(screen.getByRole('radio')).toHaveAttribute('data-color', 'gronsta');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<InternalRadioButton ref={ref}>Option</InternalRadioButton>);
    expect(ref).toHaveBeenCalled();
  });
});
