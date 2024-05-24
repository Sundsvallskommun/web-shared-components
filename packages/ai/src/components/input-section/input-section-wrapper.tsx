import { cx } from '@sk-web-gui/utils';
import React from 'react';

export const InputSectionWrapper = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <div ref={ref} className={cx('sk-ai-inputsection-wrapper', className)} {...rest} />;
  }
);
