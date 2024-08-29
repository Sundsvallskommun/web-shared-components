import { Meta } from '@storybook/react';
import { InternalAICornerModuleHeaderMenuProps } from '../src/components';
import { AICornerModuleHeaderMenu } from '../src/components/ai-corner-module/ai-corner-module-header-menu';

export default {
  title: 'AI/Komponenter/AICornerModule/HeaderMenu',
  component: AICornerModuleHeaderMenu,
  tags: ['autodocs'],
} as Meta<InternalAICornerModuleHeaderMenuProps>;

export const Template = (args: InternalAICornerModuleHeaderMenuProps) => {
  return <AICornerModuleHeaderMenu {...args} />;
};
