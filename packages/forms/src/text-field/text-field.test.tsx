import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextField } from './text-field';

describe('TextField', () => {
  it('renders a text input by default', () => {
    render(<TextField />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('supports email type', () => {
    render(<TextField type="email" />);
    expect(document.querySelector('input[type="email"]')).toBeInTheDocument();
  });

  it('supports password type', () => {
    render(<TextField type="password" />);
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<TextField ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
