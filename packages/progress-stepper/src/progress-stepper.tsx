import { __DEV__, cx, DefaultProps, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { ProgressStepperContext } from './context';

export type StepLabelPosition = 'top' | 'right' | 'bottom' | 'left';

export interface ProgressStepperComponentProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /** Index of current step */
  current?: number;
  rounded?: boolean;
  /** If true, the stepper is displayed vertically */
  vertical?: boolean;
  /** Position of the label in relation to the icon (or number box) */
  labelPosition?: StepLabelPosition;
}

export interface UseProgressStepperProps extends ProgressStepperComponentProps {
  labelPosition?: StepLabelPosition;
  numberOfSteps: number;
  current: number;
  vertical?: boolean;
}

export const ProgressStepperComponent = React.forwardRef<HTMLDivElement, ProgressStepperComponentProps>(
  (props, ref) => {
    const { children, current = 0, className, rounded = false, vertical = false, labelPosition, ...rest } = props;
    const numberOfSteps: number = React.Children.toArray(children).length;
    const context = { labelPosition, numberOfSteps, vertical, current, rounded };
    const autoId = React.useId();

    const getChildren = (): React.ReactNode => {
      return getValidChildren(children).map((child, index) => {
        const childProps = { index: index, rounded, current };
        return React.cloneElement(child, childProps);
      });
    };

    return (
      <ProgressStepperContext.Provider value={context}>
        <div
          ref={ref}
          id={autoId}
          className={cx('sk-progress-stepper', vertical ? 'vertical' : 'horizontal', className)}
          {...rest}
        >
          {getChildren()}
        </div>
      </ProgressStepperContext.Provider>
    );
  }
);

if (__DEV__) {
  ProgressStepperComponent.displayName = 'ProgressStepper';
}

export default ProgressStepperComponent;
