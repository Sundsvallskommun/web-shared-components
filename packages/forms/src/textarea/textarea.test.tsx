import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onChange on input', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Textarea onChange={handleChange} />);
    await user.type(screen.getByRole('textbox'), 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows character count when showCount is true', () => {
    const { container } = render(<Textarea showCount maxLength={100} />);
    expect(container.querySelector('.sk-form-textarea-counter')).toBeInTheDocument();
  });

  it('shows warning when maxLength is exceeded', async () => {
    const user = userEvent.setup();
    render(<Textarea maxLength={5} maxLengthWarningText="Too many characters" />);

    await user.type(screen.getByRole('textbox'), '123456');

    expect(screen.getByText('Too many characters')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies readOnly state', () => {
    render(<Textarea readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-readonly', 'true');
  });

  it('applies invalid state', () => {
    render(<Textarea invalid />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
