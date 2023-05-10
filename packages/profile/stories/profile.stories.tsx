import { Meta } from '@storybook/react';
import { Profile, ProfileProps } from '../../profile/src/profile';
import React from 'react';

export default {
  title: 'Komponenter/Profil/Komponent',
  component: Profile,
  tags: ['autodocs'],
  args: {
    title: 'Title',
    subTitle: 'Subtitle',
  },
} as Meta;

export const Template = (args: ProfileProps) => (
  <div className="">
    <Profile {...args}></Profile>
  </div>
);

Template.storyName = 'Profile';
