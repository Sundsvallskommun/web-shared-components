import React from 'react';
import { List, ListProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/List/Komponent',
  component: List,
  tags: ['autodocs'],
  args: {},
} as Meta;

export const Template = (args: ListProps) => (
  <div>
<List {...args}>
    <List.Body>
      <List.Item>Utbildning och förskola</List.Item>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Body>
    <List.Body>
      <List.Item>
        <List.Link>Uppleva och göra</List.Link>{' '}
      </List.Item>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Body>
    <List.Body>
      <List.Item>Omsorg och hjälp</List.Item>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Body>
  </List>



     <List listStyle='bullet'>
    <List.Body>
      <List.Item>Utbildning och förskola</List.Item>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Body>
    <List.Body>
      <List.Item>
        <List.Link>Uppleva och göra</List.Link>{' '}
      </List.Item>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Body>
    <List.Body>
      <List.Item>Omsorg och hjälp</List.Item>
      <List.Text>
        Förskolornas prioriterade områden är språk- och kunskapsutvecklande arbetssätt samt lärande för hållbar
        utveckling.
      </List.Text>
    </List.Body>
  </List> 
  </div>
);

Template.storyName = 'List';
