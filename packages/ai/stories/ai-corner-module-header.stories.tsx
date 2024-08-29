import { Meta } from '@storybook/react';
import { AICornerModuleHeader } from '../src';
import { AICornerModuleHeaderProps } from '../src/components';
import avatarSrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AICornerModule/Header',
  component: AICornerModuleHeader,
  tags: ['autodocs'],
} as Meta<AICornerModuleHeaderProps>;

export const Template = (args: AICornerModuleHeaderProps) => {
  return (
    <AICornerModuleHeader
      {...args}
      assistant={{ name: 'Qwerty', title: 'Din AI-guide på intranätet', avatar: avatarSrc }}
    >
      Fråga
    </AICornerModuleHeader>
  );
};
