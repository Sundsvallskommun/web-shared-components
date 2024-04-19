import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import { Divider } from '@sk-web-gui/divider';
import React from 'react';
import { ProgressStep } from './progress-step';

export interface ProgressStepperProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /** Array of labels */
  steps: string[];
  /** Index of current step */
  current?: number;
  rounded?: boolean;
  size?: 'sm' | 'md';
}

export const ProgressStepper = React.forwardRef<HTMLDivElement, ProgressStepperProps>((props, ref) => {
  const { steps, current = 0, className, rounded = false, size = 'md', ...rest } = props;
  const last = steps.length - 1;
  return (
    <div ref={ref} className={cx('sk-progress-stepper', className)} {...rest}>
      {steps.map((step, index) => (
        <React.Fragment key={`sk-step-${index}`}>
          <ProgressStep
            label={step}
            number={index + 1}
            current={index === current}
            done={index < current}
            last={index === last}
            first={index === 0}
            rounded={rounded}
            size={size}
          />
          {index !== last && <Divider orientation="horizontal" />}
        </React.Fragment>
      ))}
    </div>
  );
});

if (__DEV__) {
  ProgressStepper.displayName = 'ProgressStepper';
}

export default ProgressStepper;
