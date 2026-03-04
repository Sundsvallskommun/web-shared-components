import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FilterRoot } from './filter';
import { FilterLabel } from './filter-label';
import { FilterItem } from './filter-item';

describe('Filter', () => {
  it('renders a fieldset element', () => {
    const { container } = render(
      <FilterRoot>
        <FilterLabel>Filter</FilterLabel>
        <FilterItem>Option 1</FilterItem>
      </FilterRoot>
    );
    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });

  it('renders FilterLabel as legend', () => {
    const { container } = render(
      <FilterRoot>
        <FilterLabel>Filter Label</FilterLabel>
        <FilterItem>Option</FilterItem>
      </FilterRoot>
    );
    expect(container.querySelector('legend')).toBeInTheDocument();
    expect(screen.getByText('Filter Label')).toBeInTheDocument();
  });

  it('renders FilterItem', () => {
    render(
      <FilterRoot>
        <FilterLabel>Filter</FilterLabel>
        <FilterItem>Option 1</FilterItem>
      </FilterRoot>
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('applies sk-filter class', () => {
    const { container } = render(
      <FilterRoot>
        <FilterLabel>Filter</FilterLabel>
        <FilterItem>Option</FilterItem>
      </FilterRoot>
    );
    expect(container.querySelector('.sk-filter')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(
      <FilterRoot ref={ref}>
        <FilterLabel>Filter</FilterLabel>
        <FilterItem>Option</FilterItem>
      </FilterRoot>
    );
    expect(ref).toHaveBeenCalled();
  });
});
