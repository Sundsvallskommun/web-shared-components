import React from 'react';
import { Button } from '@sk-web-gui/button';
import { Link } from '@sk-web-gui/link';
import { PopupMenu, PopupMenuProps } from '../src';
import { Meta } from '@storybook/react';
import { Icon } from '@sk-web-gui/icon';

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
          <PopupMenu.Group>
            {['Val 1', 'Val 2', 'Val 3'].map((s) => (
              <PopupMenu.Item key={s}>
                <Button variant="primary" leftIcon={<Icon name="plus" />}>
                  {s}
                </Button>
              </PopupMenu.Item>
            ))}
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
                <>
                  <Icon name="settings-2" /> Inställningar
                </>
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
