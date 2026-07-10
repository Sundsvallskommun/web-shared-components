import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeaderComponent } from './header';

describe('Header', () => {
  it('renders a nav element', () => {
    const { container } = render(<HeaderComponent title="My App" />);
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('renders title via Logo', () => {
    render(<HeaderComponent title="My App" />);
    expect(screen.getByText('My App')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<HeaderComponent title="My App" subtitle="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders userMenu slot', () => {
    render(<HeaderComponent title="App" userMenu={<div>User Menu</div>} />);
    expect(screen.getByText('User Menu')).toBeInTheDocument();
  });

  it('renders mainMenu slot', () => {
    render(<HeaderComponent title="App" mainMenu={<div>Main Menu</div>} />);
    expect(screen.getByText('Main Menu')).toBeInTheDocument();
  });

  it('renders mobileMenu slot', () => {
    render(<HeaderComponent title="App" mobileMenu={<div>Mobile Menu</div>} />);
    expect(screen.getByText('Mobile Menu')).toBeInTheDocument();
  });

  it('calls logoLinkOnClick when logo is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<HeaderComponent title="App" logoLinkOnClick={handleClick} />);

    await user.click(screen.getByRole('link', { name: 'App. Gå till startsidan.' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies sk-header class', () => {
    const { container } = render(<HeaderComponent title="App" />);
    expect(container.querySelector('.sk-header')).toBeInTheDocument();
  });
});
