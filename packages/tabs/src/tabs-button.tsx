import { Button } from '@sk-web-gui/button';
import React from 'react';
import { useTabs } from './tabs-context';
import { __DEV__ } from '@sk-web-gui/utils';

interface TabsButtonProps
  extends React.ComponentProps<typeof Button>,
    Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {
  menuIndex?: number;
}

export const TabsButton = React.forwardRef<HTMLButtonElement, TabsButtonProps>((props, ref) => {
  const { current, setCurrent } = useTabs();
  const { children, menuIndex, ...rest } = props;

  return (
    <Button
      ref={ref}
      onClick={() => setCurrent && menuIndex !== undefined && setCurrent(menuIndex)}
      {...rest}
      role="tab"
      aria-current={undefined}
      aria-selected={menuIndex === current}
    >
      {children}
    </Button>
  );
});
if (__DEV__) {
  TabsButton.displayName = 'TabsButton';
}
