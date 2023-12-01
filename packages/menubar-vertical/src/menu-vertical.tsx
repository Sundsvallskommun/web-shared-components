import { DefaultProps, cx } from '@sk-web-gui/utils';
import React, { useState } from 'react';
import { MenuVerticalItem } from './menu-vertical-item';
import { MenuVerticalSubmenuButton } from './menu-vertical-submenu-button';

interface UseMenuVerticalProps {
  //** Index of current menuoption */
  current?: number;
}

export interface MenuItemTypes {
  menuId: string;
  submenuItem?: React.ReactElement;
  menuItems: React.ReactElement[];
}

interface MenuTypes extends MenuItemTypes {
  parentMenuId: string;
  parentLiMenuIndex: number | null;
  active: number | null;
  setActive: React.Dispatch<React.SetStateAction<number | null>>;
  current: number | null;
  setCurrent?: (menuIndex: number | null) => void;
  submenuOpen: boolean;
  setSubmenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  next?: () => void;
  prev?: () => void;
}

interface Tree {
  [id: string]: MenuTypes;
}

interface UseMenuVerticalData extends UseMenuVerticalProps {
  tree: Tree;
  rootId: string;
  // currentMenuId: string; // <-- these to control current instead
  // currentMenuIndex: number; // <--
  // active?: number | null;
  // setActive?: React.Dispatch<React.SetStateAction<number | null>>;
  // current?: number | null;
  // setCurrent?: (menuIndex: number | null) => void;
  // same with active?
  // next?: (currentItemMenuId: string) => void;
  // prev?: (currentItemMenuId: string) => void;
  // active?: string;
  // setActive?: React.Dispatch<React.SetStateAction<string>>;
  // setCurrent?: (currentItemMenuId: string) => void;
  // submenuOpen?: boolean;
  // setSubmenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

type IMenuVerticalComponentProps = DefaultProps &
  UseMenuVerticalProps & {
    rootId?: string;
    menuId?: string;
    parentLiMenuIndex: number | null;
  };

const MenuVerticalContext = React.createContext<UseMenuVerticalData>({ tree: {}, rootId: '' });

export const useMenuVertical = () => React.useContext(MenuVerticalContext);

export interface MenuVerticalComponentProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'color'>,
    IMenuVerticalComponentProps {}

function extractString(obj: React.ReactNode): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  else if (React.isValidElement(obj)) {
    return extractString(obj.props.children);
  } else if (Array.isArray(obj)) {
    return obj.map((e) => extractString(e)).join(' ');
  } else return obj.toString();
}

export const MenuVerticalComponent = React.forwardRef<HTMLUListElement, MenuVerticalComponentProps>((props, ref) => {
  const {
    className,
    children,
    rootId = `sk-menu-vertical-root`,
    menuId: _menuId = rootId,
    current: _current = null,
    parentLiMenuIndex = null,
    ...rest
  } = props;
  const { tree } = useMenuVertical();
  const [current, setCurrent] = useState<number | null>(_current);
  const [active, setActive] = useState<number | null>(Object.keys(tree).length === 0 ? 0 : null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false);

  const { menuItems, submenuItem, menuId } = React.Children.toArray(children).reduce<MenuItemTypes>(
    (object, child, index) => {
      if (React.isValidElement(child) && typeof child?.type !== 'string') {
        switch ((child?.type as React.FC).displayName) {
          case MenuVerticalSubmenuButton.displayName:
            const submenuItem = child;
            const submenuItemInnerText = extractString(submenuItem);
            object.menuId = `sk-menu-vertical-${submenuItemInnerText}`;
            object.submenuItem = React.cloneElement(child, {
              ...child.props,
              menuId: object.menuId,
              menuIndex: parentLiMenuIndex ? parentLiMenuIndex : index,
              parentMenuId: _menuId,
              'data-menuid': object.menuId,
              // 'data-menuindex': index,
            });
            break;
          case MenuVerticalItem.displayName:
            object.menuItems.push(
              React.cloneElement(child, {
                ...child.props,
                menuIndex: object.submenuItem ? index - 1 : index,
                menuId: object.menuId,
                parentMenuId: _menuId,
                'data-menuid': object.menuId,
                'data-menuindex': object.submenuItem ? index - 1 : index,
              })
            );
            break;
        }
      }

      return object;
    },
    { menuItems: [], submenuItem: undefined, menuId: `sk-menu-vertical-root` }
  );

  tree[menuId] = {
    submenuItem: submenuItem,
    menuItems: menuItems,
    menuId: menuId,
    current: current,
    active: active,
    parentMenuId: _menuId,
    parentLiMenuIndex: parentLiMenuIndex,
    setActive: setActive,
    submenuOpen: submenuOpen,
    setSubmenuOpen: setSubmenuOpen,
  };

  React.useEffect(() => {
    if (mounted) {
      handleSetCurrent(_current);
    } else {
      setMounted(true);
    }
  }, [_current]);

  const handleSetCurrent = (menuIndex: MenuTypes['current']) => {
    setCurrent(menuIndex);
    setActive(menuIndex);
  };

  const next = () => {
    const active = tree[menuId].active;
    if (active === null) return;
    if (active === tree[menuId].menuItems.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  const prev = () => {
    const active = tree[menuId].active;
    if (active === null) return;
    if (active === 0) {
      setActive(tree[menuId].menuItems.length - 1);
    } else {
      setActive(active - 1);
    }
  };

  tree[menuId].next = next;
  tree[menuId].prev = prev;
  tree[menuId].setCurrent = handleSetCurrent;

  const context = {
    tree,
    rootId: rootId,
  };
  // console.log('context', context);
  return (
    <MenuVerticalContext.Provider value={context}>
      {submenuItem && <MenuVerticalSubmenuButton {...submenuItem.props} />}
      {menuItems.length && (
        <ul id={menuId} role="menubar" ref={ref} className={cx('sk-menu-vertical', className)} {...rest}>
          {menuItems.map((item) => (
            <MenuVerticalItem key={`${item.props.menuId}-${item.props.menuIndex}`} {...item.props} />
          ))}
        </ul>
      )}
    </MenuVerticalContext.Provider>
  );
});
