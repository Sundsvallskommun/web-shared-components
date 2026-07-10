import * as RadixTabs from '@radix-ui/react-tabs';
import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useTabsStyle } from './tabs-style-context';

type RadixTabsListProps = React.ComponentPropsWithoutRef<typeof RadixTabs.List>;

export type TabsListProps = Omit<RadixTabsListProps, 'asChild' | 'color'>;

export const TabsList = React.forwardRef<HTMLUListElement, TabsListProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const style = useTabsStyle();

  return (
    <RadixTabs.List asChild {...rest}>
      <ul
        ref={ref}
        className={cx('sk-tabs-list', className)}
        data-color={style.color}
        data-size={style.size}
        data-underline={style.underline}
      >
        {children}
      </ul>
    </RadixTabs.List>
  );
});

if (__DEV__) {
  TabsList.displayName = 'Tabs.List';
}
