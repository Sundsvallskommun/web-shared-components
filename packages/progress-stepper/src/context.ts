import React from 'react';
import { StepLabelPosition, UseProgressStepperProps } from './progress-stepper';

export const ProgressStepperContext = React.createContext<UseProgressStepperProps>({
  numberOfSteps: 0,
  current: 0,
});

const useProgressStepperContext = () => React.useContext(ProgressStepperContext);

interface UseProgressStepperData extends UseProgressStepperProps {
  labelPosition?: StepLabelPosition;
  numberOfSteps: number;
  current: number;
  vertical?: boolean;
}

export const useProgressStepper = (): UseProgressStepperData => {
  const context = useProgressStepperContext();

  return { ...context };
};
