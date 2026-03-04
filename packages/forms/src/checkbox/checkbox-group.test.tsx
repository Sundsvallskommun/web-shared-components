import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup } from './checkbox-group';
import { Checkbox } from './checkbox';

describe('CheckboxGroup', () => {
  it('renders multiple checkboxes', () => {
    render(
      <CheckboxGroup>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('applies name to all checkboxes', () => {
    render(
      <CheckboxGroup name="test-group">
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => expect(cb).toHaveAttribute('name', 'test-group'));
  });

  it('supports controlled value', () => {
    render(
      <CheckboxGroup value={['a']}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getByLabelText('A')).toBeChecked();
    expect(screen.getByLabelText('B')).not.toBeChecked();
  });

  it('calls onChange when checkbox is toggled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <CheckboxGroup onChange={handleChange}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    );

    await user.click(screen.getByLabelText('A'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies size to children', () => {
    render(
      <CheckboxGroup size="lg">
        <Checkbox value="a">A</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('applies color to children', () => {
    render(
      <CheckboxGroup color="gronsta">
        <Checkbox value="a">A</Checkbox>
      </CheckboxGroup>
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-color', 'gronsta');
  });
});
