import { Meta } from '@storybook/react';
import React from 'react';
import { MetaCardProps, MetaCard } from '../src';

export default {
  title: 'Komponenter/Card/MetaCard',
  component: MetaCard,
  tags: ['autodocs'],
} as Meta<typeof MetaCard>;

export const Template = (args: MetaCardProps) => (
  <div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
      <MetaCard {...args}>
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
      <MetaCard {...args}>
        <MetaCard.Header>
          <h2>Rubrik</h2>
        </MetaCard.Header>
      </MetaCard>
    </div>
  </div>
);
