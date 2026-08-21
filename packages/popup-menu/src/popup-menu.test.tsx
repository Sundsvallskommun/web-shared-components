import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Import from index to get the composed PopupMenu with sub-components
import PopupMenu from './index';

const renderPopupMenu = (props = {}) =>
  render(
    <PopupMenu {...props}>
      <PopupMenu.Button>Open Menu</PopupMenu.Button>
      <PopupMenu.Panel>
        <PopupMenu.Items>
          <PopupMenu.Item><button>Item 1</button></PopupMenu.Item>
          <PopupMenu.Item><button>Item 2</button></PopupMenu.Item>
        </PopupMenu.Items>
      </PopupMenu.Panel>
    </PopupMenu>
  );

describe('PopupMenu', () => {
  it('renders the trigger button', () => {
    renderPopupMenu();
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('panel is hidden by default', () => {
    renderPopupMenu();
    const panel = document.querySelector('.sk-popup-menu');
    expect(panel).toHaveAttribute('data-open', 'false');
  });

  it('opens panel on button click', async () => {
    const user = userEvent.setup();
    renderPopupMenu();

    await user.click(screen.getByText('Open Menu'));

    const panel = document.querySelector('.sk-popup-menu');
    expect(panel).toHaveAttribute('data-open', 'true');
  });

  it('calls onToggleOpen when toggled', async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    renderPopupMenu({ onToggleOpen: handleToggle });
    await user.click(screen.getByText('Open Menu'));

    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it('applies position data attribute', () => {
    renderPopupMenu({ position: 'over' });
    const panel = document.querySelector('.sk-popup-menu');
    expect(panel).toHaveAttribute('data-position', 'over');
  });

  it('applies align data attribute', () => {
    renderPopupMenu({ align: 'end' });
    const panel = document.querySelector('.sk-popup-menu');
    expect(panel).toHaveAttribute('data-align', 'end');
  });

  it('renders menu items', async () => {
    const user = userEvent.setup();
    renderPopupMenu();

    await user.click(screen.getByText('Open Menu'));

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies size class', () => {
    renderPopupMenu({ size: 'sm' });
    const panel = document.querySelector('.sk-popup-menu');
    expect(panel).toHaveClass('sk-popup-menu-sm');
  });
});
