import { MenuBar } from '@sk-web-gui/menubar';
import { __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React, { useId } from 'react';
import { TabsContext } from './tabs-context';
import { TabsButton } from './tabs-button';
import { TabsItem } from './tabs-item';
import { TabsContent } from './tabs-content';

export interface TabsComponentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  color?: React.ComponentProps<typeof MenuBar>['color'];
  current?: React.ComponentProps<typeof MenuBar>['current'];
  showBackground?: React.ComponentProps<typeof MenuBar>['showBackground'];
  onTabChange?: (index: number) => void;
  tabslistClassName?: string;
  panelsClassName?: string;
}

export const TabsComponent = React.forwardRef<HTMLDivElement, TabsComponentProps>((props, ref) => {
  const {
    className,
    tabslistClassName,
    panelsClassName,
    color,
    current: _current = 0,
    showBackground,
    children,
    id: _id,
    onTabChange,
    ...rest
  } = props;
  const [current, setCurrent] = React.useState<number>(_current);

  React.useEffect(() => {
    setCurrent(_current);
  }, [_current]);

  const handleSetCurrent = (index: number) => {
    if (index !== current) {
      onTabChange && onTabChange(index);
      setCurrent(index);
    }
  };
  const context = {
    current,
    setCurrent: handleSetCurrent,
  };

  const autoId = useId();
  const id = _id || `sk-tabs-${autoId}`;

  const getButtons = (): React.ReactNode => {
    return getValidChildren(children).map((child, index) => {
      const contentComponent = getValidChildren(child.props.children).find((child) => child?.type === TabsContent);
      const buttonComponent = getValidChildren(child.props.children).find((child) => child?.type === TabsButton);
      if (buttonComponent) {
        const newButton = React.cloneElement(buttonComponent, {
          id: buttonComponent.props.id || `${id}-tab-${index}`,
          'aria-controls': contentComponent?.props?.id || `${id}-panel-${index}`,
          menuIndex: index,
          ...buttonComponent.props,
        });
        return <MenuBar.Item key={`button-${index}`}>{newButton}</MenuBar.Item>;
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
          menuIndex: index,
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
        <MenuBar
          className={tabslistClassName}
          color={color}
          current={current}
          showBackground={showBackground}
          role="tablist"
          id={id}
        >
          {getButtons()}
        </MenuBar>
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
