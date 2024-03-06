import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SearchField, SearchFieldProps } from '../index';

export default {
  title: 'Komponenter/SearchField/SearchFieldSuggestions',
  component: SearchField.SuggestionsInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Sök',
  },
} as Meta<typeof SearchField.SuggestionsInput>;

const fruits = [
  'apple',
  'apricot',
  'avocado',
  'banana',
  'bell pepper',
  'bilberry',
  'blackberry',
  'blackcurrant',
  'blood orange',
  'blueberry',
  'boysenberry',
  'breadfruit',
  'canary melon',
  'cantaloupe',
  'cherimoya',
  'cherry',
  'chili pepper',
  'clementine',
  'cloudberry',
  'coconut',
  'cranberry',
  'cucumber',
  'currant',
  'damson',
  'date',
  'dragonfruit',
  'durian',
  'eggplant',
  'elderberry',
  'feijoa',
  'fig',
  'goji berry',
  'gooseberry',
  'grape',
  'grapefruit',
  'guava',
  'honeydew',
  'huckleberry',
  'jackfruit',
  'jambul',
  'jujube',
  'kiwi fruit',
  'kumquat',
  'lemon',
  'lime',
  'loquat',
  'lychee',
  'mandarine',
  'mango',
  'mulberry',
  'nectarine',
  'nut',
  'olive',
  'orange',
  'papaya',
  'passionfruit',
  'peach',
  'pear',
  'persimmon',
  'physalis',
  'pineapple',
  'plum',
  'pomegranate',
  'pomelo',
  'purple mangosteen',
  'quince',
  'raisin',
  'rambutan',
  'raspberry',
  'redcurrant',
  'rock melon',
  'salal berry',
  'satsuma',
  'star fruit',
  'strawberry',
  'tamarillo',
  'tangerine',
  'tomato',
  'ugli fruit',
  'watermelon',
];

export const Template: StoryObj<typeof SearchField.Suggestions> = (
  args: React.ComponentPropsWithRef<SearchFieldProps['SuggestionsInput']>
) => {
  const onSearchHandler = (query: string) => {
    console.log('onSearchHandler', query);
  };

  return (
    <div className="h-[38rem]">
      <SearchField.Suggestions>
        <SearchField.SuggestionsInput {...args} onSearch={onSearchHandler} />
        <SearchField.SuggestionsList>
          {fruits.map((fruit, index) => (
            <SearchField.SuggestionsOption key={`fruit-${index}`} value={fruit}>
              {fruit}
            </SearchField.SuggestionsOption>
          ))}
        </SearchField.SuggestionsList>
      </SearchField.Suggestions>
    </div>
  );
};

Template.storyName = 'SearchField';
