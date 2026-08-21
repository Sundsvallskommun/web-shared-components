import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './index';

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders multiple paragraphs without React key warnings', () => {
    render(<Text>{'First paragraph\n\nSecond paragraph'}</Text>);

    expect(screen.getAllByRole('paragraph')).toHaveLength(2);
  });

  it('applies custom className', () => {
    const { container } = render(<Text className="custom">Text</Text>);
    expect(container.querySelector('.text-content')).toHaveClass('custom');
  });

  it('converts URLs to links when urlAsLink is true', () => {
    render(<Text urlAsLink>Visit https://example.com today</Text>);
    const link = screen.getByText('https://example.com');
    expect(link.closest('a')).toHaveAttribute('href', 'https://example.com');
  });

  it('does not convert URLs when urlAsLink is false', () => {
    render(<Text urlAsLink={false}>Visit https://example.com today</Text>);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders with custom element via as prop', () => {
    const { container } = render(<Text as="section">Content</Text>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Text ref={ref}>Text</Text>);
    expect(ref).toHaveBeenCalled();
  });
});
