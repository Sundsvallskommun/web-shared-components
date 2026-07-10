import * as RadixTabs from '@radix-ui/react-tabs';
import Button from '@sk-web-gui/button';
import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useTabsStyle } from './tabs-style-context';

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

export interface TabsTriggerProps extends Omit<ButtonProps, 'as' | 'color' | 'size' | 'value' | 'variant'> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>((props, ref) => {
  const {
    value,
    className,
    children,
    disabled: disabledProp,
    'aria-disabled': ariaDisabled = false,
    ...rest
  } = props;
  const { color, size } = useTabsStyle();
  const disabled = disabledProp || ariaDisabled === true || ariaDisabled === 'true';

  return (
    <li
      data-color={color}
      data-size={size}
      className="sk-tabs-list-item"
      role="presentation"
    >
      <RadixTabs.Trigger value={value} disabled={disabled} asChild>
        <Button
          ref={ref}
          className={cx('sk-tabs-list-item-button', className)}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          size={size}
          {...rest}
          variant="ghost"
        >
          <span>{children}</span>
        </Button>
      </RadixTabs.Trigger>
      <div className="sk-tabs-list-item-divider" />
    </li>
  );
});

if (__DEV__) {
  TabsTrigger.displayName = 'Tabs.Trigger';
}
