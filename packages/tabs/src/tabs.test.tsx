import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TabsContent } from './tabs-content';
import { TabsList } from './tabs-list';
import { TabsTrigger } from './tabs-trigger';
import { TabsComponent } from './tabs';

const TabsFixture = (props: React.ComponentPropsWithRef<typeof TabsComponent>) => {
  const { defaultValue, value, ...rest } = props;
  const selectionProps = value === undefined ? { defaultValue: defaultValue ?? 'tab-1' } : { value };

  return (
    <TabsComponent {...selectionProps} {...rest}>
      <TabsList>
        <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Content 1</TabsContent>
      <TabsContent value="tab-2">Content 2</TabsContent>
      <TabsContent value="tab-3">Content 3</TabsContent>
    </TabsComponent>
  );
};

const renderTabs = (props: React.ComponentPropsWithRef<typeof TabsComponent> = {}) =>
  render(<TabsFixture {...props} />);

const renderTabsWithDisabledSecondTab = () =>
  render(
    <TabsComponent defaultValue="tab-1">
      <TabsList>
        <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab-2" aria-disabled="true">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">Content 1</TabsContent>
      <TabsContent value="tab-2">Content 2</TabsContent>
      <TabsContent value="tab-3">Content 3</TabsContent>
    </TabsComponent>
  );

describe('Tabs', () => {
  it('renders an explicit tablist, triggers, and active content', () => {
    renderTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('selects a tab by its stable default value', () => {
    renderTabs({ defaultValue: 'tab-2' });

    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
  });

  it('changes an uncontrolled value on click', async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
  });

  it('reports the selected string value exactly once', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();
    renderTabs({ onValueChange: handleValueChange });

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

    expect(handleValueChange).toHaveBeenCalledOnce();
    expect(handleValueChange).toHaveBeenCalledWith('tab-2');
  });

  it('uses manual activation by default', async () => {
    const user = userEvent.setup();
    renderTabs();
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

    firstTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute('tabindex', '0');
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
    expect(secondTab).toHaveAttribute('aria-selected', 'false');

    await user.keyboard('{Enter}');
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  it('supports automatic activation when explicitly requested', async () => {
    const user = userEvent.setup();
    renderTabs({ activationMode: 'automatic' });
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

    firstTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
  });

  it('moves focus to the selected tab when tabbing into the tablist', async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Before tabs</button>
        <TabsFixture defaultValue="tab-2" />
      </>
    );

    screen.getByRole('button', { name: 'Before tabs' }).focus();
    await user.tab();

    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
  });

  it('skips disabled tabs during keyboard navigation', async () => {
    const user = userEvent.setup();
    renderTabsWithDisabledSecondTab();
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const disabledTab = screen.getByRole('tab', { name: 'Tab 2' });
    const thirdTab = screen.getByRole('tab', { name: 'Tab 3' });

    firstTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(thirdTab).toHaveFocus();
    expect(disabledTab).toBeDisabled();
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
  });

  it('supports Home and End without changing selection in manual mode', async () => {
    const user = userEvent.setup();
    renderTabs();
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const thirdTab = screen.getByRole('tab', { name: 'Tab 3' });

    firstTab.focus();
    await user.keyboard('{End}');
    expect(thirdTab).toHaveFocus();
    expect(firstTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(firstTab).toHaveFocus();
  });

  it('wraps keyboard focus from the first tab to the last tab', async () => {
    const user = userEvent.setup();
    renderTabs();
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });

    firstTab.focus();
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  it('uses direction-aware arrow key navigation', async () => {
    const user = userEvent.setup();
    renderTabs({ dir: 'rtl' });
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });

    firstTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
  });

  it('connects every trigger to its content', () => {
    renderTabs();
    const trigger = screen.getByRole('tab', { name: 'Tab 1' });
    const content = screen.getByRole('tabpanel');

    expect(trigger).toHaveAttribute('aria-controls', content.id);
    expect(content).toHaveAttribute('aria-labelledby', trigger.id);
  });

  it('inherits visual variants without exposing a palette selector', () => {
    const { container } = renderTabs({ size: 'sm', underline: true });
    const list = screen.getByRole('tablist');
    const item = container.querySelector('.sk-tabs-list-item');
    const trigger = screen.getByRole('tab', { name: 'Tab 1' });

    expect(list).not.toHaveAttribute('data-color');
    expect(list).toHaveAttribute('data-size', 'sm');
    expect(list).toHaveAttribute('data-underline', 'true');
    expect(item).not.toHaveAttribute('data-color');
    expect(trigger).toHaveClass('sk-btn-sm');
  });

  it('keeps selection attached to a stable value when tabs are reordered', () => {
    const DynamicTabs = ({ values }: { values: string[] }) => (
      <TabsComponent defaultValue="history">
        <TabsList>
          {values.map((value) => (
            <TabsTrigger key={value} value={value}>
              {value}
            </TabsTrigger>
          ))}
        </TabsList>
        {values.map((value) => (
          <TabsContent key={value} value={value}>
            {value} content
          </TabsContent>
        ))}
      </TabsComponent>
    );
    const { rerender } = render(<DynamicTabs values={['overview', 'history', 'settings']} />);

    rerender(<DynamicTabs values={['settings', 'overview', 'history']} />);

    expect(screen.getByRole('tab', { name: 'history' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('history content');
  });

  it('supports triggers composed through another component without child inspection', () => {
    const GeneratedTrigger = ({ value }: { value: string }) => (
      <TabsTrigger value={value}>{value}</TabsTrigger>
    );

    render(
      <TabsComponent defaultValue="generated">
        <TabsList>
          <GeneratedTrigger value="generated" />
        </TabsList>
        <TabsContent value="generated">Generated content</TabsContent>
      </TabsComponent>
    );

    expect(screen.getByRole('tab', { name: 'generated' })).toHaveAttribute('aria-selected', 'true');
  });

  it('syncs a controlled value without reporting a user change', () => {
    const handleValueChange = vi.fn();
    const { rerender } = renderTabs({ value: 'tab-1', onValueChange: handleValueChange });

    rerender(<TabsFixture value="tab-3" onValueChange={handleValueChange} />);

    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true');
    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it('forwards refs to the root and explicit component DOM owners', () => {
    const rootRef = createRef<HTMLDivElement>();
    const listRef = createRef<HTMLUListElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <TabsComponent ref={rootRef} defaultValue="tab-1">
        <TabsList ref={listRef}>
          <TabsTrigger ref={triggerRef} value="tab-1">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent ref={contentRef} value="tab-1">
          Content 1
        </TabsContent>
      </TabsComponent>
    );

    expect(rootRef.current).toHaveClass('sk-tabs');
    expect(listRef.current).toHaveClass('sk-tabs-list');
    expect(triggerRef.current).toHaveRole('tab');
    expect(contentRef.current).toHaveRole('tabpanel');
  });

  it('applies root props and handlers exactly once', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    renderTabs({ onClick: handleClick, 'data-testid': 'tabs-root' });

    await user.click(screen.getByText('Content 1'));

    expect(screen.getByTestId('tabs-root')).toHaveClass('sk-tabs');
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('keeps force-mounted inactive content identifiable for core styling', () => {
    render(
      <TabsComponent defaultValue="tab-1">
        <TabsList>
          <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">Content 1</TabsContent>
        <TabsContent value="tab-2" forceMount data-testid="inactive-content">
          Content 2
        </TabsContent>
      </TabsComponent>
    );

    expect(screen.getByTestId('inactive-content')).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByTestId('inactive-content')).toHaveClass('sk-tabs-content');
  });
});
