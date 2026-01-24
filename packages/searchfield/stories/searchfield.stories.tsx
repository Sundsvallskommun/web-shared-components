import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SearchField, SearchFieldProps } from '../src';
import { expect, fn, userEvent, within } from '@storybook/test';

export default {
  title: 'Komponenter/Searchfield',
  component: SearchField.Component,
  tags: ['autodocs'],
  args: {
    placeholder: 'Sök',
  },
} as Meta<typeof SearchField.Component>;

export const Template: StoryObj<typeof SearchField> = (args: SearchFieldProps) => {
  const [term, setTerm] = useState('');
  const [dirty, setDirty] = useState(false);

  const onChangeHandler = (event: React.BaseSyntheticEvent) => {
    setTerm(event.target.value);
    setDirty(true);
  };
  const onResetHandler = () => {
    console.log('onResetHandler');
    setDirty(false);
  };
  const onSearchHandler = (query: string) => {
    console.log('onSearchHandler', query);
    setDirty(false);
  };

  return (
    <SearchField
      {...args}
      value={term}
      showSearchButton={dirty}
      // showResetButton={!dirty}
      onChange={onChangeHandler}
      onReset={onResetHandler}
      onSearch={onSearchHandler}
    />
  );
};

Template.storyName = 'SearchField';

type Story = StoryObj<typeof SearchField.Component>;

export const SearchFlowTest: Story = {
  name: 'Test: Search Flow',
  tags: ['dev-only', '!autodocs'],
  args: {
    placeholder: 'Search...',
    onChange: fn(),
    onSearch: fn(),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Type search term', async () => {
      await userEvent.type(input, 'test query');
      await expect(input).toHaveValue('test query');
    });

    await step('Press Enter to search', async () => {
      await userEvent.keyboard('{Enter}');
      await expect(args.onSearch).toHaveBeenCalledWith('test query');
    });
  },
};

export const ResetTest: Story = {
  name: 'Test: Reset',
  tags: ['dev-only', '!autodocs'],
  args: {
    placeholder: 'Search...',
    value: 'existing text',
    showResetButton: true,
    onChange: fn(),
    onReset: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const resetButton = canvas.getByRole('button', { name: /rensa|clear/i });

    await userEvent.click(resetButton);
    await expect(args.onReset).toHaveBeenCalledTimes(1);
  },
};

export const SearchButtonTest: Story = {
  name: 'Test: Search Button',
  tags: ['dev-only', '!autodocs'],
  args: {
    placeholder: 'Search...',
    showSearchButton: true,
    onChange: fn(),
    onSearch: fn(),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Type search term', async () => {
      await userEvent.type(input, 'search query');
    });

    await step('Click the search button', async () => {
      const searchButton = canvas.getByRole('button', { name: /sök|search/i });
      await userEvent.click(searchButton);
      await expect(args.onSearch).toHaveBeenCalledWith('search query');
    });
  },
};
