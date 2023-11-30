import { Meta } from '@storybook/react';
import React from 'react';
import PlaceholderImage from '../../../.storybook/public/placeholder_2.png';
import { Card, CardList, CardProps } from '../src';

export default {
  title: 'Komponenter/Card',
  component: Card,
  tags: ['autodocs'],
} as Meta<typeof Card>;

let inputDate = new Date();

export const Template = (args: CardProps) => (
  <CardList>
    <Card {...args}>
      <Card.Image src={PlaceholderImage} alt="placeholder" />
      <Card.Body>
        <Card.Header>
          <h2>Rubrik</h2>
        </Card.Header>
        <Card.Text>
          <p>
            Amet enim adipiscing congue justo adipiscing sagittis volutpat nibh ac. Integer viverra lectus in quisque.
            In nisl mauris faucibus egestas quis mi nam.
          </p>
        </Card.Text>
      </Card.Body>
    </Card>

    <Card {...args}>
      <Card.Image src={PlaceholderImage} alt="placeholder" />
      <Card.Body>
        <Card.Meta datetime={inputDate}></Card.Meta>
        <Card.Header>
          <h2>Rubrik</h2>
        </Card.Header>
        <Card.Text>
          <p>
            Amet enim adipiscing congue justo adipiscing sagittis volutpat nibh ac. Integer viverra lectus in quisque.
            In nisl mauris faucibus egestas quis mi nam.
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  </CardList>
);
