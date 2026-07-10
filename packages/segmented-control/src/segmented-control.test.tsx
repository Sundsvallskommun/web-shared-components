import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SegmentedControl } from './index';

const renderControl = (props: React.ComponentProps<typeof SegmentedControl.Component> = {}) =>
  render(
    <SegmentedControl.Component {...props}>
      <SegmentedControl.Item>
        <button>First</button>
      </SegmentedControl.Item>
      <SegmentedControl.Item>
        <button>Second</button>
      </SegmentedControl.Item>
      <SegmentedControl.Item>
        <button>Third</button>
      </SegmentedControl.Item>
    </SegmentedControl.Component>
  );

describe('SegmentedControl public contract', () => {
  it('selects one item and reports its index', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderControl({ onChange });

    await user.click(screen.getByRole('button', { name: 'Second' }));

    expect(onChange).toHaveBeenCalledWith([1]);
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps controlled selection until the parent updates it', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderControl({ value: [0], onChange });

    await user.click(screen.getByRole('button', { name: 'Second' }));

    expect(onChange).toHaveBeenCalledWith([1]);
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('supports multiple selected items', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderControl({ defaultValue: [0], multiSelect: true, onChange });

    await user.click(screen.getByRole('button', { name: 'Second' }));

    expect(onChange).toHaveBeenCalledWith([0, 1]);
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('moves focus and selects with the keyboard', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderControl({ onChange });
    const first = screen.getByRole('button', { name: 'First' });

    first.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith([1]);
  });

  it('does not change disabled controls', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderControl({ disabled: true, onChange });
    const first = screen.getByRole('button', { name: 'First' });

    await user.click(first);

    expect(first).toHaveAttribute('aria-disabled', 'true');
    expect(onChange).not.toHaveBeenCalled();
  });
});
