import { Meta } from '@storybook/react';
import React from 'react';
import { AIModule } from '../src';
import { AIModuleProps } from '../src/components';
import avatarSrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AIModule',
  component: AIModule,
  tags: ['autodocs'],
} as Meta<AIModuleProps>;

export const Template = (args: AIModuleProps) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIModule {...args} assistant={{ name: 'Qwerty', title: 'Din AI-guide på intranätet', avatar: avatarSrc }}>
        Fråga
      </AIModule>
    </div>
  );
};
