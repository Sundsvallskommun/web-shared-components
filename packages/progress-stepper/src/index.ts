import { ProgressStepperComponent, ProgressStepperComponentProps } from './progress-stepper';
import { ProgressStepComponent } from './progress-step';
import { ProgressStepLabel } from './progress-step-label';
import { ProgressStepDescription } from './progress-step-description';
import React from 'react';

interface ProgressStepProps extends React.ForwardRefExoticComponent<ProgressStepperComponentProps> {
  Component: typeof ProgressStepComponent;
  Label: typeof ProgressStepLabel;
  Description: typeof ProgressStepDescription;
}

const ProgressStep = {
  ...ProgressStepComponent,
  Component: ProgressStepComponent,
  Label: ProgressStepLabel,
  Description: ProgressStepDescription,
} as ProgressStepProps;

interface ProgressStepperProps extends React.ForwardRefExoticComponent<ProgressStepperComponentProps> {
  Component: typeof ProgressStepperComponent;
  Step: typeof ProgressStep;
}

export const ProgressStepper: ProgressStepperProps = {
  ...ProgressStepperComponent,
  Component: ProgressStepperComponent,
  Step: ProgressStep,
} as ProgressStepperProps;
export type { ProgressStepperProps };
export default ProgressStepper;
