import { Badge } from '@sk-web-gui/badge';
import { Callout } from '@sk-web-gui/callout';
import { Icon } from '@sk-web-gui/icon';
import { Pagination } from '@sk-web-gui/pagination';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Home } from 'lucide-react';
import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Tabs, TabsProps } from '../src';
import londonSrc from './images/london.jpg';
import parisSrc from './images/paris.jpg';
import tokyoSrc from './images/tokyo.jpg';

export default {
  title: 'Komponenter/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} as Meta<typeof Tabs>;

export const Template = (args: TabsProps) => {
  const { defaultValue = 'item', ...rest } = args;

  return (
    <Tabs
      defaultValue={defaultValue}
      {...rest}
      onValueChange={(value) => console.log('Showing panel', value)}
      className="w-fit"
    >
      <Tabs.List>
        <Tabs.Trigger value="item">Item</Tabs.Trigger>
        <Tabs.Trigger value="disabled" aria-disabled="true" title="För tillfället oåtkomlig">
          <span>Span-wrapped and disabled</span>
        </Tabs.Trigger>
        <Tabs.Trigger value="icon" leftIcon={<Icon icon={<Home />} />}>
          Icon
        </Tabs.Trigger>
        <Tabs.Trigger value="badge" rightIcon={<Badge counter={12} />}>
          Badge
        </Tabs.Trigger>
        <Tabs.Trigger value="callout" rightIcon={<Callout color="warning" />}>
          Callout
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="item">
        <p>London is the capital city of England.</p>
      </Tabs.Content>
      <Tabs.Content value="disabled">
        <p>Paris is the capital of France.</p>
      </Tabs.Content>
      <Tabs.Content value="icon">
        <p>Oslo is the capital of Norway.</p>
      </Tabs.Content>
      <Tabs.Content value="badge">
        <p>Stockholm is the capital of Sweden.</p>
      </Tabs.Content>
      <Tabs.Content value="callout">
        <p>Tokyo is the capital of Japan.</p>
      </Tabs.Content>
    </Tabs>
  );
};

Template.storyName = 'Tabs';

export const StateControlled = () => {
  const [current, setCurrent] = React.useState('first');

  return (
    <div>
      <Tabs value={current} onValueChange={setCurrent}>
        <Tabs.List>
          <Tabs.Trigger value="first">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="second">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="first">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo lorem ac leo vehicula, in
            convallis nisl dapibus. Maecenas et arcu a dui commodo molestie. Etiam id ipsum cursus, gravida velit in,
            feugiat tellus.
          </p>
        </Tabs.Content>
        <Tabs.Content value="second">
          <p>
            Aenean sagittis commodo metus. Integer ac velit cursus, volutpat arcu nec, vulputate lacus. Donec eu magna
            hendrerit, feugiat lacus sed, euismod ex. Integer ligula nulla, pharetra a felis non, finibus cursus odio.
          </p>
        </Tabs.Content>
      </Tabs>
      <Pagination
        pages={2}
        activePage={current === 'first' ? 1 : 2}
        changePage={(page) => setCurrent(page === 1 ? 'first' : 'second')}
      />
    </div>
  );
};

export const ControlOthers = () => {
  const images: Record<string, string> = {
    london: londonSrc,
    paris: parisSrc,
    tokyo: tokyoSrc,
  };
  const [imageSrc, setImageSrc] = useState(londonSrc);

  return (
    <div className="flex gap-32">
      <div className="w-2/3">
        <Tabs defaultValue="london" onValueChange={(value) => setImageSrc(images[value] ?? londonSrc)}>
          <Tabs.List>
            <Tabs.Trigger value="london">London</Tabs.Trigger>
            <Tabs.Trigger value="paris">Paris</Tabs.Trigger>
            <Tabs.Trigger value="tokyo">Tokyo</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="london">
            <p>London is the capital city of England.</p>
          </Tabs.Content>
          <Tabs.Content value="paris">
            <p>Paris is the capital of France.</p>
          </Tabs.Content>
          <Tabs.Content value="tokyo">
            <p>Tokyo is the capital of Japan.</p>
          </Tabs.Content>
        </Tabs>
      </div>
      <div className="w-1/3 max-h-[30rem] overflow-hidden">
        <img src={imageSrc} alt="" className="w-full object-cover" />
      </div>
    </div>
  );
};

ControlOthers.storyName = 'Control external elements';

export const SeparatedListAndContent = () => {
  const [current, setCurrent] = React.useState('london');

  return (
    <Tabs value={current} onValueChange={setCurrent} className="flex gap-32">
      <div className="w-2/3">
        <Tabs.List>
          <Tabs.Trigger value="london">London</Tabs.Trigger>
          <Tabs.Trigger value="paris">Paris</Tabs.Trigger>
          <Tabs.Trigger value="tokyo">Tokyo</Tabs.Trigger>
        </Tabs.List>
      </div>
      <div>
        <Tabs.Content value="london">
          <p>London is the capital city of England.</p>
        </Tabs.Content>
        <Tabs.Content value="paris">
          <p>Paris is the capital of France.</p>
        </Tabs.Content>
        <Tabs.Content value="tokyo">
          <p>Tokyo is the capital of Japan.</p>
        </Tabs.Content>
      </div>
    </Tabs>
  );
};

type Story = StoryObj<typeof Tabs>;

export const KeyboardNavigationTest: Story = {
  name: 'Test: Keyboard navigation',
  tags: ['!autodocs'],
  render: () => (
    <>
      <button>Before tabs</button>
      <Tabs defaultValue="first">
        <Tabs.List>
          <Tabs.Trigger value="first">First tab</Tabs.Trigger>
          <Tabs.Trigger value="disabled" aria-disabled="true">
            Disabled tab
          </Tabs.Trigger>
          <Tabs.Trigger value="last">Last tab</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="first">First panel</Tabs.Content>
        <Tabs.Content value="disabled">Disabled panel</Tabs.Content>
        <Tabs.Content value="last">Last panel</Tabs.Content>
      </Tabs>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const beforeTabs = canvas.getByRole('button', { name: 'Before tabs' });
    const firstTab = canvas.getByRole('tab', { name: 'First tab' });
    const disabledTab = canvas.getByRole('tab', { name: 'Disabled tab' });
    const lastTab = canvas.getByRole('tab', { name: 'Last tab' });

    beforeTabs.focus();
    await userEvent.tab();
    await expect(firstTab).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');

    await expect(lastTab).toHaveFocus();
    await expect(lastTab).toHaveAttribute('tabindex', '0');
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
    await expect(disabledTab).toBeDisabled();

    await userEvent.keyboard('{Enter}');
    await expect(lastTab).toHaveAttribute('aria-selected', 'true');
  },
};
