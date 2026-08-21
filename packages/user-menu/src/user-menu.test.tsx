import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserMenu } from './user-menu';

describe('UserMenu', () => {
  const defaultProps = {
    menuTitle: 'John Doe',
    menuSubTitle: 'john@example.com',
    initials: 'JD',
    menuGroups: [
      {
        label: 'Actions',
        elements: [
          { label: 'Profile', element: () => <button>Profile</button> },
          { label: 'Logout', element: () => <button>Logout</button> },
        ],
      },
    ],
  };

  it('renders the avatar button', () => {
    render(<UserMenu {...defaultProps} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('opens menu on click', async () => {
    const user = userEvent.setup();
    render(<UserMenu {...defaultProps} />);

    await user.click(screen.getByText('JD'));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders menu items when opened', async () => {
    const user = userEvent.setup();
    render(<UserMenu {...defaultProps} />);

    await user.click(screen.getByText('JD'));

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('applies sk-usermenu class', () => {
    const { container } = render(<UserMenu {...defaultProps} />);
    expect(container.querySelector('.sk-usermenu')).toBeInTheDocument();
  });

  it('renders avatar with initials', () => {
    render(<UserMenu {...defaultProps} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<UserMenu {...defaultProps} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
