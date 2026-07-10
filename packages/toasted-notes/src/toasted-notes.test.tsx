import { act, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('toasted-notes public contract', () => {
  it('announces notifications through its public toaster', async () => {
    let toaster: (typeof import('./index'))['toaster'];

    await act(async () => {
      ({ toaster } = await import('./index'));
    });
    await waitFor(() => expect(toaster.createNotification).toBeTypeOf('function'));

    act(() => {
      toaster.notify('Saved', { duration: null, messageRole: 'alert' });
    });

    expect(await screen.findByRole('alert')).toHaveTextContent('Saved');
  });
});
