import MenuBar from '@sk-web-gui/menubar/dist/types';
import Button from '@sk-web-gui/button';
import { ButtonProps } from '@sk-web-gui/button/dist/types/button';
import { MenuBarComponentProps } from '@sk-web-gui/menubar/dist/types/menubar';
import { MenuBarItemProps } from '@sk-web-gui/menubar/src/menubar-item';
import { cx, getValidChildren } from '@sk-web-gui/utils';
import React, { useId } from 'react';

interface TabsProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'color'>,
    Pick<MenuBarComponentProps, 'color' | 'current' | 'showBackground'> {}

const TabsComponent = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const { className, color, current, showBackground, children, id: _id, ...rest } = props;

  const autoId = useId();
  const id = _id || `sk-tabs-${autoId}`;

  const getChildren = (): React.ReactNode => {
    if (!getValidChildren(children).some((child) => child.type === TabsItem)) {
      throw Error('No Tabs.Item found! You need at least one tab item.');
    }
    return getValidChildren(children).map((child, index) => {});
  };

  return (
    <div ref={ref} className={cx('sk-tabs', className)} {...rest}>
      <MenuBar color={color} current={current} showBackground={showBackground}></MenuBar>
    </div>
  );
});

interface TabsItemProps {
  children: React.ReactNode;
}

const TabsItem: React.FC<TabsItemProps> = ({ children }) => {
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
    return getValidChildren(children).filter((child) => child?.type === TabsButton)[0];
  };

  return (
    <>
      {getButton()}
      {getContent()}
    </>
  );
};

interface TabsButtonProps
  extends MenuBarItemProps,
    Pick<ButtonProps, 'loading' | 'disabled' | 'loadingText' | 'leftIcon' | 'rightIcon'> {}

const TabsButton = React.forwardRef<HTMLLIElement, TabsButtonProps>((props, ref) => {
  const { children, loading, disabled, loadingText, leftIcon, rightIcon, ...rest } = props;
  return (
    <MenuBar.Item ref={ref} {...rest}>
      <Button loading={loading} disabled={disabled} loadingText={loadingText} leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Button>
    </MenuBar.Item>
  );
});

const TabsContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div ref={ref} className={cx('sk-tabs-content', className)} {...rest}>
      {children}
    </div>
  );
});
