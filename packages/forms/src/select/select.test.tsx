import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './index';

describe('Select', () => {
  it('renders a select element', () => {
    render(
      <Select.Component>
        <Select.Option value="a">Option A</Select.Option>
      </Select.Component>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders options', () => {
    render(
      <Select.Component>
        <Select.Option value="a">Option A</Select.Option>
        <Select.Option value="b">Option B</Select.Option>
      </Select.Component>
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('calls onSelectValue on change', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <Select.Component onSelectValue={handleSelect}>
        <Select.Option value="a">Option A</Select.Option>
        <Select.Option value="b">Option B</Select.Option>
      </Select.Component>
    );

    await user.selectOptions(screen.getByRole('combobox'), 'b');
    expect(handleSelect).toHaveBeenCalledWith('b');
  });

  it('applies disabled state', () => {
    render(
      <Select.Component disabled>
        <Select.Option value="a">Option A</Select.Option>
      </Select.Component>
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('applies invalid state', () => {
    render(
      <Select.Component invalid>
        <Select.Option value="a">Option A</Select.Option>
      </Select.Component>
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(
      <Select.Component ref={ref}>
        <Select.Option value="a">Option A</Select.Option>
      </Select.Component>
    );
    expect(ref).toHaveBeenCalled();
  });

  it('renders with value', () => {
    render(
      <Select.Component value="b" onChange={() => {}}>
        <Select.Option value="a">Option A</Select.Option>
        <Select.Option value="b">Option B</Select.Option>
      </Select.Component>
    );
    expect(screen.getByRole('combobox')).toHaveValue('b');
  });
});
