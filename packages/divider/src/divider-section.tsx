import React from 'react';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import { useDividerClass } from './styles';
import Divider, { DividerProps } from './divider';

export interface DividerSectionProps extends DividerProps, DefaultProps {
  /**
   * @default md
   */
  size?: 'sm' | 'md' | 'lg';
  children: string | React.ReactElement;
}

export const DividerSection = React.forwardRef<HTMLDivElement, DividerSectionProps>(
  ({ size = 'md', className, children, ...rest }, ref) => {
    const classes = useDividerClass({ size });
    return (
      <div ref={ref} className={cx('sk-divider-root', className, classes)}>
        <span className="sk-divider-text">{children}</span>
        <Divider {...rest} />
      </div>
    );
  }
);

if (__DEV__) {
  DividerSection.displayName = 'DividerSection';
}

export default DividerSection;
