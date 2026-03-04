import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './label';

describe('Label', () => {
  it('renders children', () => {
    render(<Label>Label text</Label>);
    expect(screen.getByText('Label text')).toBeInTheDocument();
  });

  it('applies default color', () => {
    const { container } = render(<Label>Text</Label>);
    expect(container.querySelector('.sk-label')).toHaveAttribute('data-color', 'tertiary');
  });

  it('applies custom color', () => {
    const { container } = render(<Label color="warning">Text</Label>);
    expect(container.querySelector('.sk-label')).toHaveAttribute('data-color', 'warning');
  });

  it('applies rounded data attribute', () => {
    const { container } = render(<Label rounded>Text</Label>);
    expect(container.querySelector('.sk-label')).toHaveAttribute('data-rounded', 'true');
  });

  it('applies inverted data attribute', () => {
    const { container } = render(<Label inverted>Text</Label>);
    expect(container.querySelector('.sk-label')).toHaveAttribute('data-inverted', 'true');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Label ref={ref}>Text</Label>);
    expect(ref).toHaveBeenCalled();
  });
});
