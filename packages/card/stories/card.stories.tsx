import { Meta } from '@storybook/react';
import React from 'react';
import PlaceholderImage from '../../../.storybook/public/placeholder_2.png';
import { Card, CardList, CardProps, MetaCard } from '../src';
import { CardMetaProps } from '../dist/types';

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

export const Meta_card = () => (
  <div>
    <CardList>
      <MetaCard color="tertiary" href="https://sundsvall.se" useHoverEffect={true}>
        <MetaCard.Header>
          <h2>Rubrik</h2>
        </MetaCard.Header>
        <MetaCard.Text>
          <p>
            Amet enim adipiscing congue justo adipiscing sagittis volutpat nibh ac. Integer viverra lectus in quisque.
            In nisl mauris faucibus egestas quis mi nam.
          </p>
        </MetaCard.Text>
      </MetaCard>
      <MetaCard color="vattjom">
        <MetaCard.Header>
          <h2>Rubrik</h2>
        </MetaCard.Header>
        <MetaCard.Text>
          <p>
            Amet enim adipiscing congue justo adipiscing sagittis volutpat nibh ac. Integer viverra lectus in quisque.
            In nisl mauris faucibus egestas quis mi nam.
          </p>
        </MetaCard.Text>
      </MetaCard>
    </CardList>

    <CardList style={{ marginTop: '2rem' }}>
      <MetaCard color="tertiary" href="https://sundsvall.se" useHoverEffect={true}>
        <MetaCard.Header>
          <h2>Rubrik</h2>
        </MetaCard.Header>
      </MetaCard>
      <MetaCard color="vattjom">
        <MetaCard.Header>
          <h2>Rubrik</h2>
        </MetaCard.Header>
      </MetaCard>
    </CardList>
  </div>
);
