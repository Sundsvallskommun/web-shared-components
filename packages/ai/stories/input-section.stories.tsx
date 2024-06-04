import { Meta } from '@storybook/react';
import { InputSection } from '../src';
import { InputSectionComponentProps } from '../src/components';

export default {
  title: 'AI/Komponenter/InputSection',
  component: InputSection,
  tags: ['autodocs'],
} as Meta<InputSectionComponentProps>;

export const Template = (args: InputSectionComponentProps) => <InputSection {...args} />;
