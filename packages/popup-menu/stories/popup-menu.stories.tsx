import { Button } from '@sk-web-gui/button';
import { Checkbox, DatePicker, FormControl, FormLabel } from '@sk-web-gui/forms';
import Icon from '@sk-web-gui/icon';
import { Link } from '@sk-web-gui/link';
import { SearchField } from '@sk-web-gui/searchfield';
import { Meta } from '@storybook/react';
import React from 'react';
import { PopupMenu, PopupMenuProps } from '../src';
import { useForm } from 'react-hook-form';

export default {
  title: 'Komponenter/PopupMenu',
  component: PopupMenu,
  tags: ['autodocs'],
  args: {
    position: 'over',
    autoPosition: false,
  },
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
          <PopupMenu.Panel>
            <PopupMenu.Items>
              <PopupMenu.Group>
                <PopupMenu.Item>
                  <Button leftIcon={<Icon name="wallet" />} onClick={() => console.log('Account')}>
                    Konto
                  </Button>
                </PopupMenu.Item>
                <PopupMenu.Item>
                  <Link
                    onClick={() => {
                      console.log('Edit');
                    }}
                  >
                    <Icon name="settings-2" /> Inställningar
                  </Link>
                </PopupMenu.Item>

                <PopupMenu.Item>
                  <PopupMenu>
                    <PopupMenu.Button leftIcon={<Icon name="settings" />} rightIcon={<Icon name="chevron-right" />}>
                      Inställningar
                    </PopupMenu.Button>
                    <PopupMenu.Panel>
                      <PopupMenu.Items>
                        <PopupMenu.Item>
                          <Button
                            role="menuitemcheckbox"
                            leftIcon={<Icon name="wallet" />}
                            onClick={() => {
                              console.log('Account');
                            }}
                          >
                            Konto
                          </Button>
                        </PopupMenu.Item>
                      </PopupMenu.Items>
                    </PopupMenu.Panel>
                  </PopupMenu>
                </PopupMenu.Item>
              </PopupMenu.Group>
              <PopupMenu.Group>
                <PopupMenu.Item>
                  <Button
                    leftIcon={<Icon name="log-out" />}
                    onClick={() => {
                      console.log('Logout');
                    }}
                  >
                    Logga ut
                  </Button>
                </PopupMenu.Item>
              </PopupMenu.Group>
            </PopupMenu.Items>
          </PopupMenu.Panel>
        </PopupMenu>
      </div>
    </div>
  );
};

Template.storyName = 'PopupMenu';

export const CheckboxesAndFilter = () => {
  const values = ['Banan', 'Äpple', 'Päron', 'Apelsin'];
  const { register, watch } = useForm<{ fruit: string[] }>({ defaultValues: { fruit: [] } });
  const [query, setQuery] = React.useState<string>('');

  const selected = watch('fruit');

  React.useEffect(() => {
    console.log('Selected: ', selected);
  }, [selected]);

  return (
    <div className="h-[30rem]">
      <PopupMenu>
        <PopupMenu.Button rightIcon={<Icon name="chevron-down" />}>Filter</PopupMenu.Button>
        <PopupMenu.Panel>
          <PopupMenu.Group>
            <SearchField
              autoFocus
              size="md"
              placeholder="Sök eller välj ur lista"
              id="searchbar"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onReset={() => setQuery('')}
            />
          </PopupMenu.Group>
          <PopupMenu.Items autoFocus={false} aria-label="Sök eller välj ur lista" aria-labelledby="">
            {values
              .filter((value) => value.toLowerCase().includes(query.toLowerCase()))
              .map((value) => (
                <PopupMenu.Item key={value}>
                  <Checkbox labelPosition="left" {...register('fruit')} value={value}>
                    {value}
                  </Checkbox>
                </PopupMenu.Item>
              ))}
          </PopupMenu.Items>
        </PopupMenu.Panel>
      </PopupMenu>
    </div>
  );
};

export const PopupMenuAsDialog = () => {
  return (
    <div className="h-[30rem]">
      <PopupMenu type="dialog">
        <PopupMenu.Button rightIcon={<Icon name="chevron-down" />}>Datumfilter</PopupMenu.Button>
        <PopupMenu.Panel>
          <PopupMenu.Group>
            <FormControl>
              <FormLabel>Startdatum</FormLabel>
              <DatePicker autoFocus></DatePicker>
            </FormControl>
            <FormControl>
              <FormLabel>Slutdatum</FormLabel>
              <DatePicker></DatePicker>
            </FormControl>
          </PopupMenu.Group>
          <Button type="button" onClick={() => console.log('Applied')}>
            Applicera
          </Button>
        </PopupMenu.Panel>
      </PopupMenu>
    </div>
  );
};
