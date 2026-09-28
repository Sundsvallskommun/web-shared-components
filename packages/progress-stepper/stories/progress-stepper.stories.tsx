import React from 'react';
import { Meta } from '@storybook/react-vite';
import { ProgressStepper, ProgressStepperProps } from '../src';

export default {
  title: 'Komponenter/ProgressStepper',
  component: ProgressStepper,
  tags: ['autodocs'],
  args: {
    steps: ['Första steget', 'Andra steget', 'Sista steget'],
    current: 1,
    vertical: false,
    ellipsisLength: 0,
    noWrap: true,
    labelPosition: 'right',
  },
} as Meta<typeof ProgressStepper>;

export const Template = (args: ProgressStepperProps) => (
  <div className="">
    <ProgressStepper {...args}></ProgressStepper>
  </div>
);

Template.storyName = 'ProgressStepper';

export const Clickable = (args: ProgressStepperProps) => {
  const [current, setCurrent] = React.useState<number>(args.current ?? 0);

  return <ProgressStepper {...args} current={current} onStepChange={setCurrent} />;
};

Clickable.storyName = 'Klickbara steg';
Clickable.args = {
  steps: ['Första steget', 'Andra steget', 'Tredje steget', 'Sista steget'],
  current: 1,
};
