import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders a checkbox', () => {
    render(<Checkbox>Accept</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('supports controlled checked state', () => {
    render(<Checkbox checked onChange={() => {}}>Check</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox onChange={handleChange}>Check</Checkbox>);
    await user.click(screen.getByRole('checkbox'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies disabled state', () => {
    render(<Checkbox disabled>Check</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('applies readOnly state', () => {
    render(<Checkbox readOnly>Check</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-readonly', 'true');
  });

  it('supports indeterminate state', () => {
    render(<Checkbox indeterminate>Check</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
  });

  it('applies color data attribute', () => {
    render(<Checkbox color="gronsta">Check</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-color', 'gronsta');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref}>Check</Checkbox>);
    expect(ref).toHaveBeenCalled();
  });

  it('applies invalid state', () => {
    render(<Checkbox invalid>Check</Checkbox>);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
