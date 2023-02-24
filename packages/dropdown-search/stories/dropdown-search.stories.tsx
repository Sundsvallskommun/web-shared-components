import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import DropdownSearch from '../src/dropdown-search';
import { defaults } from 'autoprefixer';

export default {
  title: 'Komponenter/Dropdown/DropdownSearch',
  component: DropdownSearch,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = (args: any) => {
  const cleanState = [
    { id: 1, orgName: 'Durward Reynolds' },
    { id: 2, orgName: 'Kenton Towne' },
    { id: 3, orgName: 'Therese Wunsch' },
    { id: 4, orgName: 'Benedict Kessler' },
    { id: 5, orgName: 'Katelyn Rohan', moreData: { test: '' } },
  ];

  const [value, setValue] = useState({ id: 0, orgName: 'default' });

  const handleOnSelect = (value: any) => {
    console.log('handleOnSelect', value);
    setValue(value.data);
  };

  const handleOnChange = (event: React.BaseSyntheticEvent) => {
    console.log('handleOnChange', event.target.value);
  };

  return (
    <form
      style={{ minHeight: 300 }}
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submit');
      }}
    >
      <DropdownSearch
        {...args}
        data={cleanState}
        labelProperty="orgName"
        onChange={handleOnChange}
        onSelect={handleOnSelect}
        value={{ label: value.orgName, data: value }}
        render={(value) => {
          return <div>{value.label} TEST</div>;
        }}
        filterFunction={(q, item) => {
          if (item.data.orgName.toLowerCase().includes(q.toLowerCase())) return true;
          if (item.data.id && item.data.id.toString().includes(q.toLowerCase())) return true;
          return false;
        }}
        useDeleteButton
        // deleteCallback={() => console.log('deletebutton clicked')}
        // closeIcon={<div>X</div>}
        notFoundLabel="Inga resultat..."
      />
    </form>
  );
};

Template.storyName = 'DropdownSearch';

Template.argTypes = {
  maxAmount: {
    type: {
      name: 'number',
      require: false,
    },
    description: 'Max options shown at one time (def: 10)',
    defaultValue: 10,
  },
  className: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'Extra className',
    defaultValue: '',
  },
  listClassName: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'Extra className on list',
    defaultValue: '',
  },
  onChange: {
    type: {
      name: 'function',
      require: true,
    },
    description: 'onChange callback',
  },
  value: {
    type: {
      name: 'string',
      require: true,
    },
    description: 'Selected value',
  },
  placeholder: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'Placeholder, You know what this is.',
    defaultValue: 'placeholder...',
  },
  labelProperty: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'To specify which object property to use as label',
    defaultValue: 'label',
  },
  render: {
    type: {
      name: 'function',
      require: false,
    },
    description: 'Render function',
    defaultValue: '',
  },
  filterFunction: {
    type: {
      name: 'function',
      require: false,
    },
    description: 'Filter function',
    defaultValue: '',
  },
  size: {
    type: { name: 'string', required: false },
    description: 'Sets size',
    table: {
      defaultValue: { summary: 'md' },
    },
    options: ['sm', 'md', 'lg'],
    control: 'select',
    defaultValue: 'md',
  },
};
