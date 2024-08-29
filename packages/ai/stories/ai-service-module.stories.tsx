import { Meta } from '@storybook/react';
import { AIServiceModule, AIServiceModuleProps } from '../src/components';
import React from 'react';

export default {
  title: 'AI/Komponenter/AIServiceModule',
  component: AIServiceModule,
  tags: ['autodocs'],
} as Meta<AIServiceModuleProps>;

export const Template = (args: AIServiceModuleProps) => <AIServiceModule {...args}>Fråga</AIServiceModule>;
