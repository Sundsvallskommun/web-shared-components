import React from 'react';
import { List, ListProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/List',
  component: List,
  tags: ['autodocs'],
} as Meta<typeof List>;

export const Template = (args: ListProps) => (
  <List {...args}>
    <List.Item>
      <List.Header>Utbildning och förskola</List.Header>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Item>
    <List.Item>
      <List.Header>
        <List.Link>Uppleva och göra</List.Link>{' '}
      </List.Header>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Item>
    <List.Item>
      <List.Header>Omsorg och hjälp</List.Header>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Item>
  </List>
);

Template.storyName = 'List';
