import React from 'react';
import { Spinner } from '../src';

export default {
  title: 'Komponenter/Spinner/Komponent',
  component: Spinner,
  tags: ['autodocs'],
};

export const Template = (args) => (
  <Spinner {...args} />
);

Template.storyName = 'Spinner';