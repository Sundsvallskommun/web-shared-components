import { Meta } from '@storybook/react';
import { ProfilePicture, ProfilePictureProps } from '../src/profile-picture';
import React from 'react';

export default {
  title: 'Komponenter/Profil/Komponent/ProfilePicture',
  component: ProfilePicture,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: ProfilePictureProps) => (
  <div className="">
    <ProfilePicture {...args}></ProfilePicture>
  </div>
);

Template.storyName = 'ProfilePicture';
