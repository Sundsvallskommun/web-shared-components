import React from 'react';
import { Meta } from '@storybook/react';
import { ProgressStepper, ProgressStepperProps } from '../src';

export default {
  title: 'Komponenter/ProgressStepper',
  component: ProgressStepper.Component,
  tags: ['autodocs'],
  args: {
    current: 1,
    vertical: false,
    labelPosition: 'right',
  },
} as Meta<typeof ProgressStepper.Component>;

export const Template = (args: ProgressStepperProps) => {
  const steps: { label: string; description: string }[] = [
    { label: 'Första steget', description: 'Beskrivning' },
    { label: 'Andra steget', description: 'Beskrivning' },
    { label: 'Tredje steget', description: 'Beskrivning' },
  ];

  return (
    <div className="flex flex-col gap-24">
      <p>
        Progress stepper används för att guida användaren genom olika processer. Komponenten inkluderar vanligtvis en
        serie steg eller faser, var och en representerad som en klickbar knapp. Användaren kan navigera mellan stegen,
        och komponenten markerar visuellt det aktiva steget samt de steg som redan är avklarade.
      </p>
      <ProgressStepper {...args}>
        {steps.map((step) => {
          return (
            <ProgressStepper.Step key={step.label}>
              <ProgressStepper.Step.Label>{step.label}</ProgressStepper.Step.Label>
              <ProgressStepper.Step.Description>{step.description}</ProgressStepper.Step.Description>
            </ProgressStepper.Step>
          );
        })}
      </ProgressStepper>
    </div>
  );
};

Template.storyName = 'ProgressStepper';
