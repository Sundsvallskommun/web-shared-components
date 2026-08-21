import { act, render, renderHook, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { notify } = vi.hoisted(() => ({ notify: vi.fn() }));

vi.mock('../../toasted-notes/src/index', () => ({
  Position: { 'bottom-left': 'bottom-left' },
  toaster: { notify },
}));

import { createToast } from './index';

const ToastMessage = ({ title, onClose }: { title?: string; onClose: () => void }) => (
  <button onClick={onClose}>{title}</button>
);
const useToast = createToast(ToastMessage);

describe('createToast public contract', () => {
  beforeEach(() => {
    notify.mockReturnValue('toast-id');
  });

  it('forwards defaults and renders the configured component', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useToast());

    act(() => result.current({ title: 'Saved' }));

    expect(notify).toHaveBeenCalledWith(expect.any(Function), {
      position: 'bottom-left',
      duration: 5000,
      messageRole: undefined,
    });

    const renderMessage = notify.mock.calls[0][0];
    render(renderMessage({ id: 'toast-id', onClose }));
    screen.getByRole('button', { name: 'Saved' }).click();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('passes custom render context and announcement options', () => {
    const renderMessage = vi.fn(() => <span>Custom toast</span>);
    const { result } = renderHook(() => useToast());

    act(() =>
      result.current({
        render: renderMessage,
        duration: null,
        position: 'top-right',
        messageRole: 'alert',
      })
    );

    expect(notify).toHaveBeenCalledWith(expect.any(Function), {
      position: 'top-right',
      duration: null,
      messageRole: 'alert',
    });
  });
});
