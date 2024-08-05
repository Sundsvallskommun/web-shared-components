import { Meta } from '@storybook/react';
import { InternalAIModuleHeaderMenuProps } from '../src/components';
import { AIModuleHeaderMenu } from '../src/components/ai-module/ai-module-header-menu';

export default {
  title: 'AI/Komponenter/AIModuleHeaderMenu',
  component: AIModuleHeaderMenu,
  tags: ['autodocs'],
} as Meta<InternalAIModuleHeaderMenuProps>;

export const Template = (args: InternalAIModuleHeaderMenuProps) => {
  return <AIModuleHeaderMenu {...args} />;
};
