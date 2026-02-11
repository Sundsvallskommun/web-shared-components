import React from 'react';
import { __DEV__, cx } from '@sk-web-gui/utils';
import { Divider } from '@sk-web-gui/divider';
import Icon from '@sk-web-gui/icon';
import { Check } from 'lucide-react';
import { StepLabelPosition } from './progress-stepper';
import { useProgressStepper } from './context';

export interface ProgressStepProps {
  children: React.ReactNode;
  index: number;
}

export const ProgressStepComponent = React.forwardRef<HTMLDivElement, ProgressStepProps>((props, ref) => {
  const { children, index } = props;
  const { numberOfSteps, labelPosition, vertical, current, rounded } = useProgressStepper();
  const defaultClass = 'sk-progress-stepper-step';
  const done = current > index;
  const stepIndex = index + 1;

  const labelPositionMap: Record<StepLabelPosition, string> = {
    top: `${defaultClass}-wrapper-top`,
    right: `${defaultClass}-wrapper-right`,
    bottom: `${defaultClass}-wrapper-bottom`,
    left: `${defaultClass}-wrapper-left`,
  };

  const getLabelPositionValue = (pos?: StepLabelPosition): string => labelPositionMap[pos ?? 'right'];

  return (
    <div
      ref={ref}
      className={cx(
        defaultClass,
        vertical ? `${defaultClass}-vertical` : `${defaultClass}-horizontal`,
        stepIndex < numberOfSteps ? `${defaultClass}-grow` : `${defaultClass}-grow-0`
      )}
      data-progress={done ? 'done' : index === current ? 'current' : undefined}
    >
      <div className={cx(`${defaultClass}-wrapper`, getLabelPositionValue(labelPosition))}>
        <div className={cx(`${defaultClass}-box`)} data-rounded={rounded}>
          {done ? <Icon className={cx(`${defaultClass}-box-icon`)} icon={<Check />} /> : stepIndex}
        </div>
        <div className={cx(`${defaultClass}-text-wrapper ${labelPosition}`, vertical ? 'vertical' : 'horizontal')}>
          {children}
        </div>
      </div>

      {stepIndex < numberOfSteps && (
        <div className={cx(`${defaultClass}-divider ${labelPosition}`, vertical ? 'vertical' : 'horizontal')}>
          <Divider orientation={vertical ? 'vertical' : 'horizontal'} />
        </div>
      )}
    </div>
  );
});

if (__DEV__) {
  ProgressStepComponent.displayName = 'ProgressStep';
}

export default ProgressStepComponent;
