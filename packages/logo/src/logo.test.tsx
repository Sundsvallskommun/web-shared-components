import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from './logo';

describe('Logo', () => {
  it('renders with logo variant by default', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('.sk-logo')).toBeInTheDocument();
  });

  it('renders title in service variant', () => {
    render(<Logo variant="service" title="My Service" />);
    expect(screen.getByText('My Service')).toBeInTheDocument();
  });

  it('renders subtitle in service variant', () => {
    render(<Logo variant="service" title="My Service" subtitle="Subtitle" />);
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('applies inverted data attribute', () => {
    const { container } = render(<Logo inverted />);
    expect(container.querySelector('.sk-logo')).toHaveAttribute('data-inverted', 'true');
  });

  it('applies symbol variant', () => {
    const { container } = render(<Logo variant="symbol" />);
    expect(container.querySelector('.sk-logo')).toHaveAttribute('data-variant', 'symbol');
  });

  it('applies service variant data attribute', () => {
    const { container } = render(<Logo variant="service" title="Service" />);
    expect(container.querySelector('.sk-logo')).toHaveAttribute('data-variant', 'service');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Logo ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
