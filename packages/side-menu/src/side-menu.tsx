import { __DEV__ } from '@sk-web-gui/utils';
import { MenuItem } from './menu-item';
import { Spinner } from '@sk-web-gui/spinner';
import { Button } from '@sk-web-gui/button';
import EastIcon from '@mui/icons-material/East';
import { Draggable } from './draggable';
import * as React from 'react';
import { AriaMenuKeyboard } from '@sk-web-gui/keyboard-navigation';
import { findIdPathsForObject } from './utils';
export interface IDataObject {
  id: string | number;
  level: number;
  label: string;
  path?: string;
  disabled?: boolean;
  /* Below at draggable specific */
  separator?: boolean;
  movedHere?: boolean;
  newItem?: boolean;
  error?: boolean;
  changes?: number;
}
export interface IMenu extends IDataObject {
  subItems?: Array<IMenu> | null | [];
}

interface CommonProps {
  menuData: Array<IMenu>;
  linkCallback: (data: IDataObject) => void;
  activeId: string | number | null;
  openIds?: string[];
  ariaMenuLabel: string;
  loading?: boolean;
  headElement?: React.ReactNode;
  label?: string;
  closeNoneActive?: boolean;
  labelCallback?: () => void;
  renderMenuItem?: (
    data: IDataObject,
    open: boolean,
    active: boolean,
    defaultElement: React.ReactNode
  ) => React.ReactNode;
  renderMenuItemLabel?: (data: IDataObject, active: boolean) => React.ReactNode;
  renderMenuItemExpand?: (data: IDataObject, active: boolean, defaultElement: React.ReactNode) => React.ReactNode;
  className?: string;
  ariaExpanded?: { open: string; close: string };
  ariaMoveButton?: string;
  onDrop?: (draggedItem: IMenu, oldParent: IMenu, newParent: IMenu) => void;
  labelAs?: React.ElementType;
}

interface IMenuPropsRegular extends CommonProps {
  draggable?: false;
}

interface IMenuPropsDraggable extends CommonProps {
  draggable: true;
  onDrop: (draggedItem: IMenu, oldParent: IMenu, newParent: IMenu) => void;
}

export type IMenuProps = IMenuPropsRegular | IMenuPropsDraggable;

export const SideMenu = React.forwardRef<HTMLDivElement, IMenuProps>((props, ref) => {
  const {
    loading,
    headElement,
    menuData,
    label,
    linkCallback,
    activeId: _activeId,
    openIds: _openIds,
    closeNoneActive = true,
    labelCallback,
    renderMenuItem,
    renderMenuItemLabel,
    renderMenuItemExpand,
    className = '',
    ariaExpanded = { open: 'Visa undermeny', close: 'Dölj undermeny' },
    ariaMoveButton = 'Flytta menyrad',
    ariaMenuLabel,
    draggable = false,
    labelAs: LabelAs = 'h2',
  } = props;
  const internalRef = React.useRef<HTMLDivElement | null>(null);
  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => internalRef.current);
  const [mounted, setMounted] = React.useState(false);
  const [activeId, setActiveId] = React.useState<CommonProps['activeId']>(_activeId ? _activeId : null);
  const [focusableId, setFocusableId] = React.useState<string>(_activeId ? _activeId.toString() : '');
  const [focusedId, setFocusedId] = React.useState<string>('');
  const menuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getIdsLeadingToId = (id: string | number) => {
    let newIds: string[] = [];
    menuData.forEach((menuItem) => {
      const paths = findIdPathsForObject(menuItem, id);
      if (paths.length) {
        newIds = paths[0];
      }
    });
    return newIds;
  };

  const [openIds, setOpenIds] = React.useState<string[]>(
    _openIds ? _openIds : _activeId ? getIdsLeadingToId(_activeId) : []
  );

  const setOpenIdsFromMenuItem = (openIds: string[] | ((openIds: string[]) => string[])) => {
    setOpenIds((ids) => (typeof openIds === 'function' ? openIds(ids) : openIds));
  };

  const setOpenItemsFromActiveId = (activeId: IMenuProps['activeId'] | null) => {
    if (activeId) {
      const newIds = getIdsLeadingToId(activeId);
      if (closeNoneActive) {
        setOpenIds([...newIds]);
      } else {
        setOpenIds((ids) => ids.concat(newIds));
      }
    } else {
      setOpenIds([]);
    }
  };

  const setActiveOpen = (id: IMenuProps['activeId']) => {
    setActiveId(id);
    setOpenItemsFromActiveId(id);
    setFocusableId(id ? id.toString() : menuData ? menuData[0].id.toString() : '');
  };

  React.useEffect(() => {
    setActiveOpen(_activeId);
  }, [_activeId, loading]);

  React.useEffect(() => {
    if (_openIds) {
      if (activeId) {
        setOpenIds(_openIds.concat([activeId.toString()]));
      } else {
        setOpenIds(_openIds);
      }
    }
  }, [_openIds, loading]);

  const handleDrop = (draggedItem: IMenu, oldParent: IMenu, newParent: IMenu) => {
    draggable && props.onDrop && props.onDrop(draggedItem, oldParent, newParent);
  };

  const menuDataMemo = React.useMemo(() => menuData, [menuData, ref]);

  React.useEffect(() => {
    let draggables: InstanceType<typeof Draggable>;
    if (internalRef && internalRef.current && menuData?.length > 0) {
      if (draggable) {
        draggables = new Draggable(internalRef.current as HTMLDivElement, menuData, '.sk-sidemenu-item', handleDrop);
      }
    }
    return () => {
      if (draggables) {
        draggables.destroy();
      }
    };
  }, [mounted, menuDataMemo, loading, _activeId]);

  React.useEffect(() => {
    let ariaKeyboard: InstanceType<typeof AriaMenuKeyboard>;
    if (mounted && menuDataMemo.length && menuRef?.current && !loading) {
      ariaKeyboard = new AriaMenuKeyboard(menuRef.current, {
        modifyStates: false,
        onExpandPopup: (currentFocusedMenuItem: HTMLElement, expandedMenuItem: HTMLElement) => {
          const id = expandedMenuItem.closest('li')?.getAttribute('data-id');
          if (id) {
            setOpenIds((ids) => ids.concat([id]));
          }
        },
        onClosePopup: (currentFocusedMenuItem: HTMLElement) => {
          const id = currentFocusedMenuItem.closest('li')?.getAttribute('data-id');
          if (id) {
            setOpenIds((ids) => ids.filter((x) => x !== id));
          }
        },
        onSetFocusableItem: (currentFocusedMenuItem: HTMLElement) => {
          const id = currentFocusedMenuItem.closest('li')?.getAttribute('data-id');
          if (id) {
            setFocusableId(id || (activeId ? activeId.toString() : ''));
          }
          return false;
        },
        onSetFocusItem: (currentFocusedMenuItem: HTMLElement) => {
          const id = currentFocusedMenuItem.closest('li')?.getAttribute('data-id');
          if (id) {
            setFocusableId(id || (activeId ? activeId.toString() : ''));
            setFocusedId(id || (activeId ? activeId.toString() : ''));
          }
          return false;
        },
        onSetActiveItem: (currentFocusedMenuItem: HTMLElement) => {
          const id = currentFocusedMenuItem.closest('li')?.getAttribute('data-id');
          if (id) {
            // when onPointerClick is run its 'click'-event cancels the childelements linkCallbackhandler, so it has to be delayed
            setTimeout(() => {
              setFocusableId(id || (activeId ? activeId.toString() : ''));
              setFocusedId(id || (activeId ? activeId.toString() : ''));
            }, 150);
          }
        },
      });
    }

    return () => {
      if (ariaKeyboard) {
        ariaKeyboard.destroy();
      }
    };
  }, [mounted, menuDataMemo, loading]);

  return (
    <nav className={`sk-sidemenu ${className}`} ref={internalRef}>
      <header className="sk-sidemenu-header">
        {headElement && headElement}
        {label && (
          <div className="sk-sidemenu-header-label">
            {labelCallback ? (
              <LabelAs className="label">
                <Button
                  variant="ghost"
                  size="fit"
                  rightIcon={<EastIcon className="material-icon label-button-icon" />}
                  className="label-button label focus-visible:outline-white"
                  onClick={labelCallback}
                >
                  {label}
                </Button>
              </LabelAs>
            ) : (
              <LabelAs className="label">{label}</LabelAs>
            )}
          </div>
        )}
      </header>
      <ul
        ref={menuRef}
        className="sk-sidemenu-body"
        role="menubar"
        aria-orientation="vertical"
        aria-label={ariaMenuLabel}
      >
        {!loading &&
          menuData &&
          menuData.map((item) => {
            return (
              <MenuItem
                focusableId={focusableId}
                focusedId={focusedId}
                itemData={item}
                key={item.id}
                id={item.id}
                label={item.label}
                path={item.path}
                activeId={activeId}
                openIds={openIds}
                setOpenIds={setOpenIdsFromMenuItem}
                level={0}
                subItems={item.subItems}
                linkCallback={linkCallback}
                closeNoneActive={closeNoneActive}
                disabled={item.disabled}
                ariaExpanded={ariaExpanded}
                ariaMoveButton={ariaMoveButton}
                renderMenuItem={renderMenuItem}
                renderMenuItemLabel={renderMenuItemLabel}
                renderMenuItemExpand={renderMenuItemExpand}
                /** Below are specific for draggable */
                separator={item.separator}
                draggable={draggable}
                movedHere={item.movedHere}
              />
            );
          })}
        {loading && (
          <div className="py-20 flex justify-center w-full">
            <Spinner size="xl" />
          </div>
        )}
      </ul>
    </nav>
  );
});
if (__DEV__) {
  SideMenu.displayName = 'Menu';
}
export default SideMenu;
