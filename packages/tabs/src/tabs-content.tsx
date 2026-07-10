import * as RadixTabs from '@radix-ui/react-tabs';
import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

type RadixTabsContentProps = React.ComponentPropsWithoutRef<typeof RadixTabs.Content>;

export type TabsContentProps = Omit<RadixTabsContentProps, 'asChild'>;

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <RadixTabs.Content
      ref={ref}
      className={cx('sk-tabs-content', className)}
      {...rest}
    />
  );
});

if (__DEV__) {
  TabsContent.displayName = 'Tabs.Content';
}
