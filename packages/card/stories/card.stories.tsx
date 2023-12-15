import { Meta } from '@storybook/react';
import PlaceholderImage from '../../../.storybook/public/placeholder_2.png';
import { Card, CardProps, MetaCard } from '../src';
import React from 'react';

export default {
  title: 'Komponenter/Card',
  component: Card,
  tags: ['autodocs'],
} as Meta<typeof Card>;

let inputDate = new Date();

export const Template = (args: CardProps) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
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
  </div>
);

export const Meta_card = () => (
  <div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
      <MetaCard color="mono" href="https://sundsvall.se" useHoverEffect={true}>
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
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem', marginTop: '4rem' }}>
      <MetaCard color="mono" href="https://sundsvall.se" useHoverEffect={true}>
        <MetaCard.Header>
          <h2>Rubrik</h2>
        </MetaCard.Header>
      </MetaCard>
      <MetaCard color="vattjom">
        <MetaCard.Header>
          <h2>Rubrik</h2>
        </MetaCard.Header>
      </MetaCard>
    </div>
  </div>
);
