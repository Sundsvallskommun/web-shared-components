import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('renders a text input by default', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies readOnly state', () => {
    render(<Input readOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-readonly', 'true');
  });

  it('applies invalid state', () => {
    render(<Input invalid />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onChange on input', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} />);
    await user.type(screen.getByRole('textbox'), 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('hides extra appearances by default', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('[data-hideextra]')).toBeInTheDocument();
  });
});
