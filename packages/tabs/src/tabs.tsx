import Button from '@sk-web-gui/button';
import MenuBar from '@sk-web-gui/menubar';
import { useMenuBar } from '@sk-web-gui/menubar/dist/types/menubar';
import { cx, getValidChildren } from '@sk-web-gui/utils';
import React, { useId } from 'react';

export interface TabsComponentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  color?: React.ComponentProps<typeof MenuBar>['color'];
  current?: React.ComponentProps<typeof MenuBar>['current'];
  showBackground?: React.ComponentProps<typeof MenuBar>['showBackground'];
}

export const TabsComponent = React.forwardRef<HTMLDivElement, TabsComponentProps>((props, ref) => {
  const { className, color, current, showBackground, children, id: _id, ...rest } = props;

  const autoId = useId();
  const id = _id || `sk-tabs-${autoId}`;

  const getContent = (): React.ReactNode => {
    if (!getValidChildren(children).some((child) => child?.type === TabsItem)) {
      throw Error('No Tabs.Item found! You need at least one tab item.');
    }
    return getValidChildren(children)
      .filter((child) => child?.type === TabsItem)
      .map((child, index) => {
        const contentComponent = getValidChildren(child.props.children).filter(
          (child) => child?.type === TabsContent
        )[0];
        return React.cloneElement(contentComponent, {
          ...contentComponent.props,
          id: contentComponent.props.id || `${id}-tab-${index}`,
        });
      });
  };

  return (
    <div ref={ref} className={cx('sk-tabs', className)} {...rest}>
      <MenuBar color={color} current={current} showBackground={showBackground} role="tablist"></MenuBar>
      <div className="sk-tabs-panel">{getContent()}</div>
    </div>
  );
});

interface TabsItemProps {
  children: React.ReactNode;
}

export const TabsItem: React.FC<TabsItemProps> = ({ children }) => {
  const context = useMenuBar();

  const getContent = () => {
    if (!getValidChildren(children).some((child) => child.type === TabsContent)) {
      throw Error('No Tabs.Content found! Each tabs item needs a content container.');
    }
    return getValidChildren(children).filter((child) => child?.type === TabsContent)[0];
  };
  const getButton = () => {
    if (!getValidChildren(children).some((child) => child.type === TabsButton)) {
      throw Error('No Tabs.Button found! Each tabs item needs a button.');
    }
    const button = getValidChildren(children).filter((child) => child?.type === TabsButton)[0];
    return React.cloneElement(button, {
      ...button.props,
      role: 'tab',
      'aria-current': undefined,
      'aria-selected': button.props.menuIndex === context.current ? 'true' : undefined,
    });
  };

  return (
    <>
      {getButton()}
      {getContent()}
    </>
  );
};

interface TabsButtonProps
  extends React.ComponentProps<typeof MenuBar.Item>,
    Pick<React.ComponentProps<typeof Button>, 'loading' | 'disabled' | 'loadingText' | 'leftIcon' | 'rightIcon'> {}

export const TabsButton = React.forwardRef<HTMLLIElement, TabsButtonProps>((props, ref) => {
  const { children, loading, disabled, loadingText, leftIcon, rightIcon, ...rest } = props;
  return (
    <MenuBar.Item ref={ref} {...rest}>
      <Button
        loading={loading}
        disabled={disabled}
        loadingText={loadingText}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        role="tab"
      >
        {children}
      </Button>
    </MenuBar.Item>
  );
});

export const TabsContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div role="tabpanel" ref={ref} className={cx('sk-tabs-content', className)} {...rest}>
      {children}
    </div>
  );
});
