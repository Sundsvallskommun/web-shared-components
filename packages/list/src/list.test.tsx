import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { List as InternalList, ListItem, ListHeader, ListText } from './list';

describe('List', () => {
  it('renders a ul element', () => {
    const { container } = render(<InternalList><ListItem>Item</ListItem></InternalList>);
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('applies default stroke style', () => {
    const { container } = render(<InternalList><ListItem>Item</ListItem></InternalList>);
    expect(container.querySelector('.sk-list')).toHaveAttribute('data-style', 'stroke');
  });

  it('applies bullet style', () => {
    const { container } = render(<InternalList listStyle="bullet"><ListItem>Item</ListItem></InternalList>);
    expect(container.querySelector('.sk-list')).toHaveAttribute('data-style', 'bullet');
  });

  it('applies numbered style', () => {
    const { container } = render(<InternalList listStyle="numbered"><ListItem>Item</ListItem></InternalList>);
    expect(container.querySelector('.sk-list')).toHaveAttribute('data-style', 'numbered');
  });

  it('renders ListItem children', () => {
    render(
      <InternalList>
        <ListItem>First</ListItem>
        <ListItem>Second</ListItem>
      </InternalList>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders ListHeader', () => {
    render(
      <InternalList>
        <ListItem>
          <ListHeader>Header</ListHeader>
        </ListItem>
      </InternalList>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(document.querySelector('.sk-list-header')).toBeInTheDocument();
  });

  it('renders ListText', () => {
    render(
      <InternalList>
        <ListItem>
          <ListText>Description</ListText>
        </ListItem>
      </InternalList>
    );
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(document.querySelector('.sk-list-text')).toBeInTheDocument();
  });

  it('forwards ref on List', () => {
    const ref = vi.fn();
    render(<InternalList ref={ref}><ListItem>Item</ListItem></InternalList>);
    expect(ref).toHaveBeenCalled();
  });
});
