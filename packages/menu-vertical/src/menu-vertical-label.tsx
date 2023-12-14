import React from 'react';
import { Divider, DividerProps } from '@sk-web-gui/divider';
import { DefaultProps, cx } from '@sk-web-gui/utils';

interface MenuVerticalLabelProps extends DefaultProps, React.ComponentProps<DividerProps['Section']> {}

export const MenuVerticalLabel: React.FC<MenuVerticalLabelProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <Divider.Section className={cx('sk-menu-vertical-label', className)} size="lg" {...rest}>
      {children}
    </Divider.Section>
  );
};
