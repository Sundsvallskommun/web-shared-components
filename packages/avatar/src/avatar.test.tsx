import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders initials by default', () => {
    render(<Avatar />);
    expect(screen.getByText('NN')).toBeInTheDocument();
  });

  it('renders custom initials', () => {
    render(<Avatar initials="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders image when imageUrl is provided', () => {
    render(<Avatar imageUrl="https://example.com/avatar.jpg" imageAlt="User avatar" />);
    const img = screen.getByAlt ? screen.getByRole('img') : document.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('applies size class', () => {
    const { container } = render(<Avatar size="lg" />);
    expect(container.querySelector('.sk-avatar-lg')).toBeInTheDocument();
  });

  it('applies color data attribute', () => {
    const { container } = render(<Avatar color="vattjom" />);
    expect(container.querySelector('.sk-avatar')).toHaveAttribute('data-color', 'vattjom');
  });

  it('applies rounded data attribute', () => {
    const { container } = render(<Avatar rounded />);
    expect(container.querySelector('.sk-avatar')).toHaveAttribute('data-rounded', 'true');
  });

  it('applies accent data attribute', () => {
    const { container } = render(<Avatar accent />);
    expect(container.querySelector('.sk-avatar')).toHaveAttribute('data-accent', 'true');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
