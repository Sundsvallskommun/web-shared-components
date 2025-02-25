import { DefaultProps, Dict, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { MenuVerticalItem, MenuVerticalItemProps } from './menu-vertical-item';
import { MenuVerticalSubmenuButton, MenuVerticalSubmenuButtonProps } from './menu-vertical-submenu-button';
import { useMenuVertical } from './use-menu-vertical';
import { MenuItemTypes } from './types';

type IMenuVerticalComponentProps = DefaultProps & {
  rootId?: string;
  menuId?: string;
  parentLiMenuIndex?: number | string | null;
};

export interface MenuVerticalComponentProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'color'>,
    IMenuVerticalComponentProps {}

function extractString(obj: React.ReactNode): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  else if (React.isValidElement<{ children: React.ReactNode }>(obj)) {
    return extractString(obj.props.children);
  } else if (Array.isArray(obj)) {
    const submenuItem = obj.find((obj) => {
      switch (obj?.type) {
        case MenuVerticalSubmenuButton:
          return true;
      }
    });
    return submenuItem ? extractString(submenuItem) : obj.map((e) => extractString(e)).join(' ');
  } else return obj.toString();
}

export const MenuVerticalComponent = React.forwardRef<HTMLUListElement, MenuVerticalComponentProps>((props, ref) => {
  const { className, children, menuId, parentLiMenuIndex = null, ...rest } = props;
  const { rootMenuId, menu, setMenu } = useMenuVertical();
  const [submenuOpen, setSubmenuOpen] = React.useState<boolean>(
    parentLiMenuIndex && parentLiMenuIndex !== rootMenuId ? false : true
  );
  const _menu = menu;

  const { menuItems, submenuItem, _menuId } = React.Children.toArray(children).reduce<
    MenuItemTypes & { _menuId: string }
  >(
    (object, child) => {
      if (React.isValidElement(child) && typeof child?.type !== 'string') {
        switch (child?.type as React.FC) {
          case MenuVerticalSubmenuButton: {
            if (React.isValidElement<MenuVerticalSubmenuButtonProps>(child)) {
              const submenuItem = child;
              const submenuItemInnerText = encodeURIComponent(extractString(submenuItem));
              const _menuId = `${object._menuId}-${submenuItemInnerText}`;
              object.submenuItem = React.cloneElement(child, {
                menuIndex: parentLiMenuIndex ? parentLiMenuIndex : `${object._menuId}`,
                menuId: _menuId,
                parentMenuId: menuId ? menuId : rootMenuId,
                ...child.props,
              });
              object._menuId = _menuId;
            }
            break;
          }
          case MenuVerticalItem: {
            if (React.isValidElement<MenuVerticalItemProps>(child)) {
              const innerText = encodeURIComponent(extractString(child));
              object.menuItems = object.menuItems.concat([
                React.cloneElement<MenuVerticalItemProps & Dict>(child as React.ReactElement<MenuVerticalItemProps>, {
                  menuIndex: child.props.menuIndex ? child.props.menuIndex : `${object._menuId}-${innerText}`,
                  menuId: object._menuId,
                  parentMenuId: child.props.parentMenuId ? child.props.parentMenuId : menuId ? menuId : rootMenuId,
                  'data-menuindex': child.props.menuIndex ? child.props.menuIndex : `${object._menuId}-${innerText}`,
                  'data-menuid': object._menuId,
                  'data-parentmenuid': child.props.parentMenuId
                    ? child.props.parentMenuId
                    : menuId
                      ? menuId
                      : rootMenuId,
                  ...child.props,
                }),
              ]);
            }
            break;
          }
        }
      }

      return object;
    },
    { menuItems: [], submenuItem: undefined, _menuId: !menuId ? `${rootMenuId}` : `${menuId}` }
  );

  _menu[_menuId] = {
    submenuItem: submenuItem,
    menuItems: menuItems.filter((item) => item.props.role !== 'separator'),
    parentMenuId: menuId ? menuId : rootMenuId,
    parentLiMenuIndex: parentLiMenuIndex,
    submenuOpen: submenuOpen,
    setSubmenuOpen: setSubmenuOpen,
  };

  React.useEffect(() => {
    setMenu(_menu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {submenuItem ? <MenuVerticalSubmenuButton {...submenuItem.props} /> : <></>}
      {menuItems?.length > 0 ? (
        <ul
          id={_menuId}
          role="menubar"
          ref={ref}
          className={cx('sk-menu-vertical', className, !menu[_menuId].submenuOpen && 'hide')}
          {...rest}
        >
          {menuItems.map((item) => (
            <MenuVerticalItem key={`${item.props.menuId}-${item.props.menuIndex}`} {...item.props} />
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
});

if (__DEV__) {
  MenuVerticalComponent.displayName = 'MenuVerticalComponent';
}

export default { MenuVerticalComponent };
