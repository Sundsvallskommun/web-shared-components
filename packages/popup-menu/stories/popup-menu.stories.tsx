import React from 'react';
import { Button } from '@sk-web-gui/button';
import { Link } from '@sk-web-gui/link';
import { PopupMenu, PopupMenuProps } from '../src';
import { Meta } from '@storybook/react';
import { Icon } from '@sk-web-gui/icon';
import { SearchField } from '@sk-web-gui/searchfield';

export default {
  title: 'Komponenter/PopupMenu',
  component: PopupMenu,
  tags: ['autodocs'],
} as Meta<typeof PopupMenu>;

export const Template = (args: PopupMenuProps) => {
  const values = ['Banan', 'Äpple', 'Päron', 'Apelsin'];
  const [query, setQuery] = React.useState<string>('');

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
          <PopupMenu.Group>
            <SearchField
              onClose={() => setQuery('')}
              autoFocus
              size="md"
              className="w-fit"
              value={''}
              onChange={(e) => setQuery(e.target.value)}
            />
          </PopupMenu.Group>
          <PopupMenu.Items autoFocus={false}>
            <PopupMenu.Group>
              {values
                .filter((v) => v.toLowerCase().includes(query.toLowerCase()))
                .map((s) => (
                  <PopupMenu.Item key={s}>
                    <Button variant="primary" leftIcon={<Icon name="plus" />} onClick={() => console.log(s)}>
                      {s}
                    </Button>
                  </PopupMenu.Item>
                ))}
              <PopupMenu.Item>
                <a onClick={() => console.log('Profile')} href="">
                  <span>
                    <Icon name="user" /> Profil
                  </span>
                </a>
              </PopupMenu.Item>
            </PopupMenu.Group>
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
                <button onClick={() => console.log('Edit')}>
                  <>
                    <Icon name="settings-2" /> Inställningar
                  </>
                </button>
              </PopupMenu.Item>
            </PopupMenu.Group>
          </PopupMenu.Items>
          <PopupMenu.Group>
            <Button leftIcon={<Icon name="log-out" />} onClick={() => console.log('Logout')}>
              Logga ut
            </Button>
          </PopupMenu.Group>
        </PopupMenu>
      </div>

      <div className="mt-32 w-full">
        <h2>Textknapp</h2>
        <div className="w-min relative h-[4rem]">
          <PopupMenu {...args}>
            <PopupMenu.Button variant="tertiary" rightIcon={<Icon name="more-vertical" />}>
              Kontextmeny
            </PopupMenu.Button>
            <PopupMenu.Item>
              <Button leftIcon={<Icon name="user" />} onClick={() => console.log('Profile')}>
                Profil
              </Button>
            </PopupMenu.Item>

            <PopupMenu.Item>
              <Button leftIcon={<Icon name="wallet" />} onClick={() => console.log('Account')}>
                Konto
              </Button>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <Link onClick={() => console.log('Edit')}>
                <Icon name="settings-2" /> Inställningar
              </Link>
            </PopupMenu.Item>
            <PopupMenu.Item>
              <Button leftIcon={<Icon name="log-out" />} onClick={() => console.log('Logout')}>
                Logga ut
              </Button>
            </PopupMenu.Item>
          </PopupMenu>
        </div>
      </div>
    </div>
  );
};

Template.storyName = 'PopupMenu';
