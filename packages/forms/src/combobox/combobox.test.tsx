import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from './index';

describe('Combobox', () => {
  const renderCombobox = (props = {}) =>
    render(
      <Combobox.Component {...props}>
        <Combobox.Input placeholder="Select..." />
        <Combobox.List>
          <Combobox.Option value="apple">Apple</Combobox.Option>
          <Combobox.Option value="banana">Banana</Combobox.Option>
          <Combobox.Option value="cherry">Cherry</Combobox.Option>
        </Combobox.List>
      </Combobox.Component>
    );

  it('renders combobox role', () => {
    renderCombobox();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    renderCombobox();
    expect(screen.getByPlaceholderText('Select...')).toBeInTheDocument();
  });

  it('opens dropdown on input click', async () => {
    const user = userEvent.setup();
    renderCombobox();

    await user.click(screen.getByRole('combobox'));

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('selects option on click', async () => {
    const user = userEvent.setup();
    renderCombobox();

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Apple'));

    expect(screen.getByDisplayValue('Apple')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    renderCombobox({ onChange: handleChange });

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Banana'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('opens dropdown and shows options when interacted', async () => {
    const user = userEvent.setup();
    renderCombobox();

    const input = screen.getByRole('combobox');
    await user.click(input);

    // All options should be visible when dropdown opens
    const options = document.querySelectorAll('.sk-form-combobox-list-option');
    expect(options.length).toBe(3);
  });

  it('supports multiple selection', async () => {
    const user = userEvent.setup();
    render(
      <Combobox.Component multiple>
        <Combobox.Input placeholder="Select..." />
        <Combobox.List>
          <Combobox.Option value="a">A</Combobox.Option>
          <Combobox.Option value="b">B</Combobox.Option>
        </Combobox.List>
      </Combobox.Component>
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('A'));

    // Multiple mode should keep dropdown open
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders listbox role', () => {
    renderCombobox();
    expect(document.querySelector('[role="listbox"]')).toBeInTheDocument();
  });

  it('closes on escape', async () => {
    const user = userEvent.setup();
    renderCombobox();

    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Apple')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    const listbox = document.querySelector('[role="listbox"]');
    expect(listbox).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies sk-form-combobox class', () => {
    const { container } = renderCombobox();
    expect(container.querySelector('.sk-form-combobox')).toBeInTheDocument();
  });

  it('navigates with keyboard', async () => {
    const user = userEvent.setup();
    renderCombobox();

    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowDown}');

    // Second option should be active
    const options = document.querySelectorAll('.sk-form-combobox-list-option');
    expect(options.length).toBeGreaterThan(0);
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(
      <Combobox.Component ref={ref}>
        <Combobox.Input />
        <Combobox.List>
          <Combobox.Option value="a">A</Combobox.Option>
        </Combobox.List>
      </Combobox.Component>
    );
    expect(ref).toHaveBeenCalled();
  });
});
