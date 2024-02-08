import { Button } from '@sk-web-gui/button';
import { Checkbox } from '@sk-web-gui/forms';
import { Icon } from '@sk-web-gui/icon';
import { Link } from '@sk-web-gui/link';
import { SearchField } from '@sk-web-gui/searchfield';
import { Meta } from '@storybook/react';
import React from 'react';
import { PopupMenu, PopupMenuProps } from '../src';

export default {
  title: 'Komponenter/PopupMenu',
  component: PopupMenu,
  tags: ['autodocs'],
} as Meta<typeof PopupMenu>;

export const Template = (args: PopupMenuProps) => {
  return (
    <div className="h-[50rem] flex flex-col items-center">
      <div className="relative w-min h-[3.2rem]">
        <PopupMenu {...args}>
          <PopupMenu.Button
            size="sm"
            variant="primary"
            aria-label="More options"
            color="bjornstigen"
            iconButton
            rounded
          >
            <Icon name="arrow-down" />
          </PopupMenu.Button>
          <PopupMenu.Items>
            <PopupMenu.Group>
              <PopupMenu.Item>
                <Button
                  role="menuitemcheckbox"
                  leftIcon={<Icon name="wallet" />}
                  onClick={() => console.log('Account')}
                >
                  Konto
                </Button>
              </PopupMenu.Item>
              <PopupMenu.Item>
                <Link onClick={() => console.log('Edit')}>
                  <Icon name="settings-2" /> Inställningar
                </Link>
              </PopupMenu.Item>
            </PopupMenu.Group>
            <PopupMenu.Group>
              <PopupMenu.Item>
                <Button leftIcon={<Icon name="log-out" />} onClick={() => console.log('Logout')}>
                  Logga ut
                </Button>
              </PopupMenu.Item>
            </PopupMenu.Group>
          </PopupMenu.Items>
        </PopupMenu>
      </div>
    </div>
  );
};

Template.storyName = 'PopupMenu';

export const CheckboxesAndFilter = () => {
  const values = ['Banan', 'Äpple', 'Päron', 'Apelsin'];
  const [query, setQuery] = React.useState<string>('');
  return (
    <div className="h-[30rem]">
      <PopupMenu>
        <PopupMenu.Button rightIcon={<Icon name="chevron-down" />}>Filter</PopupMenu.Button>
        <PopupMenu.Group>
          <SearchField
            autoFocus
            size="md"
            placeholder="Sök eller välj ur lista"
            id="searchbar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onClose={() => setQuery('')}
          />
        </PopupMenu.Group>
        <PopupMenu.Items aria-label="Sök eller välj ur lista" aria-labelledby="">
          {values
            .filter((value) => value.toLowerCase().includes(query.toLowerCase()))
            .map((value) => (
              <PopupMenu.Item key={value}>
                <Checkbox labelPosition="left">{value}</Checkbox>
              </PopupMenu.Item>
            ))}
        </PopupMenu.Items>
      </PopupMenu>
    </div>
  );
};
