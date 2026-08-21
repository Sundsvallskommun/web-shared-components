import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Snackbar } from './snackbar';

describe('Snackbar', () => {
  it('renders message text', () => {
    render(<Snackbar message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders close button when closeable', () => {
    render(<Snackbar message="Message" closeable />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not render close button when closeable is false', () => {
    render(<Snackbar message="Message" closeable={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls actionCallback on action click', async () => {
    const handleAction = vi.fn();
    const user = userEvent.setup();

    render(<Snackbar message="Message" actionCallback={handleAction} />);
    await user.click(screen.getByRole('button'));

    expect(handleAction).toHaveBeenCalled();
  });

  it('applies status class', () => {
    const { container } = render(<Snackbar message="Message" status="success" />);
    expect(container.querySelector('.sk-snackbar-success')).toBeInTheDocument();
  });

  it('renders leading icon by default', () => {
    const { container } = render(<Snackbar message="Message" />);
    expect(container.querySelector('.sk-snackbar-icon')).toBeInTheDocument();
  });

  it('hides leading icon when leadingIcon is false', () => {
    const { container } = render(<Snackbar message="Message" leadingIcon={false} />);
    expect(container.querySelector('.sk-snackbar-icon')).not.toBeInTheDocument();
  });
});
