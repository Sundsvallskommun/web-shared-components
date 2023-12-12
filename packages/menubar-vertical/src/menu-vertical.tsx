import { DefaultProps, __DEV__, cx, __REACT_NAME__ } from '@sk-web-gui/utils';
import React, { useState } from 'react';
import { MenuItemTypes, useMenuVertical } from './menu-vertical-context';
import { MenuVerticalItem, MenuVerticalItemProps } from './menu-vertical-item';
import { MenuVerticalSubmenuButton, MenuVerticalSubmenuButtonProps } from './menu-vertical-submenu-button';

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
  else if (React.isValidElement(obj)) {
    return extractString(obj.props.children);
  } else if (Array.isArray(obj)) {
    const submenuItem = obj.find((obj) => {
      switch ((obj?.type as React.FC)[__REACT_NAME__]) {
        case MenuVerticalSubmenuButton[__REACT_NAME__]:
          return true;
      }
    });
    return submenuItem ? extractString(submenuItem) : obj.map((e) => extractString(e)).join(' ');
  } else return obj.toString();
}

export const MenuVerticalComponent = React.forwardRef<HTMLUListElement, MenuVerticalComponentProps>((props, ref) => {
  const { className, children, menuId, parentLiMenuIndex = null, ...rest } = props;
  const { rootMenuId, menu, setMenu } = useMenuVertical();
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(
    parentLiMenuIndex && parentLiMenuIndex !== rootMenuId ? false : true
  );
  const _menu = menu;

  const { menuItems, submenuItem, _menuId } = React.Children.toArray(children).reduce<
    MenuItemTypes & { _menuId: string }
  >(
    (object, child) => {
      if (React.isValidElement(child) && typeof child?.type !== 'string') {
        switch ((child?.type as React.FC)[__REACT_NAME__]) {
          case MenuVerticalSubmenuButton[__REACT_NAME__]:
            const submenuItem = child;
            const submenuItemInnerText = encodeURIComponent(extractString(submenuItem));
            const _menuId = `${object._menuId}-${submenuItemInnerText}`;
            object.submenuItem = React.cloneElement(child as React.ReactElement<MenuVerticalSubmenuButtonProps>, {
              ...child.props,
              menuIndex: child.props.menuIndex
                ? child.props.menuIndex
                : parentLiMenuIndex
                ? parentLiMenuIndex
                : `${object._menuId}`,
              menuId: parentLiMenuIndex && parentLiMenuIndex !== rootMenuId ? parentLiMenuIndex : `${object._menuId}`,
              parentMenuId: menuId ? menuId : rootMenuId,
            });
            object._menuId = _menuId;
            break;
          case MenuVerticalItem[__REACT_NAME__]:
            const innerText = encodeURIComponent(extractString(child));
            object.menuItems.push(
              React.cloneElement(child as React.ReactElement<MenuVerticalItemProps>, {
                ...child.props,
                menuIndex: child.props.menuIndex ? child.props.menuIndex : `${object._menuId}-${innerText}`,
                menuId: object._menuId,
                parentMenuId: child.props.parentMenuId ? child.props.parentMenuId : menuId ? menuId : rootMenuId,
                'data-menuindex': child.props.menuIndex ? child.props.menuIndex : `${object._menuId}-${innerText}`,
                'data-menuid': object._menuId,
                'data-parentmenuid': child.props.parentMenuId ? child.props.parentMenuId : menuId ? menuId : rootMenuId,
              })
            );
            break;
        }
      }

      return object;
    },
    { menuItems: [], submenuItem: undefined, _menuId: !menuId ? `${rootMenuId}` : `${menuId}` }
  );

  _menu[_menuId] = {
    submenuItem: submenuItem,
    menuItems: menuItems,
    parentMenuId: menuId ? menuId : rootMenuId,
    parentLiMenuIndex: parentLiMenuIndex,
    submenuOpen: submenuOpen,
    setSubmenuOpen: setSubmenuOpen,
  };

  React.useEffect(() => {
    setMenu(_menu);
  }, []);

  return (
    <>
      {submenuItem ? <MenuVerticalSubmenuButton {...submenuItem.props} /> : <></>}
      {menuItems.length ? (
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
