import React from 'react';
import { Divider, DividerSectionProps } from '@sk-web-gui/divider';
import { cx } from '@sk-web-gui/utils';

export const MenuVerticalLabel: React.FC<DividerSectionProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <Divider.Section className={cx('sk-menu-vertical-label', className)} size="lg" {...rest}>
      {children}
    </Divider.Section>
  );
};
