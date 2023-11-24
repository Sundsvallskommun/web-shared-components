import React from 'react';
import { Meta } from '@storybook/react';
import { ProgressStepper, ProgressStepperProps } from '../src';

export default {
  title: 'Komponenter/ProgressStepper',
  component: ProgressStepper,
  tags: ['autodocs'],
  args: {
    steps: ['Steg 1', 'Andra steget', 'Sista steget'],
    current: 1,
  },
} as Meta<typeof ProgressStepper>;

export const Template = (args: ProgressStepperProps) => (
  <div className="">
    <ProgressStepper {...args}></ProgressStepper>
  </div>
);

Template.storyName = 'ProgressStepper';
