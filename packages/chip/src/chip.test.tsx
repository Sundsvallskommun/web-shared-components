import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './chip';

describe('Chip', () => {
  it('renders as a button element', () => {
    render(<Chip>Tag</Chip>);
    expect(screen.getByRole('button', { name: /Tag/ })).toBeInTheDocument();
  });

  it('applies strong data attribute', () => {
    render(<Chip strong>Tag</Chip>);
    expect(screen.getByRole('button')).toHaveAttribute('data-strong', 'true');
  });

  it('applies inverted data attribute', () => {
    render(<Chip inverted>Tag</Chip>);
    expect(screen.getByRole('button')).toHaveAttribute('data-inverted', 'true');
  });

  it('applies rounded data attribute', () => {
    render(<Chip rounded>Tag</Chip>);
    expect(screen.getByRole('button')).toHaveAttribute('data-rounded', 'true');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Chip onClick={handleClick}>Tag</Chip>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Chip ref={ref}>Tag</Chip>);
    expect(ref).toHaveBeenCalled();
  });
});
