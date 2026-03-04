import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioButtonGroup } from './radio-group';
import { InternalRadioButton } from './radio';

describe('RadioGroup', () => {
  it('renders multiple radios', () => {
    render(
      <RadioButtonGroup>
        <InternalRadioButton value="a">A</InternalRadioButton>
        <InternalRadioButton value="b">B</InternalRadioButton>
      </RadioButtonGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('applies name to all radios', () => {
    render(
      <RadioButtonGroup name="test-group">
        <InternalRadioButton value="a">A</InternalRadioButton>
        <InternalRadioButton value="b">B</InternalRadioButton>
      </RadioButtonGroup>
    );
    const radios = screen.getAllByRole('radio');
    radios.forEach((r) => expect(r).toHaveAttribute('name', 'test-group'));
  });

  it('only one radio is selected at a time', () => {
    render(
      <RadioButtonGroup value="a">
        <InternalRadioButton value="a">A</InternalRadioButton>
        <InternalRadioButton value="b">B</InternalRadioButton>
      </RadioButtonGroup>
    );
    expect(screen.getByLabelText('A')).toBeChecked();
    expect(screen.getByLabelText('B')).not.toBeChecked();
  });

  it('supports controlled value changes', () => {
    const { rerender } = render(
      <RadioButtonGroup value="a">
        <InternalRadioButton value="a">A</InternalRadioButton>
        <InternalRadioButton value="b">B</InternalRadioButton>
      </RadioButtonGroup>
    );

    expect(screen.getByLabelText('A')).toBeChecked();

    rerender(
      <RadioButtonGroup value="b">
        <InternalRadioButton value="a">A</InternalRadioButton>
        <InternalRadioButton value="b">B</InternalRadioButton>
      </RadioButtonGroup>
    );

    expect(screen.getByLabelText('B')).toBeChecked();
  });

  it('has radiogroup role', () => {
    render(
      <RadioButtonGroup>
        <InternalRadioButton value="a">A</InternalRadioButton>
      </RadioButtonGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('applies size to children', () => {
    render(
      <RadioButtonGroup size="lg">
        <InternalRadioButton value="a">A</InternalRadioButton>
      </RadioButtonGroup>
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
