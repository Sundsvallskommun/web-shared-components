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

  const setValueHandler = (value: any) => {
    console.log('setValueHandler', value);
    setValue(value.data);
  };

  return (
    <div style={{ minHeight: 300 }}>
      <DropdownSearch
        {...args}
        data={cleanState}
        labelProperty="orgName"
        onChange={setValueHandler}
        value={{ label: value.orgName, data: value }}
        render={(value) => {
          return <div>{value.label} TEST</div>;
        }}
        filterFunction={(q, item) => {
          if (item.data.orgName.toLowerCase().includes(q.toLowerCase())) return true;
          if (item.data.id && item.data.id.toString().includes(q.toLowerCase())) return true;
          return false;
        }}
      />
    </div>
  );
};

Template.storyName = 'DropdownSearch';

Template.argTypes = {
  label: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Label',
    defaultValue: 'Filter label',
  },
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
};
