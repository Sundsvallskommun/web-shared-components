import { Meta } from '@storybook/react';
import { CountryCodeCombobox, CountryCodeSelect } from '../src';
import type { CountryCodeSelectProps, CountryCodeComboboxProps } from '../src';
import { Input } from '@sk-web-gui/forms';

export default {
  title: 'Komponenter/CountryCodeSelect',
  component: CountryCodeSelect,
  tags: ['autodocs'],
} as Meta<typeof CountryCodeSelect>;

export const Template = (args: CountryCodeSelectProps) => {
  return (
    <CountryCodeSelect
      aria-label="Välj landskod"
      placeholder="Välj landskod"
      {...args}
      onChangeCountryCode={(value) => console.log('Landskod: ', value)}
      onChange={(e) => console.log('Select: ', e.target.value)}
    />
  );
};

Template.storyName = 'Country Code Select';

export const Combobox = (args: CountryCodeComboboxProps) => {
  return (
    <div className="h-[38rem] flex gap-16">
      <CountryCodeCombobox
        aria-label="Välj landskod"
        size="sm"
        {...args}
        onChangeCountryCode={(value) => console.log('Landskod: ', value)}
        onChange={(e) => console.log('Select: ', e.target.value)}
      />
      <CountryCodeCombobox
        aria-label="Välj landskod"
        size="md"
        {...args}
        onChangeCountryCode={(value) => console.log('Landskod: ', value)}
        onChange={(e) => console.log('Select: ', e.target.value)}
      />
      <CountryCodeCombobox
        aria-label="Välj landskod"
        size="lg"
        {...args}
        onChangeCountryCode={(value) => console.log('Landskod: ', value)}
        onChange={(e) => console.log('Select: ', e.target.value)}
      />
    </div>
  );
};

Combobox.storyName = 'Country Code Combobox';

export const InputWithSelect = (args: CountryCodeSelectProps) => {
  return (
    <div className="h-[38rem] flex flex-col gap-16 w-full">
      <Input.Group size="sm">
        <Input.LeftAddon>
          <CountryCodeSelect
            aria-label="Välj landskod"
            {...args}
            onChangeCountryCode={(value) => console.log('Landskod: ', value)}
            onChange={(e) => console.log('Select: ', e.target.value)}
          />
        </Input.LeftAddon>
        <Input type="number" placeholder="701234567" aria-label="Telefonnummer" />
      </Input.Group>
      <Input.Group size="md">
        <Input.LeftAddon>
          <CountryCodeSelect
            aria-label="Välj landskod"
            {...args}
            onChangeCountryCode={(value) => console.log('Landskod: ', value)}
            onChange={(e) => console.log('Select: ', e.target.value)}
          />
        </Input.LeftAddon>
        <Input type="number" placeholder="701234567" aria-label="Telefonnummer" />
      </Input.Group>
      <Input.Group size="lg">
        <Input.LeftAddon>
          <CountryCodeSelect
            aria-label="Välj landskod"
            {...args}
            onChangeCountryCode={(value) => console.log('Landskod: ', value)}
            onChange={(e) => console.log('Select: ', e.target.value)}
          />
        </Input.LeftAddon>
        <Input type="number" placeholder="701234567" aria-label="Telefonnummer" />
      </Input.Group>
    </div>
  );
};

export const InputWithCombobox = (args: CountryCodeComboboxProps) => {
  return (
    <div className="h-[38rem] flex flex-col gap-16 w-full">
      <Input.Group size="sm">
        <Input.LeftAddon>
          <CountryCodeCombobox
            size="sm"
            aria-label="Välj landskod"
            defaultValue={'SE+46'}
            {...args}
            onChangeCountryCode={(value) => console.log('Landskod: ', value)}
            onChange={(e) => console.log('Select: ', e.target.value)}
          />
        </Input.LeftAddon>
        <Input type="number" placeholder="701234567" aria-label="Telefonnummer" />
      </Input.Group>
      <Input.Group size="md">
        <Input.LeftAddon>
          <CountryCodeCombobox
            size="md"
            aria-label="Välj landskod"
            defaultValue={'SE+46'}
            {...args}
            onChangeCountryCode={(value) => console.log('Landskod: ', value)}
            onChange={(e) => console.log('Select: ', e.target.value)}
          />
        </Input.LeftAddon>
        <Input type="number" placeholder="701234567" aria-label="Telefonnummer" />
      </Input.Group>
      <Input.Group size="lg">
        <Input.LeftAddon>
          <CountryCodeCombobox
            size="lg"
            aria-label="Välj landskod"
            defaultValue={'SE+46'}
            {...args}
            onChangeCountryCode={(value) => console.log('Landskod: ', value)}
            onChange={(e) => console.log('Select: ', e.target.value)}
          />
        </Input.LeftAddon>
        <Input type="number" placeholder="701234567" aria-label="Telefonnummer" />
      </Input.Group>
    </div>
  );
};
