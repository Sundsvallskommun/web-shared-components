import { Meta } from '@storybook/react';
import { AssistantPresentation } from '../src';
import { AssistantPresentationProps } from '../src/components';
import avatarSrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AssistantPresentation',
  component: AssistantPresentation,
  tags: ['autodocs'],
} as Meta<AssistantPresentationProps>;

export const Template = (args: AssistantPresentationProps) => (
  <AssistantPresentation
    {...args}
    assistant={{
      name: 'Qwerty',
      title: 'Din AI-guide på intranätet',
      avatar: avatarSrc,
      description:
        'Din personliga AI-guide på intranätet. Svarar med glädje på frågor som rör din anställning på Sundsvalls Kommun.',
    }}
  >
    Fråga
  </AssistantPresentation>
);
