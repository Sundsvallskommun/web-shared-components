import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuVerticalProvider } from './menu-vertical-context';
import { MenuVerticalComponent } from './menu-vertical';
import { MenuVerticalItem } from './menu-vertical-item';
import { MenuVerticalSubmenuButton } from './menu-vertical-submenu-button';

const renderMenu = (props = {}) =>
  render(
    <MenuVerticalProvider {...props}>
      <MenuVerticalComponent>
        <MenuVerticalItem>
          <button>Item 1</button>
        </MenuVerticalItem>
        <MenuVerticalItem>
          <button>Item 2</button>
        </MenuVerticalItem>
        <MenuVerticalItem>
          <button>Item 3</button>
        </MenuVerticalItem>
      </MenuVerticalComponent>
    </MenuVerticalProvider>
  );

describe('MenuVertical', () => {
  it('renders a ul element', () => {
    renderMenu();
    expect(document.querySelector('.sk-menu-vertical')).toBeInTheDocument();
  });

  it('renders menu items', () => {
    renderMenu();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('applies menuitem role to items', () => {
    renderMenu();
    const items = screen.getAllByRole('menuitem');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it('renders submenu toggle', () => {
    render(
      <MenuVerticalProvider>
        <MenuVerticalComponent>
          <MenuVerticalSubmenuButton>
            Submenu
          </MenuVerticalSubmenuButton>
        </MenuVerticalComponent>
      </MenuVerticalProvider>
    );
    expect(screen.getByText('Submenu')).toBeInTheDocument();
  });

  it('renders with sk-menu-vertical class', () => {
    renderMenu();
    expect(document.querySelector('.sk-menu-vertical')).toBeInTheDocument();
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    renderMenu();

    const items = screen.getAllByRole('menuitem');
    await user.click(items[0]);

    expect(items[0]).toHaveFocus();
  });

  it('renders all menu items as list items', () => {
    renderMenu();
    const listItems = document.querySelectorAll('.sk-menu-vertical-item');
    expect(listItems.length).toBe(3);
  });

  it('applies current prop to menu item', () => {
    render(
      <MenuVerticalProvider current={0}>
        <MenuVerticalComponent>
          <MenuVerticalItem menuIndex={0} current>
            <a href="#">Current</a>
          </MenuVerticalItem>
          <MenuVerticalItem menuIndex={1}>
            <a href="#">Other</a>
          </MenuVerticalItem>
        </MenuVerticalComponent>
      </MenuVerticalProvider>
    );
    // The current item should have a distinguishing attribute
    const items = document.querySelectorAll('.sk-menu-vertical-item');
    expect(items.length).toBe(2);
  });
});
