import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { DatePicker } from './date-picker';

describe('DatePicker', () => {
  it('renders a date input by default', () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
  });

  it('supports time type', () => {
    const { container } = render(<DatePicker type="time" />);
    expect(container.querySelector('input[type="time"]')).toBeInTheDocument();
  });

  it('supports datetime-local type', () => {
    const { container } = render(<DatePicker type="datetime-local" />);
    expect(container.querySelector('input[type="datetime-local"]')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<DatePicker ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
