import React from 'react';
import { __DEV__, cx } from '@sk-web-gui/utils';
import { Divider } from '@sk-web-gui/divider';
import { Icon } from '@sk-web-gui/icon';
import { Check } from 'lucide-react';

interface ProgressStepProps {
  number: number;
  label: string;
  current?: boolean;
  done?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md';
}

export const ProgressStep: React.FC<ProgressStepProps> = (props) => {
  const { number, current, done, label, rounded, size } = props;

  return (
    <div className="sk-progress-stepper-step" data-progress={done ? 'done' : current ? 'current' : undefined}>
      <div className="sk-progress-stepper-step-wrapper">
        <Divider orientation="horizontal" />
        <div
          className={cx('sk-progress-stepper-step-box', `sk-progress-stepper-step-box-${size}`)}
          data-rounded={rounded}
        >
          {done ? <Icon icon={<Check />} /> : number}
        </div>
        <Divider orientation="horizontal" />
      </div>
      <div className="sk-progress-stepper-step-label">{label}</div>
    </div>
  );
};

if (__DEV__) {
  ProgressStep.displayName = 'ProgressStep';
}

export default ProgressStep;
