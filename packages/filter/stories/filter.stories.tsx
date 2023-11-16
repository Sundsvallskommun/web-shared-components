import React from 'react';
import { Filter, FilterProps } from '../src';
import { Meta } from '@storybook/react';
import { Badge } from '@sk-web-gui/badge';

export default {
  title: 'Komponenter/Filter',
  component: Filter,
  tags: ['autodocs'],
} as Meta;

export const Template = (props: FilterProps) => (
  <Filter {...props}>
    <Filter.Label>Filteralternativ</Filter.Label>
    <Filter.Item defaultChecked={true}>
      <span>Innehåll</span>
      <Badge color="tertiary" inverted counter={13} />
    </Filter.Item>
    <Filter.Item>
      <span>Bilder</span>
      <Badge color="tertiary" inverted counter={8} />
    </Filter.Item>
    <Filter.Item defaultChecked={true}>
      <span>Artiklar</span>
      <Badge color="tertiary" inverted counter={2} />
    </Filter.Item>
    <Filter.Item>
      <span>Guider</span>
      <Badge color="tertiary" inverted counter={1} />
    </Filter.Item>
    <Filter.Item aria-disabled="true">
      <span>E-tjänster</span>
      <Badge color="tertiary" inverted counter={0} />
    </Filter.Item>
  </Filter>
);

Template.storyName = 'Filter';
