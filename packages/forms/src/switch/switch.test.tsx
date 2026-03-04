import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './switchcomponent';

describe('Switch', () => {
  it('renders a checkbox input for toggle', () => {
    render(<Switch>Toggle</Switch>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(<Switch>Toggle me</Switch>);
    expect(screen.getByText('Toggle me')).toBeInTheDocument();
  });

  it('supports checked state', () => {
    render(<Switch checked onChange={() => {}}>Toggle</Switch>);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('supports unchecked state', () => {
    render(<Switch checked={false} onChange={() => {}}>Toggle</Switch>);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Switch onChange={handleChange}>Toggle</Switch>);
    await user.click(screen.getByRole('checkbox'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('applies disabled state', () => {
    render(<Switch disabled>Toggle</Switch>);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('applies color data attribute', () => {
    const { container } = render(<Switch color="gronsta">Toggle</Switch>);
    expect(container.querySelector('[data-color="gronsta"]')).toBeInTheDocument();
  });
});
