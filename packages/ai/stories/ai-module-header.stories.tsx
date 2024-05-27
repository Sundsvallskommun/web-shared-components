import { Meta } from '@storybook/react';
import React from 'react';
import { AIModuleHeader } from '../src';
import { AIModuleHeaderProps } from '../src/components';
import avatarSrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AIModuleHeader',
  component: AIModuleHeader,
  tags: ['autodocs'],
} as Meta<AIModuleHeaderProps>;

export const Template = (args: AIModuleHeaderProps) => {
  return (
    <AIModuleHeader {...args} assistant={{ name: 'Qwerty', title: 'Din AI-guide på intranätet', avatar: avatarSrc }}>
      Fråga
    </AIModuleHeader>
  );
};
