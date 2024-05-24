import { Meta } from '@storybook/react';
import React from 'react';
import { AssistantPresentation } from '../src';
import avatarSrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AssistantPresentation',
  component: AssistantPresentation,
  tags: ['autodocs'],
} as Meta<typeof AssistantPresentation>;

export const Template = (args: typeof AssistantPresentation) => (
  <AssistantPresentation
    assistant={{ name: 'Qwerty', title: 'Din AI-guide på intranätet', avatar: avatarSrc }}
    {...args}
  >
    Fråga
  </AssistantPresentation>
);
