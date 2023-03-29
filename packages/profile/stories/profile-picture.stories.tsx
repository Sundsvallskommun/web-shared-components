import { ProfilePicture, ProfilePictureProps } from '../src/profile-picture';
import React from 'react';

export default {
  title: 'Komponenter/Profil/Komponent/ProfilePicture',
  component: ProfilePicture,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: ProfilePictureProps) => (
  <div className="">
    <ProfilePicture {...args}></ProfilePicture>
  </div>
);

Template.argTypes = {
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
};

Template.storyName = 'ProfilePicture';
