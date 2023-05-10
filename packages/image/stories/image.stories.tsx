import React from 'react';
import { Image } from '../src';

export default {
  title: 'WIP/Komponenter/Bild',
  component: Image,
  tags: ['autodocs'],
};

export const Template = () => (
  <Image alt="Dan Abramov" htmlWidth={100} htmlHeight={100} className="object-cover" src="https://bit.ly/dan-abramov" />
);

Template.storyName = 'Image';
