import { Profile, ProfileProps } from '../../profile/src/profile';
import React from 'react';

export default {
  title: 'WIP/Komponenter/Profil/Profil',
  component: Profile,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: ProfileProps) => (
  <div className="">
    <Profile {...args}></Profile>
  </div>
);

Template.argTypes = {
  title: {
    type: { name: 'string', required: false },
    description: 'Title',
    control: 'text',
    defaultValue: 'Title',
  },
  subTitle: {
    type: { name: 'string', required: false },
    description: 'Professional title',
    control: 'text',
    defaultValue: 'Subtitle',
  },
  image: {
    type: { name: 'string', required: false },
    description: 'Url for image',
    control: 'text',
    defaultValue: '',
  },
  imageAlt: {
    type: { name: 'string', required: false },
    description: 'Alt text for image',
    control: 'text',
    defaultValue: '',
  },
  placeholderImage: {
    type: { name: 'string', required: false },
    description: 'Url for placeholder image',
    control: 'text',
    defaultValue: '',
  },
  minimal: {
    type: { name: 'boolean', required: false },
    description: 'Set true to use truncate titles',
    table: {
      defaultValue: { summary: false },
    },
    options: [false, true],
    control: 'boolean',
    defaultValue: true,
  },
};

Template.storyName = 'Profile';
