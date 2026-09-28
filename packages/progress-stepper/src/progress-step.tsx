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
  /** If set, the step is rendered as a button that calls this function when clicked */
  onClick?: () => void;
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
    onClick,
  } = props;

  const defaultClass = 'sk-progress-stepper-step';
  const showEllipsis = ellipsisLength > 0 && label.length >= ellipsisLength;
  const renderedLabel = showEllipsis ? `${label.slice(0, ellipsisLength).trim()}...` : label;

  const labelPositionMap: Record<StepLabelPosition, string> = {
    top: `${defaultClass}-wrapper-top`,
    right: `${defaultClass}-wrapper-right`,
    bottom: `${defaultClass}-wrapper-bottom`,
    left: `${defaultClass}-wrapper-left`,
  };

  const getLabelPositionValue = (pos?: StepLabelPosition): string => labelPositionMap[pos ?? 'right'];

  const wrapperClassName = cx(`${defaultClass}-wrapper`, getLabelPositionValue(labelPosition), {
    [`${defaultClass}-wrapper-clickable`]: !!onClick,
  });
  const ariaCurrent = current ? 'step' : undefined;

  const wrapperContent = (
    <>
      <span className={cx(`${defaultClass}-box`, size)} data-rounded={rounded}>
        {done ? <Icon className={cx(`${defaultClass}-box-icon`, `${size}`)} icon={<Check />} /> : number}
      </span>
      <span className={`${defaultClass}-label`}>{renderedLabel}</span>
    </>
  );

  return (
    <div
      className={cx(
        defaultClass,
        vertical ? `${defaultClass}-vertical` : `${defaultClass}-horizontal`,
        numberOfSteps !== number ? `${defaultClass}-grow` : `${defaultClass}-grow-0`
      )}
      data-progress={done ? 'done' : current ? 'current' : undefined}
      data-white-space={noWrap ? 'no-wrap' : 'normal'}
    >
      {onClick ? (
        <button type="button" className={wrapperClassName} onClick={onClick} aria-current={ariaCurrent}>
          {wrapperContent}
        </button>
      ) : (
        <div className={wrapperClassName} aria-current={ariaCurrent}>
          {wrapperContent}
        </div>
      )}
      {numberOfSteps !== number && (
        <div className={cx(`${defaultClass}-divider`, vertical ? 'vertical' : 'horizontal')}>
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
