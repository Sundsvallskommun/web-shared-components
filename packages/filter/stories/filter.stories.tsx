import React from 'react';
import { Filter, FilterProps } from '../src';
import { Meta } from '@storybook/react-vite';
import { Badge } from '@sk-web-gui/badge';

export default {
  title: 'Komponenter/Filter',
  component: Filter,
  tags: ['autodocs'],
} as Meta;

export const Template = (props: FilterProps) => (
  <Filter {...props} defaultValue={['content', 'articles']}>
    <Filter.Label>Filteralternativ</Filter.Label>
    <Filter.Item value="content">
      <span>Innehåll</span>
      <Badge color="tertiary" inverted counter={13} />
    </Filter.Item>
    <Filter.Item value="images">
      <span>Bilder</span>
      <Badge color="tertiary" inverted counter={8} />
    </Filter.Item>
    <Filter.Item value="articles">
      <span>Artiklar</span>
      <Badge color="tertiary" inverted counter={2} />
    </Filter.Item>
    <Filter.Item value="guides">
      <span>Guider</span>
      <Badge color="tertiary" inverted counter={1} />
    </Filter.Item>
    <Filter.Item value="services" aria-disabled="true">
      <span>E-tjänster</span>
      <Badge color="tertiary" inverted counter={0} />
    </Filter.Item>
  </Filter>
);

Template.storyName = 'Filter';
