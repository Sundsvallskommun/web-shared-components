import { Meta } from '@storybook/react';
import { AssistantInfo, AssistantSwitch } from '../src';
import { type AssistantSwitchProps } from '../src/components';
import avatarSrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AssistantSwitch',
  component: AssistantSwitch,
  tags: ['autodocs'],
} as Meta<AssistantSwitchProps>;

const assistant: AssistantInfo = {
  name: 'Qwerty',
  title: 'Din AI-guide på intranätet',
  avatar: avatarSrc,
  description:
    'Din personliga AI-guide på intranätet. Svarar med glädje på frågor som rör din anställning på Sundsvalls Kommun.',
};

export const Template = (args: AssistantSwitchProps) => {
  return <AssistantSwitch {...args} assistant={assistant}></AssistantSwitch>;
};
