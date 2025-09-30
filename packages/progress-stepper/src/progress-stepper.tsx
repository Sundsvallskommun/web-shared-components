import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { ProgressStep } from './progress-step';

export type StepLabelPosition = 'top' | 'right' | 'bottom' | 'left';

export interface ProgressStepperProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /** Array of labels */
  steps: string[];
  /** Index of current step */
  current?: number;
  rounded?: boolean;
  size?: 'sm' | 'md';
  /** If true, the stepper is displayed vertically */
  vertical?: boolean;
  /** If greater than 0, the given number will set the length of each label */
  ellipsisLength?: number;
  /** True by default. Displays the label on a single row */
  noWrap?: boolean;
  /** Position of the label in relation to the icon (or number box) */
  labelPosition: StepLabelPosition;
}

export const ProgressStepper = React.forwardRef<HTMLDivElement, ProgressStepperProps>((props, ref) => {
  const {
    steps,
    current = 0,
    className,
    rounded = false,
    size = 'md',
    vertical = false,
    ellipsisLength = 0,
    noWrap = true,
    labelPosition = 'right',
    ...rest
  } = props;
  return (
    <div ref={ref} className={cx('sk-progress-stepper', vertical ? 'vertical' : 'horizontal', className)} {...rest}>
      {steps.map((step, index) => (
        <React.Fragment key={`sk-step-${index}`}>
          <ProgressStep
            label={step}
            number={index + 1}
            numberOfSteps={steps.length}
            current={index === current}
            done={index < current}
            rounded={rounded}
            size={size}
            ellipsisLength={ellipsisLength}
            noWrap={noWrap}
            vertical={vertical}
            labelPosition={labelPosition}
          />
        </React.Fragment>
      ))}
    </div>
  );
});

if (__DEV__) {
  ProgressStepper.displayName = 'ProgressStepper';
}

export default ProgressStepper;
