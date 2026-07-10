import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SortMode, Table } from './index';

describe('Table public contract', () => {
  it('renders semantic headers, rows and an external footer', () => {
    render(
      <Table.Component>
        <Table.Header>
          <Table.HeaderColumn>Name</Table.HeaderColumn>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Column>Ada</Table.Column>
          </Table.Row>
        </Table.Body>
        <Table.Footer>1 result</Table.Footer>
      </Table.Component>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Ada' })).toBeInTheDocument();
    expect(screen.getByText('1 result').closest('table')).toBeNull();
  });

  it('forwards sort button interactions and state', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Table.SortButton isActive sortOrder={SortMode.ASC} onClick={onClick}>
        Sort by name
      </Table.SortButton>
    );

    await user.click(screen.getByRole('button', { name: 'Sort by name' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(document.querySelector('[data-sortmode]')).toHaveAttribute('data-sortmode', SortMode.ASC);
  });
});
