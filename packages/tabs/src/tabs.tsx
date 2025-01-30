import { __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { defaultTabsContext, TabsContext, TabsContextProps } from './context';
import { TabsButton } from './tabs-button';
import { TabsContent } from './tabs-content';
import { TabsItem } from './tabs-item';

export interface TabsComponentProps
  extends Partial<Pick<TabsContextProps, 'color' | 'current'>>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  onTabChange?: (index: number) => void;
  tabslistClassName?: string;
  panelsClassName?: string;
  /** @default md */
  size?: 'sm' | 'md' | 'lg';
  /** @default false */
  underline?: boolean;
}

export const TabsComponent = React.forwardRef<HTMLDivElement, TabsComponentProps>((props, ref) => {
  const {
    className,
    tabslistClassName,
    panelsClassName,
    color = defaultTabsContext.color,
    current: _current = defaultTabsContext.current,
    children,
    id: _id,
    onTabChange,
    size = 'md',
    underline = false,
    ...rest
  } = props;
  const [current, setCurrent] = React.useState<number>(_current);
  const [active, setActive] = React.useState<number>(_current || 0);
  const [mounted, setMounted] = React.useState<boolean>(false);
  const autoId = React.useId();
  const id = _id || `sk-tabs-${autoId}`;

  const total = React.Children.count(children);

  React.useEffect(() => {
    if (mounted) {
      handleSetCurrent(_current);
    } else {
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_current]);

  const handleSetCurrent = (index: number) => {
    setCurrent(index);
    setActive(index || 0);
    onTabChange?.(index);
  };

  const next = () => {
    if (active === total - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active === 0) {
      setActive(total - 1);
    } else {
      setActive(active - 1);
    }
  };

  const context = {
    next,
    prev,
    current,
    setCurrent: handleSetCurrent,
    color,
    active,
  };

  const getButtons = (): React.ReactNode => {
    return getValidChildren(children).map((child, index) => {
      const contentComponent = getValidChildren(child.props.children).find((child) => child?.type === TabsContent);
      const buttonComponent = getValidChildren(child.props.children).find((child) => child?.type === TabsButton);
      if (buttonComponent) {
        return React.cloneElement(buttonComponent, {
          key: `button-${index}`,
          id: buttonComponent.props.id || `${id}-tab-${index}`,
          'aria-controls': contentComponent?.props?.id || `${id}-panel-${index}`,
          menuIndex: index,
          size: size,
          ...buttonComponent.props,
        });
      } else {
        throw Error('No <Tabs.Button> found! Each <Tabs.Item> needs a button.');
      }
    });
  };

  const getContent = (): React.ReactNode => {
    if (!getValidChildren(children).some((child) => child?.type === TabsItem)) {
      throw Error('No <Tabs.Item> found! You need at least one tab item.');
    }

    return getValidChildren(children).map((child, index) => {
      const contentComponent = getValidChildren(child.props.children).find((child) => child?.type === TabsContent);
      const buttonComponent = getValidChildren(child.props.children).find((child) => child?.type === TabsButton);
      if (contentComponent) {
        const newContent = React.cloneElement(contentComponent, {
          ...contentComponent?.props,
          key: `panel-${index}`,
          selected: current === index,
          id: contentComponent?.props?.id || `${id}-panel-${index}`,
          'aria-labelledby': buttonComponent?.props?.id || `${id}-tab-${index}`,
        });
        return newContent;
      } else {
        throw Error('No <Tabs.Content> found! Each <Tabs.Item> needs content.');
      }
    });
  };

  return (
    <TabsContext.Provider value={context}>
      <div ref={ref} className={cx('sk-tabs', className)} {...rest}>
        <ul
          className={cx('sk-tabs-list', tabslistClassName)}
          data-size={size}
          data-color={color}
          data-underline={underline ? underline : underline}
          role="tablist"
          id={id}
        >
          {getButtons()}
        </ul>
        <div ref={ref} className={cx('sk-tabs-panels', panelsClassName)} {...rest}>
          {getContent()}
        </div>
      </div>
    </TabsContext.Provider>
  );
});

if (__DEV__) {
  TabsComponent.displayName = 'Tabs';
}
