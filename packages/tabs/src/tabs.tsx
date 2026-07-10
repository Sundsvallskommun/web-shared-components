import * as RadixTabs from '@radix-ui/react-tabs';
import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { defaultTabsStyle, TabsSize, TabsStyleContext } from './tabs-style-context';

type RadixTabsRootProps = React.ComponentPropsWithoutRef<typeof RadixTabs.Root>;

export interface TabsComponentProps
  extends Omit<RadixTabsRootProps, 'asChild' | 'color' | 'orientation'> {
  /** @default md */
  size?: TabsSize;
  /** @default false */
  underline?: boolean;
  /** @default manual */
  activationMode?: 'automatic' | 'manual';
}

export const TabsComponent = React.forwardRef<HTMLDivElement, TabsComponentProps>((props, ref) => {
  const {
    className,
    size = defaultTabsStyle.size,
    underline = defaultTabsStyle.underline,
    activationMode = 'manual',
    ...rest
  } = props;
  const style = React.useMemo(() => ({ size, underline }), [size, underline]);

  return (
    <TabsStyleContext.Provider value={style}>
      <RadixTabs.Root
        ref={ref}
        orientation="horizontal"
        activationMode={activationMode}
        className={cx('sk-tabs', className)}
        {...rest}
      />
    </TabsStyleContext.Provider>
  );
});

if (__DEV__) {
  TabsComponent.displayName = 'Tabs';
}
