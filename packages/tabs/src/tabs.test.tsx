import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsComponent } from './tabs';
import { TabsButton } from './tabs-button';
import { TabsContent } from './tabs-content';
import { TabsItem } from './tabs-item';

const renderTabs = (props = {}) =>
  render(
    <TabsComponent {...props}>
      <TabsItem>
        <TabsButton>Tab 1</TabsButton>
        <TabsContent>Content 1</TabsContent>
      </TabsItem>
      <TabsItem>
        <TabsButton>Tab 2</TabsButton>
        <TabsContent>Content 2</TabsContent>
      </TabsItem>
      <TabsItem>
        <TabsButton>Tab 3</TabsButton>
        <TabsContent>Content 3</TabsContent>
      </TabsItem>
    </TabsComponent>
  );

describe('Tabs', () => {
  it('renders a tablist', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all tab buttons', () => {
    renderTabs();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('has first tab selected by default', () => {
    renderTabs();
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('changes tab on click', async () => {
    const user = userEvent.setup();
    renderTabs();

    const tabs = screen.getAllByRole('tab');
    await user.click(tabs[1]);

    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onTabChange when tab changes', async () => {
    const handleTabChange = vi.fn();
    const user = userEvent.setup();

    renderTabs({ onTabChange: handleTabChange });
    const tabs = screen.getAllByRole('tab');
    await user.click(tabs[1]);

    expect(handleTabChange).toHaveBeenCalledWith(1);
  });

  it('renders tab panels', () => {
    renderTabs();
    const panels = screen.getAllByRole('tabpanel', { hidden: true });
    expect(panels.length).toBeGreaterThan(0);
  });

  it('applies size data attribute', () => {
    const { container } = renderTabs({ size: 'sm' });
    expect(container.querySelector('[data-size="sm"]')).toBeInTheDocument();
  });

  it('applies color data attribute', () => {
    const { container } = renderTabs({ color: 'vattjom' });
    expect(container.querySelector('[data-color="vattjom"]')).toBeInTheDocument();
  });

  it('sets current tab via prop', () => {
    renderTabs({ current: 2 });
    const tabs = screen.getAllByRole('tab');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('applies sk-tabs class', () => {
    const { container } = renderTabs();
    expect(container.querySelector('.sk-tabs')).toBeInTheDocument();
  });
});
