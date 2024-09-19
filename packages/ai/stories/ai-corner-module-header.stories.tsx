import { Meta } from '@storybook/react';
import { AICornerModuleHeader, Assistant } from '../src';
import { AICornerModuleHeaderProps } from '../src/components';
import paragrafSrc from './images/paragrafryttaren.png';
import qwertySrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AICornerModule/Header',
  component: AICornerModuleHeader,
  tags: ['autodocs'],
} as Meta<AICornerModuleHeaderProps>;

const qwerty: Assistant = {
  settings: { assistantId: '12345' },
  info: { name: 'Qwerty', title: 'Din AI-guide på intranätet', avatar: qwertySrc },
};
const paragrafryttaren: Assistant = {
  settings: { assistantId: '2345' },
  info: {
    name: 'Paragrafryttaren',
    title: 'Din AI-guide på intranätet',
    avatar: paragrafSrc,
  },
};
export const Template = (args: AICornerModuleHeaderProps) => {
  return (
    <AICornerModuleHeader {...args} assistant={qwerty.info} assistants={[qwerty, paragrafryttaren]}>
      Fråga
    </AICornerModuleHeader>
  );
};
