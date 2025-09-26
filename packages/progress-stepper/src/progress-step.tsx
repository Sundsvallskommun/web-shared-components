import React from 'react';
import { __DEV__, cx } from '@sk-web-gui/utils';
import { Divider } from '@sk-web-gui/divider';
import Icon from '@sk-web-gui/icon';
import { Check } from 'lucide-react';
import { StepLabelPosition } from './progress-stepper';

interface ProgressStepProps {
  number: number;
  numberOfSteps: number;
  label: string;
  current?: boolean;
  done?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md';
  ellipsisLength?: number;
  vertical?: boolean;
  noWrap?: boolean;
  labelPosition: StepLabelPosition;
}

export const ProgressStep: React.FC<ProgressStepProps> = (props) => {
  const {
    number,
    numberOfSteps,
    current,
    done,
    label,
    rounded,
    size,
    ellipsisLength = 0,
    vertical = false,
    noWrap = true,
    labelPosition = 'right',
  } = props;

  const showEllipsis = ellipsisLength > 0 && label.length >= ellipsisLength;
  const renderedLabel = showEllipsis ? `${label.slice(0, ellipsisLength).trim()}...` : label;

  const labelPositionMap: Record<StepLabelPosition, string> = {
    top: 'flex-col-reverse',
    right: 'flex-row',
    bottom: 'flex-col',
    left: 'flex-row-reverse',
  };

  const getLabelPositionValue = (pos?: StepLabelPosition): string => labelPositionMap[pos ?? 'right'];

  return (
    <div
      className={cx(
        'sk-progress-stepper-step',
        vertical ? 'flex-col' : 'flex-row gap-16',
        numberOfSteps !== number ? 'grow' : 'grow-0'
      )}
      data-progress={done ? 'done' : current ? 'current' : undefined}
      data-white-space={noWrap ? 'no-wrap' : 'normal'}
    >
      <div className={cx('sk-progress-stepper-step-wrapper', getLabelPositionValue(labelPosition))}>
        <div
          className={cx('sk-progress-stepper-step-box', `sk-progress-stepper-step-box-${size}`)}
          data-rounded={rounded}
        >
          {done ? (
            <Icon
              className={cx('sk-progress-stepper-step-box-icon', `sk-progress-stepper-step-box-icon-${size}`)}
              icon={<Check />}
            />
          ) : (
            number
          )}
        </div>
        <p>{renderedLabel}</p>
      </div>
      {numberOfSteps !== number && (
        <div className={vertical ? 'w-auto' : 'w-full min-w-12'}>
          <Divider orientation={vertical ? 'vertical' : 'horizontal'} />
        </div>
      )}
    </div>
  );
};

if (__DEV__) {
  ProgressStep.displayName = 'ProgressStep';
}

export default ProgressStep;
