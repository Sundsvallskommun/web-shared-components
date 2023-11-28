import React from 'react';
import { Image } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Image',
  component: Image,
  tags: ['autodocs'],
} as Meta<typeof Image>;

export const Template = () => (
  <Image alt="Dan Abramov" htmlWidth={100} htmlHeight={100} className="object-cover" src="https://bit.ly/dan-abramov" />
);

Template.storyName = 'Image';
