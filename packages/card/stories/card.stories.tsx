import React from 'react';
import { Card, CardProps } from '../src';
import { CardList } from '../src/card';

import PlaceholderImage from '../../../.storybook/public/placeholder_2.png';

export default {
  title: 'Komponenter/Kort/Komponent',
  component: Card,
  tags: ['autodocs'],
};

export const Template = (args: CardProps) => (
  <CardList>
    <Card {...args}>
      <Card.Image src={PlaceholderImage} alt="placeholder" />
      <Card.Body>
        <Card.Header>
          <h2>Rubrik</h2>
        </Card.Header>
        <Card.Preamble>
          <p>
            Amet enim adipiscing congue justo adipiscing sagittis volutpat nibh ac. Integer viverra lectus in quisque.
            In nisl mauris faucibus egestas quis mi nam.
          </p>
        </Card.Preamble>
      </Card.Body>
    </Card>

    <Card {...args}>
      <Card.Image src={PlaceholderImage} alt="placeholder" />
      <Card.Body>
        <Card.Meta></Card.Meta>
        <Card.Header>
          <Card.Link href="https://sundsvall.se">Rubrik</Card.Link>
        </Card.Header>
        <Card.Preamble>
          <p>
            Amet enim adipiscing congue justo adipiscing sagittis volutpat nibh ac. Integer viverra lectus in quisque.
            In nisl mauris faucibus egestas quis mi nam.
          </p>
        </Card.Preamble>
      </Card.Body>
    </Card>
  </CardList>
);
